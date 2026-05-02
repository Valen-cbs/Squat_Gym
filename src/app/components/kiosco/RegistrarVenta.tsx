<<<<<<< HEAD
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Plus, Trash2, ShoppingCart, Search, CreditCard } from "lucide-react";
import PaymentMethodSelector, { paymentMethodLabels } from "../PaymentMethodSelector";
import { kioskProducts } from "../../data/catalog";
=======
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Plus, Trash2, ShoppingCart, Search, CreditCard } from "lucide-react";
import PaymentMethodSelector, { paymentMethodLabels } from "../PaymentMethodSelector";
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
};

<<<<<<< HEAD
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

=======
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
export default function RegistrarVenta() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; quantity: number }>>([]);
<<<<<<< HEAD
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
=======

  const products: Product[] = [
    { id: 1, name: "Bebida Isotonica", price: 60, stock: 15, category: "Bebidas" },
    { id: 2, name: "Barrita Proteica", price: 70, stock: 22, category: "Snacks" },
    { id: 3, name: "Agua Mineral", price: 30, stock: 35, category: "Bebidas" },
    { id: 4, name: "Batido de Proteina", price: 80, stock: 18, category: "Suplementos" },
    { id: 5, name: "Snack Saludable", price: 40, stock: 28, category: "Snacks" },
    { id: 6, name: "Toalla Deportiva", price: 150, stock: 12, category: "Accesorios" },
    { id: 7, name: "Guantes de Entrenamiento", price: 250, stock: 8, category: "Accesorios" },
    { id: 8, name: "Shaker", price: 120, stock: 15, category: "Accesorios" },
  ];
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
<<<<<<< HEAD
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
=======
        `${product.name} ${product.category}`.toLowerCase().includes(searchTerm.toLowerCase())
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
      ),
    [products, searchTerm]
  );

<<<<<<< HEAD
  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        return;
      }

=======
  const addToCart = (product: Pick<Product, "id" | "name" | "price">) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
      setCart((current) =>
        current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      return;
    }

<<<<<<< HEAD
    if (product.stock <= 0) {
      return;
    }

=======
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
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

  const handleConfirmSale = () => {
<<<<<<< HEAD
    const updatedProducts = products.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      return cartItem
        ? { ...product, stock: product.stock - cartItem.quantity }
        : product;
    });

    setProducts(updatedProducts);
    setCart([]);

=======
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
    navigate(`/kiosco/venta/${Date.now()}`, {
      state: {
        items: cart,
        total,
        paymentMethod: paymentMethodLabels[paymentMethod],
      },
    });
  };

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Nueva venta</h1>
<<<<<<< HEAD
=======
        <p className="mt-2 text-sm text-gray-500 sm:text-base">Busca productos rapido, arma el carrito y elige como cobrar.</p>
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="app-panel p-5 sm:p-6">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Productos disponibles</h2>
<<<<<<< HEAD
                <p className="mt-1 text-sm text-gray-500">Encuentra un producto por nombre.</p>
=======
                <p className="mt-1 text-sm text-gray-500">Encuentra un producto por nombre o categoria.</p>
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
              </div>
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
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="mt-1 text-sm text-gray-500">Stock: {product.stock}</p>
                    </div>
                    <p className="font-bold text-blue-600">${product.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
<<<<<<< HEAD
                    disabled={product.stock <= (cart.find((item) => item.id === product.id)?.quantity || 0)}
                    className={`mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-white transition-colors ${
                      product.stock <= (cart.find((item) => item.id === product.id)?.quantity || 0)
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    {product.stock <= (cart.find((item) => item.id === product.id)?.quantity || 0) ? "Agotado" : "Agregar"}
=======
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
                  </button>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500">
                No se encontraron productos con esa busqueda.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="app-panel p-5 sm:p-6 lg:sticky lg:top-8">
            <div className="mb-4 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-gray-900" />
              <h2 className="text-xl font-bold text-gray-900">Carrito</h2>
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center">
                <ShoppingCart className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                <p className="text-gray-500">No hay productos en el carrito</p>
              </div>
            ) : (
              <>
                <div className="mb-6 max-h-80 space-y-3 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="rounded-lg border border-gray-200 p-3">
                      <div className="mb-2 flex items-start justify-between">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-7 w-7 rounded bg-gray-100 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7 rounded bg-gray-100 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold text-gray-900">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <PaymentMethodSelector
                    title="Medio de pago"
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                  />
                </div>

                <div className="mb-4 border-t border-gray-200 pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">${total}</span>
                  </div>
                  <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
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
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-medium text-white transition-colors hover:bg-green-700"
                >
                  <CreditCard className="h-5 w-5" />
                  Confirmar venta
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
