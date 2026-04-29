import { createBrowserRouter } from "react-router";
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
import KioscoPrincipal from "./components/kiosco/KioscoPrincipal";
import RegistrarVenta from "./components/kiosco/RegistrarVenta";
import DetalleVenta from "./components/kiosco/DetalleVenta";
import StockProductos from "./components/kiosco/StockProductos";
import DetalleProducto from "./components/kiosco/DetalleProducto";
import EditarProducto from "./components/kiosco/EditarProducto";
import PedidoReposicion from "./components/kiosco/PedidoReposicion";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import GestionUsuarios from "./components/admin/GestionUsuarios";
import GestionPromociones from "./components/admin/GestionPromociones";
import ReportesSedes from "./components/admin/ReportesSedes";
import Auditoria from "./components/admin/Auditoria";
import ConfiguracionPermisos from "./components/admin/ConfiguracionPermisos";
import DashboardEncargado from "./components/encargado/DashboardEncargado";
import InscripcionesPagos from "./components/encargado/InscripcionesPagos";
import AlertasNotificaciones from "./components/encargado/AlertasNotificaciones";
import NovedadesInternas from "./components/encargado/NovedadesInternas";
import StockReposicion from "./components/encargado/StockReposicion";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/home",
    Component: Layout,
    children: [
      { index: true, Component: Home },
    ],
  },
  {
    path: "/cobranzas",
    Component: Layout,
    children: [
      { index: true, Component: DashboardCobranzas },
      { path: "buscar-alumno", Component: BusquedaAlumno },
      { path: "deudores", Component: Deudores },
      { path: "estado-cuenta/:id", Component: EstadoCuenta },
      { path: "registrar-pago/:id", Component: RegistrarPago },
      { path: "recibo/:id", Component: ReciboGenerado },
      { path: "listado", Component: ListadoCobranzas },
    ],
  },
  {
    path: "/kiosco",
    Component: Layout,
    children: [
      { index: true, Component: KioscoPrincipal },
      { path: "nueva-venta", Component: RegistrarVenta },
      { path: "venta/:id", Component: DetalleVenta },
      { path: "stock", Component: StockProductos },
      { path: "producto/:id", Component: DetalleProducto },
      { path: "producto/:id/editar", Component: EditarProducto },
      { path: "reposicion", Component: PedidoReposicion },
    ],
  },
  {
    path: "/admin",
    Component: Layout,
    children: [
      { index: true, Component: DashboardAdmin },
      { path: "usuarios", Component: GestionUsuarios },
      { path: "promociones", Component: GestionPromociones },
      { path: "reportes", Component: ReportesSedes },
      { path: "auditoria", Component: Auditoria },
      { path: "permisos", Component: ConfiguracionPermisos },
    ],
  },
  {
    path: "/encargado",
    Component: Layout,
    children: [
      { index: true, Component: DashboardEncargado },
      { path: "inscripciones", Component: InscripcionesPagos },
      { path: "alertas", Component: AlertasNotificaciones },
      { path: "novedades", Component: NovedadesInternas },
      { path: "stock", Component: StockReposicion },
    ],
  },
]);
