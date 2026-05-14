import { useState } from "react";
import {
  Package,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  ShoppingCart,
  Plus
} from "lucide-react";
import { getSuggestedRestockQuantity, kioskProducts } from "../../data/catalog";

export default function StockReposicion() {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const products = kioskProducts;

  const recentOrders = [
    { id: 1, date: "18/04/2026", items: 5, total: 2450, status: "Entregado", deliveryDate: "20/04/2026" },
    { id: 2, date: "10/04/2026", items: 8, total: 3200, status: "Entregado", deliveryDate: "12/04/2026" },
    { id: 3, date: "03/04/2026", items: 6, total: 1890, status: "Entregado", deliveryDate: "05/04/2026" },
  ];

  const criticalCount = products.filter(p => p.status === "critical").length;
  const warningCount = products.filter(p => p.status === "warning").length;
  const suggestedProducts = products.filter((product) => product.status !== "ok");
  const suggestedUnits = suggestedProducts.reduce((sum, product) => sum + getSuggestedRestockQuantity(product), 0);

  if (showConfirmation) {
    return (
      <div className="p-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-green-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <ShoppingCart className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-gray-900">Pedido de reposicion generado</h1>
          <p className="mt-2 text-gray-600">
            Se registro la solicitud para {suggestedProducts.length} productos con stock bajo o critico.
          </p>

          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-left">
            <h2 className="font-bold text-gray-900">Resumen del pedido</h2>
            <div className="mt-3 space-y-2">
              {suggestedProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between gap-4 rounded-lg bg-white px-3 py-2 text-sm">
                  <span className="font-medium text-gray-900">{product.name}</span>
                  <span className="text-gray-600">{getSuggestedRestockQuantity(product)} unidades</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 font-bold text-gray-900">
              <span>Total unidades</span>
              <span>{suggestedUnits}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => {
                setShowConfirmation(false);
                setShowOrderForm(false);
              }}
              className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition-colors hover:bg-green-700"
            >
              Volver al stock
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="p-8">
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
              {suggestedProducts.map((product) => (
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
                      defaultValue={getSuggestedRestockQuantity(product)}
                      min="0"
                      className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={() => setShowConfirmation(true)}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
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
