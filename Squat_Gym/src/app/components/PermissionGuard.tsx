import { ReactNode } from "react";
import { Link, Navigate } from "react-router";
import { AlertTriangle, Home } from "lucide-react";
import { useUser } from "../context/UserContext";
import { hasAnyPermission, permissionCatalog, roleLabels, type PermissionId } from "../permissions";

type PermissionGuardProps = {
  children: ReactNode;
  permissions?: PermissionId[];
};

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function PermissionGuard({ children, permissions = [] }: PermissionGuardProps) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (permissions.length === 0 || hasAnyPermission(user.role, permissions)) {
    return <>{children}</>;
  }

  return (
    <div className="app-page">
      <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-950">Acceso no permitido</h1>
        <p className="mt-2 text-slate-600">
          Tu rol actual ({roleLabels[user.role]}) no tiene permiso para esta accion.
        </p>
        {permissions.length > 0 && (
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
            <p className="text-sm font-semibold text-slate-800">Permisos requeridos</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {permissions.map((permission) => (
                <li key={permission}>- {permissionCatalog[permission].label}</li>
              ))}
            </ul>
          </div>
        )}
        <Link
          to="/home"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Home className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
