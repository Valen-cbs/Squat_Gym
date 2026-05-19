import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowDown, CreditCard, Plus, Search, ShoppingCart, Trash2 } from "lucide-react";
import PaymentMethodSelector, { paymentMethodLabels } from "../PaymentMethodSelector";
import { kioskProducts } from "../../data/catalog";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
};

const initialProducts: Product[] = kioskProducts.map(({ id, name, price, stock, category }) => ({
  id,
  name,
  price,
  stock,
  category,
}));

const syncProductsWithCatalog = (storedProducts: Product[]) =>
  initialProducts.map((catalogProduct) => {
    const storedProduct = storedProducts.find((product) => product.id === catalogProduct.id);
    return storedProduct ? { ...catalogProduct, stock: storedProduct.stock } : catalogProduct;
  });

export default function RegistrarVenta() {
  const navigate = useNavigate();
  const cartRef = useRef<HTMLDivElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; quantity: number }>>([]);
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") {
      return initialProducts;
    }

    const stored = window.localStorage.getItem("kiosk-products");
    if (!stored) {
      return initialProducts;
    }

    try {
      return syncProductsWithCatalog(JSON.parse(stored) as Product[]);
    } catch {
      return initialProducts;
    }
  });

  useEffect(() => {
    window.localStorage.setItem("kiosk-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (cart.length === 0) {
      setIsCartVisible(false);
      return;
    }

    const cartNode = cartRef.current;
    if (!cartNode || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsCartVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -25% 0px", threshold: 0.2 }
    );

    observer.observe(cartNode);
    return () => observer.disconnect();
  }, [cart.length]);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        return;
      }

      setCart((current) =>
        current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      return;
    }

    if (product.stock <= 0) {
      return;
    }

    setCart((current) => [...current, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (productId: number) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((current) =>
      current.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const showCartShortcut = cart.length > 0 && !isCartVisible;

  const handleConfirmSale = () => {
    const updatedProducts = products.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      return cartItem
        ? { ...product, stock: product.stock - cartItem.quantity }
        : product;
    });

    setProducts(updatedProducts);
    setCart([]);

    navigate(`/kiosco/venta/${Date.now()}`, {
      state: {
        items: cart,
        total,
        paymentMethod: paymentMethodLabels[paymentMethod],
      },
    });
  };

  return (
    <div className={`app-page ${showCartShortcut ? "pb-24" : ""}`}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Nueva venta</h1>
      </div>

      <div className="space-y-6">
        <div className="app-panel p-5 sm:p-6">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-bold text-gray-900">Productos disponibles</h2>
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredProducts.map((product) => {
              const quantityInCart = cart.find((item) => item.id === product.id)?.quantity || 0;
              const isUnavailable = product.stock <= quantityInCart;

              return (
                <div
                  key={product.id}
                  className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="mt-1 text-sm text-gray-500">Stock: {product.stock}</p>
                    </div>
                    <p className="font-bold text-blue-600">${product.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={isUnavailable}
                    className={`mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-white transition-colors ${
                      isUnavailable
                        ? "cursor-not-allowed bg-gray-300 text-gray-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    {isUnavailable ? "Agotado" : "Agregar"}
                  </button>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500">
              No se encontraron productos con esa busqueda.
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div id="carrito" ref={cartRef} className="scroll-mt-24">
            <div className="app-panel p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-gray-900" />
                  <h2 className="text-xl font-bold text-gray-900">Carrito</h2>
                </div>
                <span className="rounded-full bg-indigo-lightest px-3 py-1 text-sm font-semibold text-indigo-primary">
                  {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="rounded-lg border border-gray-200 p-3 sm:p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">${item.price} c/u</p>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 font-semibold hover:bg-gray-200"
                            aria-label={`Restar ${item.name}`}
                          >
                            -
                          </button>
                          <span className="w-9 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 font-semibold hover:bg-gray-200"
                            aria-label={`Sumar ${item.name}`}
                          >
                            +
                          </button>
                        </div>

                        <p className="min-w-20 text-right font-bold text-gray-900">
                          ${item.price * item.quantity}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700"
                          aria-label={`Quitar ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <PaymentMethodSelector
                  title="Medio de pago"
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                />
              </div>

              <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium text-gray-900">${total}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Medio de pago:</span>
                      <span>{paymentMethodLabels[paymentMethod]}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">Total:</span>
                      <span className="text-2xl font-bold text-gray-900">${total}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmSale}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700 lg:w-auto"
                  >
                    <CreditCard className="h-5 w-5" />
                    Confirmar venta
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showCartShortcut && (
        <a
          href="#carrito"
          className="fixed bottom-5 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-center gap-3 rounded-full bg-indigo-primary px-5 py-3 text-white shadow-2xl shadow-indigo-primary/25 transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-primary focus:ring-offset-2"
        >
          <ShoppingCart className="h-5 w-5 shrink-0" />
          <span className="font-semibold">Ver carrito</span>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-bold">
            {cartItemCount}
          </span>
          <ArrowDown className="h-4 w-4 shrink-0" />
        </a>
      )}
    </div>
  );
}
