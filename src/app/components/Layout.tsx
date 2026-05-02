import { useMemo, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  DollarSign,
  Users,
  ShoppingCart,
  Home,
  LogOut,
  Shield,
  Briefcase,
  Tag,
  BarChart3,
  Bell,
  Package,
  Menu,
  X,
  ClipboardList,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import PageBackButton from "./PageBackButton";
import { hasPermission } from "../permissions";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const navigationGroups = useMemo(() => {
    const groups = [
      {
        title: "General",
        items: [{ to: "/home", label: "Inicio", icon: Home }],
      },
    ];

    if (user?.role === "secretary") {
      groups.push({
        title: "Operaciones",
        items: [
          { to: "/cobranzas", label: "Cobranzas", icon: DollarSign },
          { to: "/cobranzas/reclamos", label: "Reclamos de pago", icon: ClipboardList },
          { to: "/cobranzas/recordatorios", label: "Recordatorios", icon: Bell },
          { to: "/kiosco", label: "Kiosco", icon: ShoppingCart },
        ],
      });
    }

    if (user?.role === "manager") {
      groups.push({
        title: "Gestion de sucursal",
        items: [
          { to: "/encargado/alumnos", label: "Alumnos", icon: Users },
          { to: "/encargado/inscripciones", label: "Inscripciones y pagos", icon: DollarSign },
          { to: "/encargado/alertas", label: "Alertas", icon: Bell },
          { to: "/cobranzas/deudores", label: "Alumnos con deuda", icon: Users },
          { to: "/kiosco", label: "Ventas kiosco", icon: ShoppingCart },
          { to: "/encargado/stock", label: "Stock y reposicion", icon: Package },
        ],
      });
    }

    if (user?.role === "admin") {
      groups.push({
        title: "Administracion general",
        items: [
          { to: "/admin/promociones", label: "Promociones", icon: Tag },
          { to: "/admin/reportes", label: "Reporte cobranzas", icon: BarChart3 },
          ...(hasPermission(user.role, "kiosk.viewDailySales")
            ? [{ to: "/kiosco", label: "Ventas kiosco", icon: ShoppingCart }]
            : []),
        ],
      });
    }

    return groups;
  }, [user?.role, location.pathname]);

  const activeNavigationPath = useMemo(() => {
    const allItems = navigationGroups.flatMap((group) => group.items);
    const matchingItems = allItems
      .filter((item) => {
        if (item.to === "/home") {
          return location.pathname === "/home";
        }

        return location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
      })
      .sort((a, b) => b.to.length - a.to.length);

    return matchingItems[0]?.to;
  }, [navigationGroups, location.pathname]);

  const isActive = (path: string) => activeNavigationPath === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleDesktopSidebar = () => setDesktopSidebarOpen((current) => !current);

  const roleAccent = "from-indigo-primary to-indigo-dark";
  const branchLabel = "Sede Norte";

  const SidebarContent = (
    <>
      <div className={`shrink-0 border-b border-white/70 bg-gradient-to-br ${roleAccent} p-6 text-white`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">SquatGym</p>
            <h1 className="mt-2 text-2xl font-bold">Panel administrativo</h1>
            <p className="mt-1 text-sm text-white/75">{branchLabel}</p>
          </div>
          <button
            onClick={toggleDesktopSidebar}
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white transition-all duration-300 hover:bg-white/20 lg:inline-flex"
            aria-label="Contraer sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-5">
        {navigationGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-300 ${
                    isActive(item.to)
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto shrink-0 border-t border-slate-200 p-4 pb-5">
        <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${roleAccent} text-white shadow-sm`}>
              {user?.role === "admin" ? (
                <Shield className="h-5 w-5" />
              ) : user?.role === "manager" ? (
                <Briefcase className="h-5 w-5" />
              ) : (
                <Users className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="font-medium text-slate-900">{user?.name || "Usuario"}</p>
              <p className="text-sm text-slate-500">{user?.roleName || "Rol no asignado"}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition-all duration-300 hover:bg-red-100"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesion
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-svh bg-transparent">
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden h-screen w-80 flex-col border-r border-white/70 bg-white/90 backdrop-blur transition-all duration-300 lg:flex ${
          desktopSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {SidebarContent}
      </aside>

      {!desktopSidebarOpen && (
        <button
          onClick={toggleDesktopSidebar}
          className="fixed left-4 top-4 z-30 hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/95 text-slate-700 shadow-sm transition-all duration-300 hover:bg-white lg:inline-flex"
          aria-label="Expandir sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      <div
        className={`flex min-h-svh flex-1 flex-col transition-all duration-300 ${
          desktopSidebarOpen ? "lg:pl-80" : "lg:pl-0"
        }`}
      >
        <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 px-4 py-3 backdrop-blur sm:px-6 lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">SquatGym</p>
              <p className="text-base font-semibold text-slate-900">{user?.roleName || "Panel"}</p>
            </div>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm"
              aria-label="Abrir navegacion"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
              onClick={closeMobileMenu}
              aria-label="Cerrar navegacion"
            />
            <aside className="relative flex h-full w-[88vw] max-w-xs flex-col bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <p className="font-semibold text-slate-900">Navegacion</p>
                <button
                  onClick={closeMobileMenu}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {SidebarContent}
            </aside>
          </div>
        )}

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <PageBackButton pathname={location.pathname} />
          <Outlet />
        </main>
        <footer className="border-t border-indigo-light bg-white/85 px-4 py-4 text-sm text-indigo-dark backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-2 sm:grid-cols-3 sm:items-center">
            <p className="font-medium text-indigo-darkest">SquatGym</p>
            <p className="text-left sm:text-center">{branchLabel}</p>
            <p className="text-left sm:text-right">Sistema administrativo 2026</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
