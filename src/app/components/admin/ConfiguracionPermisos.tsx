import { useState } from "react";
import { Bell, CheckCircle, Shield, Zap } from "lucide-react";
import {
  getPermissionsByModule,
  permissionCatalog,
  roleLabels,
  rolePermissions,
  systemPermissions,
  type PermissionId,
  type Role,
} from "../../permissions";

const roleCards: Array<{ role: Role; users: number; tone: string; description: string }> = [
  {
    role: "admin",
    users: 2,
    tone: "border-red-200 bg-red-50",
    description: "Control general, reportes consolidados y configuracion.",
  },
  {
    role: "manager",
    users: 3,
    tone: "border-amber-200 bg-amber-50",
    description: "Control operativo de sede, deudores, ventas y reposicion.",
  },
  {
    role: "secretary",
    users: 4,
    tone: "border-blue-200 bg-blue-50",
    description: "Cobros, reclamos, recordatorios, ventas y consulta de stock.",
  },
];

const alertRules = [
  {
    id: 1,
    name: "Vencimiento de cuota",
    condition: "Cuota vence en 3 dias o ya vencio",
    action: "El sistema notifica al alumno",
    permission: "collections.sendDueAlert" as PermissionId,
    status: "Activa",
  },
  {
    id: 2,
    name: "Marca automatica de deudor",
    condition: "Supera el periodo de gracia sin pagar",
    action: "El sistema actualiza el estado del alumno",
    permission: "collections.autoMarkDebtor" as PermissionId,
    status: "Activa",
  },
  {
    id: 3,
    name: "Restriccion por mora",
    condition: "Deuda mayor a 15-20 dias",
    action: "El sistema bloquea el ingreso al gimnasio",
    permission: "collections.autoRestrictAccess" as PermissionId,
    status: "Activa",
  },
  {
    id: 4,
    name: "Aviso a encargado",
    condition: "Alumnos en mora dentro de la sede",
    action: "El sistema envia listado al encargado",
    permission: "collections.notifyManagerDebtors" as PermissionId,
    status: "Activa",
  },
  {
    id: 5,
    name: "Rehabilitacion tras pago",
    condition: "Pago pendiente confirmado",
    action: "El sistema habilita nuevamente el acceso",
    permission: "collections.autoRestoreAccess" as PermissionId,
    status: "Activa",
  },
  {
    id: 6,
    name: "Stock bajo",
    condition: "Producto alcanza el minimo definido",
    action: "El sistema notifica stock bajo",
    permission: "kiosk.receiveLowStockAlert" as PermissionId,
    status: "Activa",
  },
  {
    id: 7,
    name: "Stock tras venta",
    condition: "Venta registrada en kiosco",
    action: "El sistema descuenta inventario",
    permission: "kiosk.autoUpdateStockAfterSale" as PermissionId,
    status: "Activa",
  },
  {
    id: 8,
    name: "Diferencia de inventario",
    condition: "Stock registrado no coincide con stock real",
    action: "El sistema emite alerta por faltante",
    permission: "kiosk.notifyInventoryMismatch" as PermissionId,
    status: "Activa",
  },
];

export default function ConfiguracionPermisos() {
  const [activeTab, setActiveTab] = useState("permisos");

  const humanPermissionCount = Object.values(rolePermissions).reduce((sum, permissions) => sum + permissions.length, 0);
  const systemPermissionGroups = getPermissionsByModule(systemPermissions);

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Permisos y alertas</h1>
          <p className="app-page-copy">Matriz de responsabilidades por rol y reglas automaticas del sistema.</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200">
          <div className="flex flex-wrap gap-2 px-5 sm:px-6">
            <button
              onClick={() => setActiveTab("permisos")}
              className={`border-b-2 px-4 py-4 font-medium transition-colors ${
                activeTab === "permisos"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Roles y permisos
              </span>
            </button>
            <button
              onClick={() => setActiveTab("alertas")}
              className={`border-b-2 px-4 py-4 font-medium transition-colors ${
                activeTab === "alertas"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Acciones automaticas
              </span>
            </button>
          </div>
        </div>

        {activeTab === "permisos" ? (
          <div className="p-5 sm:p-6">
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-700">Roles humanos</p>
                <p className="mt-1 text-2xl font-bold text-blue-800">{roleCards.length}</p>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-sm text-green-700">Permisos asignados</p>
                <p className="mt-1 text-2xl font-bold text-green-800">{humanPermissionCount}</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-amber-700">Acciones del Sistema</p>
                <p className="mt-1 text-2xl font-bold text-amber-800">{systemPermissions.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              {roleCards.map((card) => {
                const modules = getPermissionsByModule(rolePermissions[card.role]);

                return (
                  <section key={card.role} className={`rounded-xl border-2 p-5 ${card.tone}`}>
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-bold text-slate-950">{roleLabels[card.role]}</h2>
                        <p className="mt-1 text-sm text-slate-600">{card.description}</p>
                      </div>
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700">
                        {card.users} usuarios
                      </span>
                    </div>

                    <div className="space-y-5">
                      {Object.entries(modules).map(([module, permissions]) => (
                        <div key={module}>
                          <p className="mb-2 text-sm font-semibold text-slate-800">{module}</p>
                          <ul className="space-y-2">
                            {permissions.map((permission) => (
                              <li key={permission} className="flex items-start gap-2 text-sm text-slate-700">
                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                                <span>{permissionCatalog[permission].label}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <Zap className="mt-0.5 h-5 w-5 text-amber-600" />
                <div>
                  <h2 className="font-bold text-slate-950">Actor iniciador: Sistema</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Estas reglas no se habilitan a usuarios humanos; se ejecutan automaticamente y se muestran como alertas o cambios de estado.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.entries(systemPermissionGroups).map(([module, permissions]) => (
                <div key={module} className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="font-bold text-slate-950">{module}</h3>
                  <ul className="mt-3 space-y-2">
                    {permissions.map((permission) => (
                      <li key={permission} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{permissionCatalog[permission].label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {alertRules.map((rule) => (
                <div key={rule.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-950">{rule.name}</h3>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          {rule.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{permissionCatalog[rule.permission].label}</p>
                    </div>
                    <div className="grid gap-3 text-sm md:grid-cols-2 md:text-right">
                      <div>
                        <p className="font-semibold text-slate-700">Condicion</p>
                        <p className="text-slate-600">{rule.condition}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">Accion</p>
                        <p className="text-slate-600">{rule.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
