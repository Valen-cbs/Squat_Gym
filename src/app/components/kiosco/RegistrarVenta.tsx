import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Plus, Trash2, ShoppingCart } from "lucide-react";

export default function RegistrarVenta() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; quantity: number }>>([]);

  const products = [
    { id: 1, name: "Bebida Isotónica", price: 60, stock: 15 },
    { id: 2, name: "Barrita Proteica", price: 70, stock: 22 },
    { id: 3, name: "Agua Mineral", price: 30, stock: 35 },
    { id: 4, name: "Batido de Proteína", price: 80, stock: 18 },
    { id: 5, name: "Snack Saludable", price: 40, stock: 28 },
    { id: 6, name: "Toalla Deportiva", price: 150, stock: 12 },
    { id: 7, name: "Guantes de Entrenamiento", price: 250, stock: 8 },
    { id: 8, name: "Shaker", price: 120, stock: 15 },
  ];

  const addToCart = (product: { id: number; name: string; price: number }) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmSale = () => {
    navigate(`/kiosco/venta/${Date.now()}`);
  };

  return (
    <div className="app-page">
      <Link
        to="/kiosco"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al kiosco
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Nueva Venta</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">Selecciona productos para registrar la venta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="app-panel p-5 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Productos Disponibles</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {products.map(product => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                    </div>
                    <p className="font-bold text-blue-600">${product.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart */}
        <div className="lg:col-span-1">
          <div className="app-panel p-5 sm:p-6 lg:sticky lg:top-8">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="w-5 h-5 text-gray-900" />
              <h2 className="text-xl font-bold text-gray-900">Carrito</h2>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No hay productos en el carrito</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-sm text-gray-900">{item.name}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold text-gray-900">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">${total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-gray-900">${total}</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmSale}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Confirmar Venta
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
