import { useState } from "react";
import {
  Bell,
  CalendarDays,
  CheckCircle,
  ClipboardList,
  Mail,
  MessageSquare,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

type NotificationModule = "Cobranzas" | "Kiosco";
type NotificationChannel = "Mail" | "Interna";
type NotificationSetting = {
  id: string;
  module: NotificationModule;
  title: string;
  description: string;
  trigger: string;
  channel: NotificationChannel;
  recipients: string;
  parameterLabel: string;
  parameterValue: string;
  message: string;
  enabled: boolean;
  icon: typeof Bell;
  monthlySchedule?: string;
};

const initialSettings: NotificationSetting[] = [
  {
    id: "debt-email",
    module: "Cobranzas",
    title: "Alerta por deuda",
    description: "Mail para el alumno cuando queda en estado deudor.",
    trigger: "Alumno marcado como deudor por cuota vencida.",
    channel: "Mail",
    recipients: "Alumno deudor",
    parameterLabel: "Enviar despues de",
    parameterValue: "0 dias desde que queda deudor",
    message: "Hola, registramos una deuda pendiente en tu cuenta. Por favor acercate a regularizarla para mantener tu acceso activo.",
    enabled: true,
    icon: Mail,
  },
  {
    id: "kiosk-report",
    module: "Kiosco",
    title: "Reporte de Kiosco",
    description: "Aviso cuando los reportes del kiosco estan disponibles.",
    trigger: "Cierre diario de ventas del kiosco disponible.",
    channel: "Interna",
    recipients: "Administrador",
    parameterLabel: "Horario de aviso",
    parameterValue: "22:00",
    message: "El reporte de kiosco ya esta disponible para revisar ventas por sede, turno y dia.",
    enabled: true,
    icon: ShoppingCart,
  },
  {
    id: "monthly-debtors",
    module: "Cobranzas",
    title: "Alumnos con deuda",
    description: "Alerta interna para visualizar alumnos morosos.",
    trigger: "Listado mensual de alumnos con deuda.",
    channel: "Interna",
    recipients: "Secretaria y encargado",
    parameterLabel: "Frecuencia",
    parameterValue: "Mensual",
    message: "Hay alumnos morosos para revisar. Consultar el listado actualizado y gestionar el seguimiento correspondiente.",
    enabled: true,
    icon: Users,
    monthlySchedule: "2026-05",
  },
  {
    id: "payment-claims",
    module: "Cobranzas",
    title: "Reclamos de pago",
    description: "Notificacion interna por reclamos o revisiones pendientes.",
    trigger: "Reclamo de pago creado o pendiente de revision.",
    channel: "Interna",
    recipients: "Secretaria",
    parameterLabel: "Repetir aviso cada",
    parameterValue: "24 horas si sigue pendiente",
    message: "Hay un reclamo de pago pendiente de revision. Verificar el comprobante y actualizar el estado del reclamo.",
    enabled: true,
    icon: ClipboardList,
  },
  {
    id: "critical-stock",
    module: "Kiosco",
    title: "Stock critico",
    description: "Alerta interna cuando un producto llega al stock minimo.",
    trigger: "Producto del kiosco alcanza el stock minimo definido.",
    channel: "Interna",
    recipients: "Encargado",
    parameterLabel: "Umbral",
    parameterValue: "Stock actual menor o igual al minimo",
    message: "Un producto del kiosco llego al stock minimo. Revisar inventario y generar pedido de reposicion si corresponde.",
    enabled: true,
    icon: Package,
  },
];

const moduleStyles: Record<NotificationModule, string> = {
  Cobranzas: "bg-blue-50 text-blue-700 border-blue-200",
  Kiosco: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function ConfiguracionPermisos() {
  const [settings, setSettings] = useState(initialSettings);

  const updateSetting = (id: string, patch: Partial<NotificationSetting>) => {
    setSettings((current) =>
      current.map((setting) => (setting.id === id ? { ...setting, ...patch } : setting))
    );
  };

  const enabledCount = settings.filter((setting) => setting.enabled).length;
  const cobranzasCount = settings.filter((setting) => setting.module === "Cobranzas").length;
  const kioskCount = settings.filter((setting) => setting.module === "Kiosco").length;

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Configuracion de notificaciones</h1>
          <p className="app-page-copy">
            Configura que alertas genera el sistema, sus parametros, destinatarios y mensajes para Cobranzas y Kiosco.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="app-panel p-5">
          <p className="text-sm text-slate-500">Alertas activas</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{enabledCount}</p>
        </div>
        <div className="app-panel p-5">
          <p className="text-sm text-slate-500">Cobranzas</p>
          <p className="mt-2 text-2xl font-bold text-blue-700">{cobranzasCount}</p>
        </div>
        <div className="app-panel p-5">
          <p className="text-sm text-slate-500">Kiosco</p>
          <p className="mt-2 text-2xl font-bold text-emerald-700">{kioskCount}</p>
        </div>
      </div>

      <div className="space-y-5">
        {settings.map((setting) => (
          <section key={setting.id} className="app-panel overflow-hidden">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-lightest text-indigo-primary">
                    <setting.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-950">{setting.title}</h2>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${moduleStyles[setting.module]}`}>
                        {setting.module}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{setting.description}</p>
                  </div>
                </div>

                <label className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={setting.enabled}
                    onChange={(event) => updateSetting(setting.id, { enabled: event.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  {setting.enabled ? "Activa" : "Pausada"}
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Disparador</p>
                  <p className="mt-2 text-sm font-medium text-slate-800">{setting.trigger}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm font-medium text-slate-700">Canal</span>
                    <select
                      value={setting.channel}
                      onChange={(event) => updateSetting(setting.id, { channel: event.target.value as NotificationChannel })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Interna">Interna</option>
                      <option value="Mail">Mail</option>
                    </select>
                  </label>
                  <label>
                    <span className="mb-2 block text-sm font-medium text-slate-700">Destinatarios</span>
                    <input
                      type="text"
                      value={setting.recipients}
                      onChange={(event) => updateSetting(setting.id, { recipients: event.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <label>
                  <span className="mb-2 block text-sm font-medium text-slate-700">{setting.parameterLabel}</span>
                  <input
                    type="text"
                    value={setting.parameterValue}
                    onChange={(event) => updateSetting(setting.id, { parameterValue: event.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>

                {setting.monthlySchedule !== undefined && (
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <label>
                      <span className="mb-2 block text-sm font-medium text-blue-900">Envio mensual</span>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          type="month"
                          value={setting.monthlySchedule}
                          onChange={(event) => updateSetting(setting.id, { monthlySchedule: event.target.value })}
                          className="rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                          <CalendarDays className="h-4 w-4" />
                          Programar envio
                        </button>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              <div>
                <label>
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <MessageSquare className="h-4 w-4 text-slate-500" />
                    Mensaje de la alerta
                  </span>
                  <textarea
                    value={setting.message}
                    onChange={(event) => updateSetting(setting.id, { message: event.target.value })}
                    rows={8}
                    className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Este mensaje se usara en la notificacion configurada para {setting.recipients}.
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
