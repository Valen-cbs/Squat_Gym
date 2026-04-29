import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Plus, Trash2, Send, AlertTriangle } from "lucide-react";

type OrderItem = {
  id: number;
  name: string;
  stock: number;
  minStock: number;
  quantity: number;
};

export default function PedidoReposicion() {
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const lowStockProducts = [
    { id: 6, name: "Bebida Energetica", category: "Bebidas", stock: 3, minStock: 10, suggested: 20 },
    { id: 7, name: "Toalla Deportiva", category: "Accesorios", stock: 2, minStock: 5, suggested: 10 },
    { id: 8, name: "Guantes de Entrenamiento", category: "Accesorios", stock: 6, minStock: 8, suggested: 15 },
    { id: 1, name: "Bebida Isotonica", category: "Bebidas", stock: 8, minStock: 10, suggested: 20 },
  ];

  const allProducts = [
    { id: 2, name: "Barrita Proteica", category: "Suplementos", stock: 22, minStock: 15, suggested: 20 },
    { id: 3, name: "Agua Mineral", category: "Bebidas", stock: 35, minStock: 20, suggested: 30 },
    { id: 4, name: "Batido de Proteina", category: "Suplementos", stock: 18, minStock: 12, suggested: 20 },
    { id: 5, name: "Snack Saludable", category: "Alimentos", stock: 28, minStock: 15, suggested: 25 },
    { id: 9, name: "Shaker", category: "Accesorios", stock: 15, minStock: 8, suggested: 15 },
    { id: 10, name: "Creatina", category: "Suplementos", stock: 12, minStock: 8, suggested: 15 },
  ];

  const addToOrder = (product: { id: number; name: string; stock: number; minStock: number; suggested: number }) => {
    if (orderItems.some((item) => item.id === product.id)) {
      return;
    }

    setOrderItems((current) => [
      ...current,
      {
        id: product.id,
        name: product.name,
        stock: product.stock,
        minStock: product.minStock,
        quantity: product.suggested,
      },
    ]);
  };

  const removeFromOrder = (productId: number) => {
    setOrderItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(productId);
      return;
    }

    setOrderItems((current) =>
      current.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleSubmitOrder = () => {
    alert("Pedido de reposicion enviado exitosamente.");
    navigate("/kiosco");
  };

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Solicitar reposicion</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">Genera un pedido y ajusta manualmente la cantidad de cada producto.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="app-panel p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-900">Productos con stock bajo</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
                  <div className="mb-3">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-700">Stock: {product.stock}</span>
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Min: {product.minStock}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToOrder(product)}
                    disabled={orderItems.some((item) => item.id === product.id)}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 font-medium transition-colors ${
                      orderItems.some((item) => item.id === product.id)
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-orange-600 text-white hover:bg-orange-700"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    {orderItems.some((item) => item.id === product.id) ? "Agregado" : "Agregar al pedido"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="app-panel p-5 sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Otros productos</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {allProducts.map((product) => (
                <div key={product.id} className="rounded-xl border border-gray-200 p-4 transition-colors hover:border-blue-300">
                  <div className="mb-3">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">Stock: {product.stock}</span>
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Min: {product.minStock}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToOrder(product)}
                    disabled={orderItems.some((item) => item.id === product.id)}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 font-medium transition-colors ${
                      orderItems.some((item) => item.id === product.id)
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    {orderItems.some((item) => item.id === product.id) ? "Agregado" : "Agregar"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="app-panel p-5 sm:p-6 lg:sticky lg:top-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Resumen del pedido</h2>

            {orderItems.length === 0 ? (
              <div className="py-8 text-center">
                <AlertTriangle className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                <p className="text-gray-500">No hay productos en el pedido</p>
              </div>
            ) : (
              <>
                <div className="mb-6 max-h-96 space-y-3 overflow-y-auto">
                  {orderItems.map((item) => (
                    <div key={item.id} className="rounded-lg border border-gray-200 p-3">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <button
                          onClick={() => removeFromOrder(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mb-3 text-xs text-gray-500">Stock actual: {item.stock} | Minimo: {item.minStock}</p>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 rounded bg-gray-100 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                            className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 rounded bg-gray-100 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm text-gray-600">unidades</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">Total productos:</span>
                    <span className="text-2xl font-bold text-gray-900">{orderItems.length}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-gray-600">Total unidades:</span>
                    <span className="font-medium text-gray-900">
                      {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-medium text-white transition-colors hover:bg-green-700"
                >
                  <Send className="h-5 w-5" />
                  Enviar pedido
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
