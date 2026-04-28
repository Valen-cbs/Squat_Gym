import { Link, useParams } from "react-router";
import { ArrowLeft, Package, TrendingUp, AlertTriangle, Edit, Plus } from "lucide-react";

export default function DetalleProducto() {
  const { id } = useParams();

  const product = {
    id: id,
    name: "Bebida Isotónica",
    category: "Bebidas",
    price: 60,
    cost: 35,
    stock: 3,
    minStock: 10,
    maxStock: 50,
    supplier: "Distribuidora Deportiva SA",
    barcode: "7790123456789",
    status: "critical"
  };

  const salesHistory = [
    { date: "21/04/2026", quantity: 5, total: 300 },
    { date: "20/04/2026", quantity: 8, total: 480 },
    { date: "19/04/2026", quantity: 3, total: 180 },
    { date: "18/04/2026", quantity: 7, total: 420 },
    { date: "17/04/2026", quantity: 4, total: 240 },
  ];

  const stockMovements = [
    { date: "15/04/2026", type: "Ingreso", quantity: 30, balance: 30, note: "Reposición semanal" },
    { date: "21/04/2026", type: "Salida", quantity: 5, balance: 25, note: "Venta" },
    { date: "20/04/2026", type: "Salida", quantity: 8, balance: 17, note: "Venta" },
    { date: "19/04/2026", type: "Salida", quantity: 3, balance: 14, note: "Venta" },
  ];

  const margin = ((product.price - product.cost) / product.price * 100).toFixed(1);

  return (
    <div className="p-8">
      <Link
        to="/kiosco/stock"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al stock
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Detalle de Producto</h1>
        <p className="text-gray-500 mt-2">Información completa e historial del producto</p>
      </div>

      {/* Product Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-gray-500">{product.category}</p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            product.status === "critical"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}>
            {product.status === "critical" ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <Package className="w-5 h-5" />
            )}
            {product.status === "critical" ? "STOCK CRÍTICO" : "STOCK OK"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Precio de Venta</p>
            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Costo</p>
            <p className="text-2xl font-bold text-gray-900">${product.cost}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600 mb-1">Margen</p>
            <p className="text-2xl font-bold text-green-700">{margin}%</p>
          </div>
          <div className={`p-4 rounded-lg ${
            product.stock < product.minStock ? "bg-red-50" : "bg-blue-50"
          }`}>
            <p className="text-sm text-gray-500 mb-1">Stock Actual</p>
            <p className={`text-2xl font-bold ${
              product.stock < product.minStock ? "text-red-700" : "text-blue-700"
            }`}>
              {product.stock} unidades
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <p className="text-sm text-gray-500">Stock Mínimo</p>
            <p className="font-medium text-gray-900">{product.minStock} unidades</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Stock Máximo</p>
            <p className="font-medium text-gray-900">{product.maxStock} unidades</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Proveedor</p>
            <p className="font-medium text-gray-900">{product.supplier}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Link
          to="/kiosco/reposicion"
          className="bg-orange-600 text-white rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-orange-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Solicitar Reposición</span>
        </Link>
        <button className="bg-blue-600 text-white rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors">
          <Edit className="w-5 h-5" />
          <span className="font-medium">Editar Producto</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Historial de Ventas</h2>
            </div>
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Fecha</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500">Cantidad</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody>
                {salesHistory.map((sale, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 text-sm text-gray-900">{sale.date}</td>
                    <td className="py-3 text-sm text-right text-gray-600">{sale.quantity}</td>
                    <td className="py-3 text-sm text-right font-medium text-gray-900">${sale.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Movements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Movimientos de Stock</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {stockMovements.map((movement, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        movement.type === "Ingreso"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {movement.type}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{movement.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        movement.type === "Ingreso" ? "text-green-600" : "text-red-600"
                      }`}>
                        {movement.type === "Ingreso" ? "+" : "-"}{movement.quantity}
                      </p>
                      <p className="text-xs text-gray-500">Saldo: {movement.balance}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{movement.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
