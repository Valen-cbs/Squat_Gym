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
import { useUser } from "../../context/UserContext";
import { hasPermission } from "../../permissions";
import { kioskProducts } from "../../data/catalog";

export default function KioscoPrincipal() {
  const { user } = useUser();
  const canRegisterSale = hasPermission(user?.role, "kiosk.registerSale");
  const canViewStock = hasPermission(user?.role, "kiosk.viewStock");
  const canCreateRestockOrder = hasPermission(user?.role, "kiosk.createRestockOrder");
  const canViewDailySales = hasPermission(user?.role, "kiosk.viewDailySales");
  const lowStockProducts = kioskProducts.filter((product) => product.status !== "ok");

  const stats = [
    ...(canViewDailySales
      ? [
          { label: "Ventas del dia", value: "$4,250", icon: DollarSign, color: "from-emerald-500 to-green-500" },
          { label: "Productos vendidos", value: "87", icon: ShoppingCart, color: "from-sky-500 to-blue-500" },
        ]
      : []),
    ...(canViewStock
      ? [
          { label: "Stock critico", value: String(lowStockProducts.length), icon: AlertTriangle, color: "from-amber-500 to-orange-500" },
          { label: "Productos disponibles", value: String(kioskProducts.length), icon: Package, color: "from-violet-500 to-purple-500" },
        ]
      : []),
  ];

  const actionCards = [
    ...(canRegisterSale
      ? [
          {
            to: "/kiosco/nueva-venta",
            title: "Nueva venta",
            description: "Registrar productos vendidos y emitir ticket.",
            icon: ShoppingCart,
            color: "from-blue-600 to-cyan-500",
          },
        ]
      : []),
    ...(canViewStock
      ? [
          {
            to: "/kiosco/stock",
            title: "Ver stock",
            description: "Consultar inventario y faltantes.",
            icon: Package,
            color: "from-violet-600 to-fuchsia-500",
          },
        ]
      : []),
    ...(canCreateRestockOrder
      ? [
          {
            to: "/kiosco/reposicion",
            title: "Generar reposicion",
            description: "Crear pedido de productos con stock bajo.",
            icon: BoxIcon,
            color: "from-amber-600 to-orange-500",
          },
        ]
      : []),
  ];

  const topProducts = [
    { product: kioskProducts[0], sold: 23 },
    { product: kioskProducts[1], sold: 18 },
    { product: kioskProducts[2], sold: 15 },
    { product: kioskProducts[3], sold: 12 },
    { product: kioskProducts[4], sold: 8 },
  ].map(({ product, sold }) => ({
    id: product.id,
    name: product.name,
    sold,
    revenue: sold * product.price,
  }));

  const lowStock = lowStockProducts.map((product) => ({
    id: product.id,
    name: product.name,
    stock: product.stock,
    min: product.minStock,
    status: product.status,
  }));

  const dailySales = [
    { id: 101, branch: "Sede French 414", shift: "Manana", sales: 18, amount: 1560, cashier: "Malena Trangoni" },
    { id: 102, branch: "Sede French 414", shift: "Tarde", sales: 24, amount: 2690, cashier: "Sofia Duarte" },
    { id: 103, branch: "Sede Norte", shift: "Tarde", sales: 16, amount: 1840, cashier: "Camila Rios" },
  ];

  const actionGridClass =
    actionCards.length === 1
      ? "mx-auto max-w-xl grid-cols-1"
      : actionCards.length === 2
        ? "mx-auto max-w-5xl grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Kiosco principal</h1>
          <p className="app-page-copy">Accesos ajustados al rol activo para ventas, inventario y control diario.</p>
        </div>
      </div>

      {stats.length > 0 && (
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
      )}

      {actionCards.length > 0 && (
        <div className={`mt-6 grid gap-4 ${actionGridClass}`}>
          {actionCards.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className={`min-h-36 rounded-[24px] bg-gradient-to-br ${action.color} p-5 text-white shadow-lg`}
            >
              <action.icon className="h-8 w-8" />
              <p className="mt-4 text-xl font-bold">{action.title}</p>
              <p className="mt-1 text-sm text-white/85">{action.description}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {canViewDailySales && (
          <div className="app-panel overflow-hidden">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-900">Ventas diarias por sede</h2>
              </div>
            </div>
            <div className="app-table-scroll px-5 py-4 sm:px-6">
              <table className="app-table w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 text-left text-sm font-medium text-slate-500">Sede</th>
                    <th className="py-3 text-left text-sm font-medium text-slate-500">Turno</th>
                    <th className="py-3 text-right text-sm font-medium text-slate-500">Ventas</th>
                    <th className="py-3 text-right text-sm font-medium text-slate-500">Monto</th>
                    <th className="py-3 text-right text-sm font-medium text-slate-500">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {dailySales.map((sale) => (
                    <tr key={sale.id} className="border-b border-slate-100">
                      <td className="py-3 text-sm text-slate-900">
                        <p className="font-medium">{sale.branch}</p>
                        <p className="text-xs text-slate-500">{sale.cashier}</p>
                      </td>
                      <td className="py-3 text-sm text-slate-600">{sale.shift}</td>
                      <td className="py-3 text-right text-sm text-slate-600">{sale.sales}</td>
                      <td className="py-3 text-right text-sm font-medium text-slate-900">${sale.amount}</td>
                      <td className="py-3 text-right">
                        <Link to={`/kiosco/venta/${sale.id}`} className="text-sm font-semibold text-blue-700 hover:underline">
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {canViewDailySales && (
          <div className="app-panel overflow-hidden">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-900">Productos mas vendidos</h2>
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
        )}

        {canViewStock && (
          <div className={`app-panel ${!canViewDailySales ? "xl:col-span-2" : ""}`}>
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
                        Stock actual: <span className="font-semibold">{product.stock}</span> | Minimo: {product.min}
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
                        {product.status === "critical" ? "Critico" : "Advertencia"}
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
        )}
      </div>
    </div>
  );
}
