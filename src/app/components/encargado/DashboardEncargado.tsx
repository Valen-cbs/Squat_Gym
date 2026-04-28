import { Link } from "react-router";
import {
  Users,
  Bell,
  FileText,
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Calendar,
} from "lucide-react";

export default function DashboardEncargado() {
  const stats = [
    { label: "Inscripciones del mes", value: "23", icon: Users, color: "from-sky-500 to-blue-500", trend: "+5" },
    { label: "Pagos registrados", value: "$4,250", icon: DollarSign, color: "from-emerald-500 to-green-500", trend: "+3%" },
    { label: "Alertas pendientes", value: "7", icon: AlertTriangle, color: "from-amber-500 to-orange-500", trend: "Prioridad alta" },
    { label: "Novedades del día", value: "4", icon: FileText, color: "from-violet-500 to-purple-500", trend: "Seguimiento" },
  ];

  const quickActions = [
    {
      title: "Inscripciones y pagos",
      description: "Consultar movimientos comerciales y el trabajo de recepción.",
      icon: DollarSign,
      color: "from-blue-600 to-cyan-500",
      link: "/encargado/inscripciones",
      badge: "23 este mes",
    },
    {
      title: "Alertas y notificaciones",
      description: "Ver deudores, cambios de clase y stock crítico.",
      icon: Bell,
      color: "from-amber-600 to-orange-500",
      link: "/encargado/alertas",
      badge: "7 alertas",
    },
    {
      title: "Novedades internas",
      description: "Registrar incidentes, tareas y eventos operativos.",
      icon: FileText,
      color: "from-violet-600 to-purple-500",
      link: "/encargado/novedades",
      badge: "4 hoy",
    },
    {
      title: "Stock y reposición",
      description: "Control de inventario y pedidos del kiosco.",
      icon: Package,
      color: "from-rose-600 to-red-500",
      link: "/encargado/stock",
      badge: "3 críticos",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      message: "Pago registrado: Juan Pérez - $850",
      time: "Hace 15 min",
      icon: DollarSign,
      containerClass: "bg-emerald-100",
      iconClass: "text-emerald-600",
    },
    {
      id: 2,
      message: "Stock crítico: Bebida Isotónica (2 unidades)",
      time: "Hace 30 min",
      icon: AlertTriangle,
      containerClass: "bg-amber-100",
      iconClass: "text-amber-600",
    },
    {
      id: 3,
      message: "Se registró una nueva inscripción en la sede",
      time: "Hace 1 hora",
      icon: Users,
      containerClass: "bg-blue-100",
      iconClass: "text-blue-600",
    },
    {
      id: 4,
      message: "Nueva novedad: Reparación aire acondicionado",
      time: "Hace 2 horas",
      icon: FileText,
      containerClass: "bg-violet-100",
      iconClass: "text-violet-600",
    },
  ];

  const dailySummary = [
    { label: "Ingresos del día", value: "$4,250" },
    { label: "Nuevas inscripciones", value: "3" },
    { label: "Profesores presentes", value: "7/8" },
    { label: "Productos vendidos", value: "28" },
  ];

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Dashboard del encargado</h1>
          <p className="app-page-copy">Una vista operativa más liviana para controlar la sede desde escritorio o celular sin perder contexto.</p>
        </div>
      </div>

      <div className="app-stat-grid">
        {stats.map((stat, index) => (
          <div key={index} className="app-panel p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">{stat.value}</p>
                <p className="mt-3 text-sm font-medium text-slate-500">{stat.trend}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[28px] bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-5 text-white shadow-xl shadow-blue-900/15 sm:p-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6" />
          <h2 className="text-xl font-bold">Resumen del día</h2>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {dailySummary.map((item, index) => (
            <div key={index} className="rounded-2xl border border-white/15 bg-white/10 p-4">
              <p className="text-sm text-blue-100">{item.label}</p>
              <p className="mt-2 text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
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
