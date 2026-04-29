import { Link } from "react-router";
import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertCircle,
  ArrowRight,
  Tag,
  BarChart3,
  Bell,
  FileText,
} from "lucide-react";
import { useUser } from "../context/UserContext";

export default function Home() {
  const { user } = useUser();

  const secretaryActions = [

  ];

  const managerActions = [
    {
      title: "Inscripciones y pagos",
      description: "Segui el movimiento comercial de tu sede y el trabajo de recepcion.",
      icon: DollarSign,
      color: "from-blue-600 to-cyan-500",
      link: "/encargado/inscripciones",
      features: ["Ver inscripciones", "Consultar pagos", "Registros por secretaria"],
    },
    {
      title: "Alertas",
      description: "Prioriza deudores, clases reprogramadas y stock critico desde un solo panel.",
      icon: Bell,
      color: "from-amber-600 to-orange-500",
      link: "/encargado/alertas",
      features: ["Alumnos deudores", "Clases reprogramadas", "Stock critico"],
    },
    {
      title: "Novedades internas",
      description: "Registra incidentes, tareas operativas y eventos especiales de la sede.",
      icon: FileText,
      color: "from-violet-600 to-purple-500",
      link: "/encargado/novedades",
      features: ["Mantenimientos", "Incidentes", "Eventos especiales"],
    },
    {
      title: "Stock y reposicion",
      description: "Monitorea inventario, faltantes y proximos pedidos del kiosco.",
      icon: ShoppingCart,
      color: "from-rose-600 to-red-500",
      link: "/encargado/stock",
      features: ["Inventario actual", "Productos criticos", "Generar pedidos"],
    },
  ];

  const adminActions = [
    {
      title: "Gestion de usuarios",
      description: "Crea cuentas, define roles y mantene el acceso del equipo bajo control.",
      icon: Users,
      color: "from-blue-600 to-cyan-500",
      link: "/admin/usuarios",
      features: ["Crear usuarios", "Asignar roles", "Gestionar permisos"],
    },
    {
      title: "Promociones y planes",
      description: "Configura campanas comerciales y propuestas especiales por sede.",
      icon: Tag,
      color: "from-violet-600 to-fuchsia-500",
      link: "/admin/promociones",
      features: ["Promociones activas", "Planes de membresia", "Descuentos"],
    },
    {
      title: "Reportes por sede",
      description: "Visualiza metricas, comparativas e indicadores consolidados.",
      icon: BarChart3,
      color: "from-emerald-600 to-green-500",
      link: "/admin/reportes",
      features: ["Ingresos por sede", "Comparativas", "Metricas clave"],
    },
  ];

  const quickActions =
    user?.role === "admin" ? adminActions :
    user?.role === "manager" ? managerActions :
    secretaryActions;

  const secretaryPriorityActions = [
    {
      title: "REGISTRAR PAGO GYM",
      description: "Ir directo al cobro de cuotas y buscar al alumno en el mismo paso.",
      icon: DollarSign,
      link: "/cobranzas/buscar-alumno",
      color: "from-emerald-600 to-green-500",
    },
    {
      title: "REGISTRAR VENTA DE KIOSCO",
      description: "Abrir una nueva venta con el catalogo listo para buscar productos rapido.",
      icon: ShoppingCart,
      link: "/kiosco/nueva-venta",
      color: "from-orange-500 to-amber-500",
    },
  ];

  const recentAlerts = [
    { id: 1, type: "debt", message: "3 alumnos deudores", severity: "high" },
    { id: 2, type: "stock", message: "4 productos con stock critico", severity: "high" },
  ];

  const getAlertLink = (type: string) => {
    if (type === "stock") {
      return "/kiosco/stock";
    }

    return "/cobranzas/deudores";
  };

  return (
    <div className="app-page">
      <section>
        <div className="app-page-header">
          <div>
            <h2 className="app-page-title">Accesos principales</h2>
          </div>
        </div>

        {user?.role === "secretary" && (
          <div className="mx-auto mb-6 grid max-w-5xl gap-4 lg:grid-cols-2">
            {secretaryPriorityActions.map((action) => (
              <Link
                key={action.title}
                to={action.link}
                className={`group rounded-[30px] bg-gradient-to-br ${action.color} p-6 text-white shadow-xl transition-transform duration-200 hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    <action.icon className="h-7 w-7" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/80 transition-transform group-hover:translate-x-1" />
                </div>
                <h3 className="mt-5 text-xl font-bold sm:text-2xl">{action.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/90">{action.description}</p>
              </Link>
            ))}
          </div>
        )}

        <div
          className={`grid gap-4 ${
            quickActions.length > 4
              ? "grid-cols-1 md:grid-cols-2 2xl:grid-cols-3"
              : user?.role === "secretary"
                ? "mx-auto max-w-5xl grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
          }`}
        >
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
            <h2 className="text-xl font-bold text-slate-900">Alertas</h2>
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
                  <AlertCircle
                    className={`mt-0.5 h-5 w-5 shrink-0 ${
                      alert.severity === "high" ? "text-amber-600" : "text-blue-600"
                    }`}
                  />
                  <p className="font-medium text-slate-900">{alert.message}</p>
                </div>
                <Link
                  to={getAlertLink(alert.type)}
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${
                    alert.severity === "high" ? "text-amber-700" : "text-blue-700"
                  }`}
                >
                  Ver
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
