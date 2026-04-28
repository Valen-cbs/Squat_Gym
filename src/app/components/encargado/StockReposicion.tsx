import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Package,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  ShoppingCart,
  Plus
} from "lucide-react";

export default function StockReposicion() {
  const [showOrderForm, setShowOrderForm] = useState(false);

  const products = [
    { id: 1, name: "Bebida Isotónica", category: "Bebidas", stock: 2, minStock: 10, price: 60, status: "critical" },
    { id: 2, name: "Barrita Proteica", category: "Suplementos", stock: 5, minStock: 15, price: 70, status: "warning" },
    { id: 3, name: "Agua Mineral", category: "Bebidas", stock: 25, minStock: 20, price: 30, status: "ok" },
    { id: 4, name: "Toalla Deportiva", category: "Accesorios", stock: 3, minStock: 5, price: 150, status: "critical" },
    { id: 5, name: "Guantes Entrenamiento", category: "Accesorios", stock: 6, minStock: 8, price: 250, status: "warning" },
    { id: 6, name: "Shaker", category: "Accesorios", stock: 12, minStock: 8, price: 120, status: "ok" },
    { id: 7, name: "Batido de Proteína", category: "Suplementos", stock: 18, minStock: 12, price: 80, status: "ok" },
    { id: 8, name: "Snack Saludable", category: "Alimentos", stock: 28, minStock: 15, price: 40, status: "ok" },
  ];

  const recentOrders = [
    { id: 1, date: "18/04/2026", items: 5, total: 2450, status: "Entregado", deliveryDate: "20/04/2026" },
    { id: 2, date: "10/04/2026", items: 8, total: 3200, status: "Entregado", deliveryDate: "12/04/2026" },
    { id: 3, date: "03/04/2026", items: 6, total: 1890, status: "Entregado", deliveryDate: "05/04/2026" },
  ];

  const criticalCount = products.filter(p => p.status === "critical").length;
  const warningCount = products.filter(p => p.status === "warning").length;

  return (
    <div className="p-8">
      <Link
        to="/encargado"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al dashboard
      </Link>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Stock y Reposición del Kiosco</h1>
            <p className="text-gray-500 mt-2">Control de inventario y generación de pedidos</p>
          </div>
          <button
            onClick={() => setShowOrderForm(!showOrderForm)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Nuevo Pedido
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Total productos</p>
            <Package className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Stock crítico</p>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Stock bajo</p>
            <TrendingDown className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-600">{warningCount}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Productos OK</p>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">
            {products.filter(p => p.status === "ok").length}
          </p>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalCount > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 mb-2">¡Atención! Productos con stock crítico</h3>
              <p className="text-red-700 mb-3">
                Hay {criticalCount} productos con stock por debajo del mínimo requerido. Se recomienda generar un pedido de reposición inmediato.
              </p>
              <button
                onClick={() => setShowOrderForm(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Generar Pedido Ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Form */}
      {showOrderForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nuevo Pedido de Reposición</h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              Selecciona los productos que necesitas reponer. El sistema sugiere cantidades basadas en el stock mínimo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {products.filter(p => p.status !== "ok").map((product) => (
                <div key={product.id} className={`border-2 rounded-lg p-4 ${
                  product.status === "critical" ? "border-red-300 bg-red-50" : "border-orange-300 bg-orange-50"
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      product.status === "critical" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {product.status === "critical" ? "CRÍTICO" : "BAJO"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Stock: {product.stock} / Mín: {product.minStock}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Cantidad:</label>
                    <input
                      type="number"
                      defaultValue={product.minStock * 2}
                      min="0"
                      className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Enviar Pedido
              </button>
              <button
                onClick={() => setShowOrderForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Current Stock */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Inventario Actual</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Producto</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Categoría</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Stock</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Mínimo</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Precio</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-bold ${
                      product.status === "critical" ? "text-red-600" :
                      product.status === "warning" ? "text-orange-600" : "text-green-600"
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{product.minStock}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">${product.price}</td>
                  <td className="px-6 py-4 text-center">
                    {product.status === "critical" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <AlertTriangle className="w-3 h-3" />
                        CRÍTICO
                      </span>
                    )}
                    {product.status === "warning" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                        <TrendingDown className="w-3 h-3" />
                        BAJO
                      </span>
                    )}
                    {product.status === "ok" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3" />
                        OK
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Pedidos Recientes</h2>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Fecha Pedido</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Items</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Total</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Estado</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Fecha Entrega</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="px-4 py-4 text-sm text-gray-900">{order.date}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{order.items} productos</td>
                  <td className="px-4 py-4 text-sm font-bold text-gray-900">${order.total.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3" />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{order.deliveryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
