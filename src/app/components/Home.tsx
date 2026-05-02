import { Link } from "react-router";
import {
  DollarSign,
  ShoppingCart,
  AlertCircle,
  ArrowRight,
  Tag,
  BarChart3,
  Bell,
  ClipboardList,
  Send,
  Package,
  Users,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { hasPermission } from "../permissions";

export default function Home() {
  const { user } = useUser();
  const displayName = user?.role === "secretary" && (!user.name || user.name === "Usuario")
    ? "Malena Trangoni"
    : user?.name || "Usuario";
  const roleLabel =
    user?.role === "secretary" ? "Secretaria" :
    user?.role === "manager" ? "Encargado de sucursal 1" :
    user?.role === "admin" ? "Administrador" :
    "Usuario";

  const canViewDebtors = hasPermission(user?.role, "collections.viewDebtors");
  const canManageClaims = hasPermission(user?.role, "collections.managePaymentClaim");
  const canSendReminders = hasPermission(user?.role, "collections.sendMassDueReminders");
  const canViewStock = hasPermission(user?.role, "kiosk.viewStock");
  const canCreateRestockOrder = hasPermission(user?.role, "kiosk.createRestockOrder");
  const canViewDailySales = hasPermission(user?.role, "kiosk.viewDailySales");

  const secretaryActions = [
    ...(canViewDebtors
      ? [{
          title: "Alumnos con deuda",
          description: "Consultar deudores con montos, fechas y estado de acceso.",
          icon: AlertCircle,
          link: "/cobranzas/deudores",
          features: ["Detalle de deuda", "Fechas de atraso", "Estado del alumno"],
        }]
      : []),
    ...(canManageClaims
      ? [{
          title: "Reclamos de pago",
          description: "Verificar pagos informados por alumnos que no figuran en caja.",
          icon: ClipboardList,
          link: "/cobranzas/reclamos",
          features: ["Validar comprobante", "Resolver reclamo", "Conciliar pago"],
        }]
      : []),
    ...(canSendReminders
      ? [{
          title: "Recordatorios masivos",
          description: "Enviar avisos a alumnos con cuotas proximas a vencer.",
          icon: Send,
          link: "/cobranzas/recordatorios",
          features: ["Seleccion masiva", "Vencidos y proximos", "Envio por canal"],
        }]
      : []),
    ...(canViewStock
      ? [{
          title: "Stock del kiosco",
          description: "Consultar inventario actual por producto y detectar faltantes.",
          icon: Package,
          link: "/kiosco/stock",
          features: ["Stock actual", "Minimos", "Productos criticos"],
        }]
      : []),
  ];

  const managerActions = [
    {
      title: "Alumnos",
      description: "Consulta el listado general de alumnos de la sede y administra bajas.",
      icon: Users,
      link: "/encargado/alumnos",
      features: ["Buscar alumnos", "Ver estado", "Borrar registros"],
    },
    {
      title: "Inscripciones y pagos",
      description: "Segui el movimiento comercial de tu sede y el trabajo de recepcion.",
      icon: DollarSign,
      link: "/encargado/inscripciones",
      features: ["Ver inscripciones", "Consultar pagos", "Registros por secretaria"],
    },
    {
      title: "Alertas",
      description: "Prioriza deudores, clases reprogramadas y stock critico desde un solo panel.",
      icon: Bell,
      link: "/encargado/alertas",
      features: ["Alumnos deudores", "Clases reprogramadas", "Stock critico"],
    },
    ...(canViewDebtors
      ? [{
          title: "Alumnos con deuda",
          description: "Consulta el listado de alumnos deudores de tu sede.",
          icon: AlertCircle,
          link: "/cobranzas/deudores",
          features: ["Montos", "Fechas de atraso", "Detalle de cuenta"],
        }]
      : []),
    ...(canViewDailySales
      ? [{
          title: "Ventas del kiosco",
          description: "Revisa ventas diarias por sede, turno y comprobante.",
          icon: ShoppingCart,
          link: "/kiosco",
          features: ["Ventas por turno", "Ingresos del dia", "Detalle de tickets"],
        }]
      : []),
    {
      title: "Stock y reposicion",
      description: "Monitorea inventario, faltantes y proximos pedidos del kiosco.",
      icon: ShoppingCart,
      link: "/encargado/stock",
      features: canCreateRestockOrder
        ? ["Inventario actual", "Productos criticos", "Generar pedidos"]
        : ["Inventario actual", "Productos criticos"],
    },
  ];

  const adminActions = [
    {
      title: "Promociones y planes",
      description: "Configura campanas comerciales y propuestas especiales por sede.",
      icon: Tag,
      link: "/admin/promociones",
      features: ["Promociones activas", "Planes de membresia", "Descuentos"],
    },
    {
      title: "Reporte de cobranzas",
      description: "Informe consolidado de pagos recibidos, pendientes y deuda por sede.",
      icon: BarChart3,
      link: "/admin/reportes",
      features: ["Pagos recibidos", "Pendientes", "Deudas por sede"],
    },
    ...(canViewDailySales
      ? [{
          title: "Ventas del kiosco",
          description: "Consulta ventas diarias por sede y turno.",
          icon: ShoppingCart,
          link: "/kiosco",
          features: ["Ventas por sede", "Turnos", "Tickets"],
        }]
      : []),
  ];

  const quickActions =
    user?.role === "admin" ? adminActions :
    user?.role === "manager" ? managerActions :
    secretaryActions;

  const secretaryPriorityActions = [
    {
      title: "Registrar Pago (Membresía)",
      description: "Ir directo al cobro de cuotas y buscar al alumno en el mismo paso.",
      icon: DollarSign,
      link: "/cobranzas/buscar-alumno",
      features: ["Buscar alumno", "Aplicar descuento efectivo", "Emitir comprobante"],
    },
    {
      title: "REGISTRAR VENTA DE KIOSCO",
      description: "Abrir una nueva venta con el catalogo listo para buscar productos rapido.",
      icon: ShoppingCart,
      link: "/kiosco/nueva-venta",
      features: ["Buscar producto", "Armar carrito", "Emitir ticket"],
    },
  ];

  const recentAlerts = [
    ...(canViewDebtors
      ? [{ id: 1, type: "debt", message: "3 alumnos deudores", severity: "high" }]
      : []),
    ...(canViewStock || canCreateRestockOrder
      ? [{ id: 2, type: "stock", message: "4 productos con stock critico", severity: "high" }]
      : []),
  ];

  const getAlertLink = (type: string) => {
    if (type === "stock") {
      return user?.role === "manager" ? "/encargado/stock" : "/kiosco/stock";
    }

    return "/cobranzas/deudores";
  };

  return (
    <div className="app-page">
      <section className="mb-6 rounded-2xl border border-indigo-light bg-white/90 p-5 shadow-sm shadow-indigo-light/50 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-primary">Bienvenido!</p>
        <h1 className="mt-2 text-2xl font-bold text-indigo-darkest sm:text-3xl">
          {roleLabel}: {displayName}
        </h1>
        <p className="mt-1 text-sm text-indigo-dark sm:text-base">Sede: 1. French 414.</p>
      </section>

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
                className="app-action-card group p-4 sm:p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                      {action.title}
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/80 transition-transform group-hover:translate-x-1" />
                </div>
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
              className="app-action-card group p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                    {action.title}
                  </span>
                </div>
                <ArrowRight className="h-5 w-5 text-white/80 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {recentAlerts.length > 0 && (
      <section className="mt-6 app-panel">
        <div className="border-b border-indigo-light px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning-dark" />
            <h2 className="text-xl font-bold text-indigo-darkest">Alertas</h2>
          </div>
        </div>
        <div className="space-y-3 px-5 py-5 sm:px-6">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-2xl border p-4 sm:p-5 ${
                alert.severity === "high"
                  ? "border-warning-medium bg-warning-light/35"
                  : "border-indigo-light bg-indigo-lightest"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className={`mt-0.5 h-5 w-5 shrink-0 ${
                      alert.severity === "high" ? "text-warning-dark" : "text-indigo-primary"
                    }`}
                  />
                  <p className="font-medium text-indigo-darkest">{alert.message}</p>
                </div>
                <Link
                  to={getAlertLink(alert.type)}
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${
                    alert.severity === "high" ? "text-warning-dark" : "text-indigo-primary"
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
      )}
    </div>
  );
}
