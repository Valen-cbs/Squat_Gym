export type Role = "admin" | "manager" | "secretary";

export const roleLabels: Record<Role, string> = {
  admin: "Administrador",
  manager: "Encargado",
  secretary: "Secretaria",
};

export const permissionCatalog = {
  "collections.registerPayment": {
    module: "Gestion de Cobranzas",
    label: "Registrar pago de cuota",
    actor: "Secretaria",
  },
  "collections.sendDueAlert": {
    module: "Gestion de Cobranzas",
    label: "Enviar alerta de vencimiento de cuota",
    actor: "Sistema",
  },
  "collections.autoMarkDebtor": {
    module: "Gestion de Cobranzas",
    label: "Marcar alumno como deudor",
    actor: "Sistema",
  },
  "collections.autoRestrictAccess": {
    module: "Gestion de Cobranzas",
    label: "Aplicar restriccion de acceso por mora",
    actor: "Sistema",
  },
  "collections.notifyManagerDebtors": {
    module: "Gestion de Cobranzas",
    label: "Notificar al encargado sobre alumnos deudores",
    actor: "Sistema",
  },
  "collections.viewDebtors": {
    module: "Gestion de Cobranzas",
    label: "Consultar alumnos con deuda",
    actor: "Encargado / Secretaria",
  },
  "collections.managePaymentClaim": {
    module: "Gestion de Cobranzas",
    label: "Gestionar reclamo de pago",
    actor: "Secretaria",
  },
  "collections.generateReport": {
    module: "Gestion de Cobranzas",
    label: "Generar reporte de cobranzas",
    actor: "Administrador",
  },
  "collections.autoRestoreAccess": {
    module: "Gestion de Cobranzas",
    label: "Rehabilitar acceso tras pago",
    actor: "Sistema",
  },
  "collections.sendMassDueReminders": {
    module: "Gestion de Cobranzas",
    label: "Enviar recordatorio masivo de vencimientos",
    actor: "Secretaria",
  },
  "kiosk.registerSale": {
    module: "Administracion de Kiosco",
    label: "Registrar venta del kiosco",
    actor: "Secretaria",
  },
  "kiosk.viewStock": {
    module: "Administracion de Kiosco",
    label: "Consultar stock actual",
    actor: "Encargado / Secretaria",
  },
  "kiosk.createRestockOrder": {
    module: "Administracion de Kiosco",
    label: "Generar pedido de reposicion",
    actor: "Encargado",
  },
  "kiosk.receiveLowStockAlert": {
    module: "Administracion de Kiosco",
    label: "Recibir alerta de stock bajo",
    actor: "Sistema",
  },
  "kiosk.autoUpdateStockAfterSale": {
    module: "Administracion de Kiosco",
    label: "Actualizar stock tras venta",
    actor: "Sistema",
  },
  "kiosk.viewDailySales": {
    module: "Administracion de Kiosco",
    label: "Consultar ventas diarias por sede",
    actor: "Encargado / Administrador",
  },
  "kiosk.notifyInventoryMismatch": {
    module: "Administracion de Kiosco",
    label: "Emitir alerta por faltante o diferencia de inventario",
    actor: "Sistema",
  },
  "admin.manageUsers": {
    module: "Administracion general",
    label: "Gestionar usuarios",
    actor: "Administrador",
  },
  "admin.managePromotions": {
    module: "Administracion general",
    label: "Gestionar promociones y planes",
    actor: "Administrador",
  },
  "admin.configurePermissions": {
    module: "Administracion general",
    label: "Configurar permisos y alertas",
    actor: "Administrador",
  },
  "admin.audit": {
    module: "Administracion general",
    label: "Consultar auditoria",
    actor: "Administrador",
  },
} as const;

export type PermissionId = keyof typeof permissionCatalog;

export const systemPermissions = Object.entries(permissionCatalog)
  .filter(([, permission]) => permission.actor === "Sistema")
  .map(([id]) => id as PermissionId);

export const rolePermissions: Record<Role, PermissionId[]> = {
  admin: [
    "collections.generateReport",
    "kiosk.viewDailySales",
    "admin.manageUsers",
    "admin.managePromotions",
    "admin.configurePermissions",
    "admin.audit",
  ],
  manager: [
    "collections.viewDebtors",
    "kiosk.viewStock",
    "kiosk.createRestockOrder",
    "kiosk.viewDailySales",
  ],
  secretary: [
    "collections.registerPayment",
    "collections.viewDebtors",
    "collections.managePaymentClaim",
    "collections.sendMassDueReminders",
    "kiosk.registerSale",
    "kiosk.viewStock",
  ],
};

export function hasPermission(role: Role | undefined, permission: PermissionId) {
  return Boolean(role && rolePermissions[role].includes(permission));
}

export function hasAnyPermission(role: Role | undefined, permissions: PermissionId[]) {
  return permissions.some((permission) => hasPermission(role, permission));
}

export function getPermissionsByModule(permissions: PermissionId[]) {
  return permissions.reduce<Record<string, PermissionId[]>>((groups, permission) => {
    const module = permissionCatalog[permission].module;
    groups[module] = [...(groups[module] ?? []), permission];
    return groups;
  }, {});
}
