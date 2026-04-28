import { Link } from "react-router";
import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertCircle,
  ArrowRight,
  Tag,
  BarChart3,
  Activity,
  Shield,
  Bell,
  FileText,
} from "lucide-react";
import { useUser } from "../context/UserContext";

export default function Home() {
  const { user } = useUser();

  const stats = [
    { label: "Cobranzas del mes", value: "$125,400", icon: DollarSign, color: "from-emerald-500 to-green-500", trend: "+12%" },
    { label: "Ventas kiosco hoy", value: "$4,250", icon: ShoppingCart, color: "from-sky-500 to-blue-500", trend: "+8%" },
    { label: "Alumnos activos", value: "165", icon: Users, color: "from-violet-500 to-purple-500", trend: "+5" },
    { label: "Alertas pendientes", value: "8", icon: AlertCircle, color: "from-amber-500 to-orange-500", trend: "Revisar" },
  ];

  const secretaryActions = [
    {
      title: "Gestión de cobranzas",
      description: "Registrar pagos, revisar estados de cuenta y seguir la recaudación diaria.",
      icon: DollarSign,
      color: "from-blue-600 to-cyan-500",
      link: "/cobranzas",
      features: ["Búsqueda de alumnos", "Registrar pagos", "Historial de cobranzas"],
    },
    {
      title: "Administración de kiosco",
      description: "Controlar ventas, stock y reposiciones sin salir del mismo flujo.",
      icon: ShoppingCart,
      color: "from-fuchsia-600 to-violet-500",
      link: "/kiosco",
      features: ["Nueva venta", "Control de stock", "Pedidos de reposición"],
    },
  ];

  const managerActions = [
    {
      title: "Inscripciones y pagos",
      description: "Seguí el movimiento comercial de tu sede y el trabajo de recepción.",
      icon: DollarSign,
      color: "from-blue-600 to-cyan-500",
      link: "/encargado/inscripciones",
      features: ["Ver inscripciones", "Consultar pagos", "Registros por secretaría"],
    },
    {
      title: "Alertas y notificaciones",
      description: "Priorizá deudores, clases reprogramadas y stock crítico desde un solo panel.",
      icon: Bell,
      color: "from-amber-600 to-orange-500",
      link: "/encargado/alertas",
      features: ["Alumnos deudores", "Clases reprogramadas", "Stock crítico"],
    },
    {
      title: "Novedades internas",
      description: "Registrá incidentes, tareas operativas y eventos especiales de la sede.",
      icon: FileText,
      color: "from-violet-600 to-purple-500",
      link: "/encargado/novedades",
      features: ["Mantenimientos", "Incidentes", "Eventos especiales"],
    },
    {
      title: "Stock y reposición",
      description: "Monitoreá inventario, faltantes y próximos pedidos del kiosco.",
      icon: ShoppingCart,
      color: "from-rose-600 to-red-500",
      link: "/encargado/stock",
      features: ["Inventario actual", "Productos críticos", "Generar pedidos"],
    },
  ];

  const adminActions = [
    {
      title: "Gestión de usuarios",
      description: "Creá cuentas, definí roles y mantené el acceso del equipo bajo control.",
      icon: Users,
      color: "from-blue-600 to-cyan-500",
      link: "/admin/usuarios",
      features: ["Crear usuarios", "Asignar roles", "Gestionar permisos"],
    },
    {
      title: "Promociones y planes",
      description: "Configurá campañas comerciales y propuestas especiales por sede.",
      icon: Tag,
      color: "from-violet-600 to-fuchsia-500",
      link: "/admin/promociones",
      features: ["Promociones activas", "Planes de membresía", "Descuentos"],
    },
    {
      title: "Reportes por sede",
      description: "Visualizá métricas, comparativas e indicadores consolidados.",
      icon: BarChart3,
      color: "from-emerald-600 to-green-500",
      link: "/admin/reportes",
      features: ["Ingresos por sede", "Comparativas", "Métricas clave"],
    },
    {
      title: "Auditoría de actividad",
      description: "Seguí acciones clave del sistema y revisá trazabilidad operativa.",
      icon: Activity,
      color: "from-amber-600 to-orange-500",
      link: "/admin/auditoria",
      features: ["Log de eventos", "Acciones de usuarios", "Alertas de seguridad"],
    },
    {
      title: "Permisos y alertas",
      description: "Ajustá accesos, notificaciones y reglas generales del panel.",
      icon: Shield,
      color: "from-rose-600 to-red-500",
      link: "/admin/permisos",
      features: ["Roles y permisos", "Reglas de alertas", "Configuración general"],
    },
  ];

  const quickActions =
    user?.role === "admin" ? adminActions :
    user?.role === "manager" ? managerActions :
    secretaryActions;

  const recentAlerts = [
    { id: 1, type: "debt", message: "3 alumnos con deuda mayor a 2 meses", severity: "high" },
    { id: 2, type: "stock", message: "5 productos con stock crítico", severity: "high" },
    { id: 3, type: "info", message: "23 alumnos pendientes de pago este mes", severity: "medium" },
  ];

  return (
    <div className="app-page">
      <section className="app-stat-grid">
        {stats.map((stat, index) => (
          <div key={index} className="app-panel p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">{stat.value}</p>
                <p className="mt-3 text-sm font-medium text-slate-500">{stat.trend}</p>
              </div>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <div className="app-page-header">
          <div>
            <h2 className="app-page-title">Accesos principales</h2>
            <p className="app-page-copy">Acciones rápidas para operar cada módulo sin información repetida ni bloques innecesarios.</p>
          </div>
        </div>

        <div className={`grid gap-4 ${
          quickActions.length > 4 ? "grid-cols-1 md:grid-cols-2 2xl:grid-cols-3" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
        }`}>
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`group overflow-hidden rounded-[28px] bg-gradient-to-br ${action.color} p-5 text-white shadow-xl transition-transform duration-200 hover:-translate-y-1 sm:p-6`}
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    <action.icon className="h-7 w-7" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/80 transition-transform group-hover:translate-x-1" />
                </div>
                <div>
                  <h3 className="text-xl font-bold sm:text-2xl">{action.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/85">{action.description}</p>
                </div>
                <div className="grid gap-2 text-sm text-white/90">
                  {action.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-white/80" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 app-panel">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900">Alertas y notificaciones</h2>
          </div>
        </div>
        <div className="space-y-3 px-5 py-5 sm:px-6">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-2xl border p-4 sm:p-5 ${
                alert.severity === "high"
                  ? "border-amber-200 bg-amber-50/80"
                  : "border-blue-200 bg-blue-50/80"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <AlertCircle className={`mt-0.5 h-5 w-5 shrink-0 ${
                    alert.severity === "high" ? "text-amber-600" : "text-blue-600"
                  }`} />
                  <p className="font-medium text-slate-900">{alert.message}</p>
                </div>
                <Link
                  to={alert.type === "debt" ? "/cobranzas" : "/kiosco"}
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${
                    alert.severity === "high" ? "text-amber-700" : "text-blue-700"
                  }`}
                >
                  Ver módulo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
