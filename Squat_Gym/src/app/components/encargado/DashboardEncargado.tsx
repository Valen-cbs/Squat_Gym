import { Link } from "react-router";
import {
  Users,
  Bell,
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import { getProductById } from "../../data/catalog";

export default function DashboardEncargado() {
  const criticalProduct = getProductById(7)!;
  const quickActions = [
    {
      title: "Alumnos",
      description: "Listado general de alumnos y bajas de la sede.",
      icon: Users,
      color: "from-slate-700 to-slate-900",
      badge: "General",
      link: "/encargado/alumnos",
    },
    {
      title: "Inscripciones y pagos",
      description: "Consultar movimientos comerciales y el trabajo de recepcion.",
      icon: DollarSign,
      color: "from-blue-600 to-cyan-500",
      badge: "23 este mes",
      link: "/encargado/inscripciones",
    },
    {
      title: "Alertas y notificaciones",
      description: "Ver deudores y stock critico.",
      icon: Bell,
      color: "from-amber-600 to-orange-500",
      badge: "5 alertas",
      link: "/encargado/alertas",
    },
    {
      title: "Alumnos con deuda",
      description: "Consultar montos pendientes y fechas de atraso.",
      icon: Users,
      color: "from-rose-600 to-red-500",
      badge: "3 deudores",
      link: "/cobranzas/deudores",
    },
    {
      title: "Ventas del kiosco",
      description: "Reporte diario por turno o por rango de dias.",
      icon: ShoppingCart,
      color: "from-emerald-600 to-green-500",
      badge: "$4.250 hoy",
      link: "/kiosco",
    },
    {
      title: "Stock y reposicion",
      description: "Control de inventario y pedidos del kiosco.",
      icon: Package,
      color: "from-rose-600 to-red-500",
      badge: "3 criticos",
      link: "/encargado/stock",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      message: "Pago registrado: Juan Perez - $850",
      time: "Hace 15 min",
      icon: DollarSign,
      containerClass: "bg-emerald-100",
      iconClass: "text-emerald-600",
    },
    {
      id: 2,
      message: `Stock critico: ${criticalProduct.name} (${criticalProduct.stock} unidades)`,
      time: "Hace 30 min",
      icon: AlertTriangle,
      containerClass: "bg-amber-100",
      iconClass: "text-amber-600",
    },
    {
      id: 3,
      message: "Se registro una nueva inscripcion en la sede",
      time: "Hace 1 hora",
      icon: Users,
      containerClass: "bg-blue-100",
      iconClass: "text-blue-600",
    },
  ];

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Panel del encargado de sucursal 1</h1>
          <p className="app-page-copy">Una vista operativa mas liviana para controlar la sede desde escritorio o celular sin perder contexto.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className={`rounded-[28px] bg-gradient-to-br ${action.color} p-5 text-white shadow-xl transition-transform duration-200 hover:-translate-y-1 sm:p-6`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <action.icon className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{action.badge}</span>
            </div>
            <h3 className="mt-5 text-xl font-bold">{action.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/85">{action.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 app-panel">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Actividad reciente</h2>
          </div>
        </div>
        <div className="space-y-4 px-5 py-5 sm:px-6">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${activity.containerClass}`}>
                <activity.icon className={`h-5 w-5 ${activity.iconClass}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                <p className="mt-1 text-xs text-slate-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
