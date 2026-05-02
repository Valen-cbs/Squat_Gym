import { Link } from "react-router";
import {
<<<<<<< HEAD
  Tag,
  BarChart3,
  ShoppingCart,
=======
  Users,
  Tag,
  BarChart3,
  ShoppingCart,
  Settings,
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
<<<<<<< HEAD
import { promotions } from "../../data/catalog";

export default function DashboardAdmin() {
  const stats = [
    { label: "Promociones activas", value: String(promotions.filter((promotion) => promotion.status === "Activa").length), icon: Tag, color: "from-violet-500 to-purple-500" },
    { label: "Sedes operativas", value: "3", icon: BarChart3, color: "from-emerald-500 to-green-500" },
=======

export default function DashboardAdmin() {
  const stats = [
    { label: "Usuarios totales", value: "47", icon: Users, color: "from-sky-500 to-blue-500" },
    { label: "Promociones activas", value: "8", icon: Tag, color: "from-violet-500 to-purple-500" },
    { label: "Sedes operativas", value: "3", icon: BarChart3, color: "from-emerald-500 to-green-500" },
    { label: "Alertas pendientes", value: "12", icon: AlertTriangle, color: "from-amber-500 to-orange-500" },
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
  ];

  const quickActions = [
    {
<<<<<<< HEAD
=======
      title: "Gestion de usuarios",
      description: "Crear, modificar y administrar accesos.",
      icon: Users,
      color: "from-blue-600 to-cyan-500",
      link: "/admin/usuarios",
      badge: "47 usuarios",
    },
    {
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
      title: "Promociones y planes",
      description: "Campanas, membresias y descuentos vigentes.",
      icon: Tag,
      color: "from-violet-600 to-fuchsia-500",
      link: "/admin/promociones",
<<<<<<< HEAD
      badge: `${promotions.filter((promotion) => promotion.status === "Activa").length} activas`,
=======
      badge: "8 activas",
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
    },
    {
      title: "Reporte de cobranzas",
      description: "Pagos recibidos, pendientes y deuda por sede.",
      icon: BarChart3,
      color: "from-emerald-600 to-green-500",
      link: "/admin/reportes",
      badge: "3 sedes",
    },
    {
      title: "Ventas del kiosco",
      description: "Consulta ventas diarias por sede y turno.",
      icon: ShoppingCart,
      color: "from-amber-600 to-orange-500",
      link: "/kiosco",
      badge: "Hoy",
    },
<<<<<<< HEAD
  ];

  const recentActivity = [
    { id: 1, user: "Juan Perez", action: `Creo nueva promocion '${promotions[0].name}'`, time: "Hace 5 minutos", type: "create" },
    { id: 2, user: "Maria Gonzalez", action: "Actualizo fechas de promocion vigente", time: "Hace 15 minutos", type: "update" },
    { id: 3, user: "Carlos Rodriguez", action: "Genero reporte de sede Central", time: "Hace 1 hora", type: "report" },
=======
    {
      title: "Permisos",
      description: "Matriz de roles y acciones automaticas.",
      icon: Settings,
      color: "from-slate-700 to-slate-900",
      link: "/admin/permisos",
      badge: "Activos",
    },
  ];

  const recentActivity = [
    { id: 1, user: "Juan Perez", action: "Creo nueva promocion '2x1 Verano'", time: "Hace 5 minutos", type: "create" },
    { id: 2, user: "Maria Gonzalez", action: "Modifico permisos de usuario 'Ana Lopez'", time: "Hace 15 minutos", type: "update" },
    { id: 3, user: "Carlos Rodriguez", action: "Genero reporte de sede Central", time: "Hace 1 hora", type: "report" },
    { id: 4, user: "Sistema", action: "Alerta automatica: stock critico en sede Norte", time: "Hace 2 horas", type: "alert" },
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
  ];

  const systemHealth = [
    { name: "Sede Central", status: "Operativo", users: 165, revenue: "$125,400", color: "green" },
    { name: "Sede Norte", status: "Operativo", users: 142, revenue: "$98,200", color: "green" },
    { name: "Sede Sur", status: "Advertencia", users: 89, revenue: "$67,800", color: "orange" },
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
                  activity.type === "update" ? "bg-blue-500" : "bg-violet-500"
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
