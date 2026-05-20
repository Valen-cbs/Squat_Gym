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
  Package,
  Users,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { hasPermission } from "../permissions";

export default function Home() {
  const { user } = useUser();
  const displayName = "Usuario";
  const roleLabel =
    user?.role === "secretary" ? "Secretaria" :
    user?.role === "manager" ? "Encargado de sede norte" :
    user?.role === "admin" ? "Administrador" :
    "Usuario";

  const canViewDebtors = hasPermission(user?.role, "collections.viewDebtors");
  const canManageClaims = hasPermission(user?.role, "collections.managePaymentClaim");
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
      description: "Prioriza deudores y stock critico desde un solo panel.",
      icon: Bell,
      link: "/encargado/alertas",
      features: ["Alumnos deudores", "Stock bajo", "Alertas operativas"],
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
          description: "Consulta ventas diarias por turno o por rango de dias.",
          icon: ShoppingCart,
          link: "/kiosco",
          features: ["Reporte por turno", "Reporte por dia", "Total general"],
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
      title: "Promociones",
      description: "Configura campanas comerciales y descuentos por sede.",
      icon: Tag,
      link: "/admin/promociones",
      features: ["Promociones activas", "Vigencias", "Descuentos"],
    },
    {
      title: "Planes",
      description: "Gestiona planes de membresia, precios y beneficios.",
      icon: ClipboardList,
      link: "/admin/planes",
      features: ["Planes activos", "Precios", "Beneficios"],
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
          description: "Selecciona una sede y consulta ventas por turno o por rango de dias.",
          icon: ShoppingCart,
          link: "/kiosco",
          features: ["Seleccion de sede", "Reporte por turno", "Reporte por dia"],
        }]
      : []),
  ];

  const quickActions =
    user?.role === "admin" ? adminActions :
    user?.role === "manager" ? managerActions :
    secretaryActions;

  const secretaryPriorityActions = [
    {
      title: "Registrar pago (membresía)",
      description: "Ir directo al cobro de cuotas y buscar al alumno en el mismo paso.",
      icon: DollarSign,
      link: "/cobranzas/registrar-pago",
      features: ["Buscar alumno", "Aplicar descuento efectivo", "Emitir comprobante"],
    },
    {
      title: "Registrar venta de kiosco",
      description: "Abrir una nueva venta con el catalogo listo para buscar productos rapido.",
      icon: ShoppingCart,
      link: "/kiosco/nueva-venta",
      features: ["Buscar producto", "Armar carrito", "Emitir ticket"],
    },
  ];

  return (
    <div className="app-page">
      <section className="mb-6 rounded-2xl border border-indigo-light bg-white/90 p-5 shadow-sm shadow-indigo-light/50 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-primary">Bienvenido!</p>
        <h1 className="mt-2 text-2xl font-bold text-indigo-darkest sm:text-3xl">
          {roleLabel}: {displayName}
        </h1>
        <p className="mt-1 text-sm text-indigo-dark sm:text-base">Sede: Norte.</p>
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
                className="app-action-card group"
              >
                <div className="app-action-content">
                  <div className="app-action-icon">
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="app-action-label">{action.title}</span>
                </div>
                <ArrowRight className="app-action-arrow" />
              </Link>
            ))}
          </div>
        )}

        {user?.role !== "secretary" && (
          <div
            className={`grid gap-4 ${
              quickActions.length > 4
                ? "grid-cols-1 md:grid-cols-2 2xl:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
            }`}
          >
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
                  <span className="app-action-label">{action.title}</span>
                </div>
                <ArrowRight className="app-action-arrow" />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
