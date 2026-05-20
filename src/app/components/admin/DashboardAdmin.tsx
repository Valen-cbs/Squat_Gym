import { Link } from "react-router";
import {
  ArrowRight,
  Tag,
  BarChart3,
  ShoppingCart,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { promotions } from "../../data/catalog";

export default function DashboardAdmin() {
  const stats = [
    { label: "Promociones activas", value: String(promotions.filter((promotion) => promotion.status === "Activa").length), icon: Tag, color: "from-blue-500 to-indigo-500" },
    { label: "Sedes operativas", value: "2", icon: BarChart3, color: "from-emerald-500 to-green-500" },
  ];

  const quickActions = [
    {
      title: "Reporte de Cobranzas",
      description: "Pagos recibidos, pendientes y deuda por sede.",
      icon: BarChart3,
      link: "/admin/reportes",
      badge: "2 sedes",
    },
    {
      title: "Reporte de Kiosco",
      description: "Consulta ventas por sede, turno o rango de dias.",
      icon: ShoppingCart,
      link: "/kiosco",
      badge: "2 sedes",
    },
  ];

  const recentActivity = [
    { id: 1, user: "Juan Perez", action: `Creo nueva promocion '${promotions[0].name}'`, time: "Hace 5 minutos", type: "create" },
    { id: 2, user: "Maria Gonzalez", action: "Actualizo fechas de promocion vigente", time: "Hace 15 minutos", type: "update" },
    { id: 3, user: "Carlos Rodriguez", action: "Genero reporte de Sede Norte", time: "Hace 1 hora", type: "report" },
  ];

  const systemHealth = [
    { name: "Sede Norte", status: "Operativo", users: 142, revenue: "$98,200", color: "green" },
    { name: "Sede Sur", status: "Operativo", users: 89, revenue: "$67,800", color: "green" },
  ];

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Panel del administrador</h1>
          <p className="app-page-copy">Supervision general del sistema con modulos mas claros, compactos y comodos para revisar desde mobile.</p>
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

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="app-action-card group"
          >
            <div className="app-action-content">
              <div className="app-action-icon">
                <action.icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="app-action-label">{action.title}</h3>
                <p className="mt-1 text-sm leading-5 text-white/80">{action.badge}</p>
              </div>
            </div>
            <ArrowRight className="app-action-arrow" />
          </Link>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="app-panel">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">Actividad reciente</h2>
            </div>
          </div>
          <div className="space-y-4 px-5 py-5 sm:px-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className={`mt-1 h-2.5 w-2.5 rounded-full ${
                  activity.type === "alert" ? "bg-amber-500" :
                  activity.type === "create" ? "bg-emerald-500" :
                  activity.type === "update" ? "bg-blue-500" : "bg-indigo-500"
                }`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.user}</p>
                  <p className="text-sm text-slate-600">{activity.action}</p>
                  <p className="mt-1 text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="app-panel">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900">Estado de sedes</h2>
            </div>
          </div>
          <div className="space-y-4 px-5 py-5 sm:px-6">
            {systemHealth.map((sede, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-bold text-slate-900">{sede.name}</h3>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    sede.color === "green" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {sede.color === "green" ? (
                      <CheckCircle className="h-3.5 w-3.5" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5" />
                    )}
                    {sede.status}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Alumnos</p>
                    <p className="font-bold text-slate-900">{sede.users}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Ingresos mes</p>
                    <p className="font-bold text-slate-900">{sede.revenue}</p>
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
