import { createBrowserRouter } from "react-router";
import type { ComponentType } from "react";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import DashboardCobranzas from "./components/cobranzas/DashboardCobranzas";
import BusquedaAlumno from "./components/cobranzas/BusquedaAlumno";
import Deudores from "./components/cobranzas/Deudores";
import EstadoCuenta from "./components/cobranzas/EstadoCuenta";
import RegistrarPago from "./components/cobranzas/RegistrarPago";
import ReciboGenerado from "./components/cobranzas/ReciboGenerado";
import ListadoCobranzas from "./components/cobranzas/ListadoCobranzas";
import ReclamosPago from "./components/cobranzas/ReclamosPago";
import ReclamoDetalle from "./components/cobranzas/ReclamoDetalle";
import RecordatoriosVencimientos from "./components/cobranzas/RecordatoriosVencimientos";
import KioscoPrincipal from "./components/kiosco/KioscoPrincipal";
import RegistrarVenta from "./components/kiosco/RegistrarVenta";
import DetalleVenta from "./components/kiosco/DetalleVenta";
import StockProductos from "./components/kiosco/StockProductos";
import DetalleProducto from "./components/kiosco/DetalleProducto";
import PedidoReposicion from "./components/kiosco/PedidoReposicion";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import GestionPromociones from "./components/admin/GestionPromociones";
import ReportesSedes from "./components/admin/ReportesSedes";
import Auditoria from "./components/admin/Auditoria";
import DashboardEncargado from "./components/encargado/DashboardEncargado";
import InscripcionesPagos from "./components/encargado/InscripcionesPagos";
import AlertasNotificaciones from "./components/encargado/AlertasNotificaciones";
import StockReposicion from "./components/encargado/StockReposicion";
import Alumnos from "./components/encargado/Alumnos";
import PermissionGuard, { RequireAuth } from "./components/PermissionGuard";
import type { PermissionId } from "./permissions";

const withAuth = (Component: ComponentType) => function AuthenticatedRoute() {
  return (
    <RequireAuth>
      <Component />
    </RequireAuth>
  );
};

const withPermission = (permissions: PermissionId[], Component: ComponentType) => function PermissionRoute() {
  return (
    <PermissionGuard permissions={permissions}>
      <Component />
    </PermissionGuard>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/home",
    Component: withAuth(Layout),
    children: [
      { index: true, Component: withAuth(Home) },
    ],
  },
  {
    path: "/cobranzas",
    Component: withPermission([
      "collections.registerPayment",
      "collections.viewDebtors",
      "collections.managePaymentClaim",
      "collections.sendMassDueReminders",
    ], Layout),
    children: [
      { index: true, Component: withPermission(["collections.registerPayment"], DashboardCobranzas) },
      { path: "buscar-alumno", Component: withPermission(["collections.registerPayment"], BusquedaAlumno) },
      { path: "deudores", Component: withPermission(["collections.viewDebtors"], Deudores) },
      { path: "estado-cuenta/:id", Component: withPermission(["collections.viewDebtors"], EstadoCuenta) },
      { path: "registrar-pago/:id", Component: withPermission(["collections.registerPayment"], RegistrarPago) },
      { path: "recibo/:id", Component: withPermission(["collections.registerPayment"], ReciboGenerado) },
      { path: "listado", Component: withPermission(["collections.managePaymentClaim"], ListadoCobranzas) },
      { path: "reclamos", Component: withPermission(["collections.managePaymentClaim"], ReclamosPago) },
      { path: "reclamos/:id", Component: withPermission(["collections.managePaymentClaim"], ReclamoDetalle) },
      { path: "recordatorios", Component: withPermission(["collections.sendMassDueReminders"], RecordatoriosVencimientos) },
    ],
  },
  {
    path: "/kiosco",
    Component: withPermission([
      "kiosk.registerSale",
      "kiosk.viewStock",
      "kiosk.createRestockOrder",
      "kiosk.viewDailySales",
    ], Layout),
    children: [
      { index: true, Component: withPermission(["kiosk.registerSale", "kiosk.viewStock", "kiosk.viewDailySales"], KioscoPrincipal) },
      { path: "nueva-venta", Component: withPermission(["kiosk.registerSale"], RegistrarVenta) },
      { path: "venta/:id", Component: withPermission(["kiosk.registerSale", "kiosk.viewDailySales"], DetalleVenta) },
      { path: "stock", Component: withPermission(["kiosk.viewStock"], StockProductos) },
      { path: "producto/:id", Component: withPermission(["kiosk.viewStock"], DetalleProducto) },
      { path: "reposicion", Component: withPermission(["kiosk.createRestockOrder"], PedidoReposicion) },
    ],
  },
  {
    path: "/admin",
    Component: withPermission([
      "collections.generateReport",
      "kiosk.viewDailySales",
      "admin.managePromotions",
      "admin.audit",
    ], Layout),
    children: [
      { index: true, Component: withPermission(["admin.managePromotions", "collections.generateReport", "admin.audit"], DashboardAdmin) },
      { path: "promociones", Component: withPermission(["admin.managePromotions"], GestionPromociones) },
      { path: "reportes", Component: withPermission(["collections.generateReport"], ReportesSedes) },
      { path: "auditoria", Component: withPermission(["admin.audit"], Auditoria) },
    ],
  },
  {
    path: "/encargado",
    Component: withPermission([
      "collections.viewDebtors",
      "kiosk.viewStock",
      "kiosk.createRestockOrder",
      "kiosk.viewDailySales",
    ], Layout),
    children: [
      { index: true, Component: withPermission(["collections.viewDebtors"], DashboardEncargado) },
      { path: "alumnos", Component: withPermission(["collections.viewDebtors"], Alumnos) },
      { path: "inscripciones", Component: withPermission(["collections.viewDebtors"], InscripcionesPagos) },
      { path: "alertas", Component: withPermission(["collections.viewDebtors"], AlertasNotificaciones) },
      { path: "stock", Component: withPermission(["kiosk.createRestockOrder"], StockReposicion) },
    ],
  },
]);
