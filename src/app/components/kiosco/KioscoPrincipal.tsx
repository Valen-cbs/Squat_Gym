import { Link } from "react-router";
import {
  ShoppingCart,
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  BoxIcon,
  ArrowRight,
} from "lucide-react";

export default function KioscoPrincipal() {
  const stats = [
    { label: "Ventas del día", value: "$4,250", icon: DollarSign, color: "from-emerald-500 to-green-500" },
    { label: "Productos vendidos", value: "87", icon: ShoppingCart, color: "from-sky-500 to-blue-500" },
    { label: "Stock crítico", value: "5", icon: AlertTriangle, color: "from-amber-500 to-orange-500" },
    { label: "Productos disponibles", value: "24", icon: Package, color: "from-violet-500 to-purple-500" },
  ];

  const topProducts = [
    { id: 1, name: "Bebida Isotónica", sold: 23, revenue: 1380 },
    { id: 2, name: "Barrita Proteica", sold: 18, revenue: 1260 },
    { id: 3, name: "Agua Mineral", sold: 15, revenue: 450 },
    { id: 4, name: "Batido de Proteína", sold: 12, revenue: 960 },
    { id: 5, name: "Snack Saludable", sold: 8, revenue: 320 },
  ];

  const lowStock = [
    { id: 6, name: "Bebida Isotónica", stock: 3, min: 10, status: "critical" },
    { id: 7, name: "Toalla Deportiva", stock: 2, min: 5, status: "critical" },
    { id: 8, name: "Guantes de Entrenamiento", stock: 6, min: 8, status: "warning" },
  ];

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Kiosco principal</h1>
          <p className="app-page-copy">Ventas, inventario y reposiciones en una vista más simple de recorrer desde cualquier tamaño de pantalla.</p>
        </div>
      </div>

      <div className="app-stat-grid">
        {stats.map((stat, index) => (
          <div key={index} className="app-panel p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Link to="/kiosco/nueva-venta" className="rounded-[24px] bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white shadow-lg">
          <ShoppingCart className="h-8 w-8" />
          <p className="mt-4 text-xl font-bold">Nueva venta</p>
          <p className="mt-1 text-sm text-blue-50">Registrar rápidamente productos vendidos.</p>
        </Link>

        <Link to="/kiosco/stock" className="rounded-[24px] bg-gradient-to-br from-violet-600 to-fuchsia-500 p-5 text-white shadow-lg">
          <Package className="h-8 w-8" />
          <p className="mt-4 text-xl font-bold">Ver stock</p>
          <p className="mt-1 text-sm text-violet-50">Consultar inventario y faltantes.</p>
        </Link>

        <Link to="/kiosco/reposicion" className="rounded-[24px] bg-gradient-to-br from-amber-600 to-orange-500 p-5 text-white shadow-lg">
          <BoxIcon className="h-8 w-8" />
          <p className="mt-4 text-xl font-bold">Solicitar reposición</p>
          <p className="mt-1 text-sm text-amber-50">Generar pedidos con menos pasos.</p>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="app-panel overflow-hidden">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900">Productos más vendidos</h2>
            </div>
          </div>
          <div className="app-table-scroll px-5 py-4 sm:px-6">
            <table className="app-table w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 text-left text-sm font-medium text-slate-500">Producto</th>
                  <th className="py-3 text-right text-sm font-medium text-slate-500">Vendidos</th>
                  <th className="py-3 text-right text-sm font-medium text-slate-500">Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100">
                    <td className="py-3 text-sm text-slate-900">{product.name}</td>
                    <td className="py-3 text-right text-sm text-slate-600">{product.sold}</td>
                    <td className="py-3 text-right text-sm font-medium text-slate-900">${product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="app-panel">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h2 className="text-xl font-bold text-slate-900">Alertas de stock</h2>
            </div>
          </div>
          <div className="space-y-3 px-5 py-5 sm:px-6">
            {lowStock.map((product) => (
              <div
                key={product.id}
                className={`rounded-2xl border p-4 ${
                  product.status === "critical"
                    ? "border-red-200 bg-red-50/80"
                    : "border-amber-200 bg-amber-50/80"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{product.name}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Stock actual: <span className="font-semibold">{product.stock}</span> · Mínimo: {product.min}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        product.status === "critical"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {product.status === "critical" ? "Crítico" : "Advertencia"}
                    </span>
                    <div className="mt-2">
                      <Link
                        to={`/kiosco/producto/${product.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"
                      >
                        Ver detalle
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
