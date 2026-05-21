import { useEffect, useRef, useState } from "react";
import { Bell, CalendarDays, Check, MessageSquare, Plus, Trash2, Users, X } from "lucide-react";

type NotificationChannel = "Mail" | "Interna";
type NotificationScheduleMode = "Fecha puntual" | "Rango de fechas" | "Permanente";
type NotificationFrequency = "Una vez" | "Diaria" | "Semanal" | "Quincenal" | "Mensual";
type InternalDestination =
  | "/cobranzas"
  | "/cobranzas/deudores"
  | "/cobranzas/reclamos"
  | "/encargado"
  | "/encargado/stock"
  | "/kiosco"
  | "/kiosco/stock"
  | "/admin/reportes"
  | "/admin/notificaciones";
type NotificationRecipient =
  | "Alumno deudor"
  | "Secretaria"
  | "Encargado"
  | "Administrador"
  | "Secretaria y encargado"
  | "Secretaria, encargado y administrador";

type NotificationSetting = {
  id: string;
  title: string;
  trigger: string;
  channel: NotificationChannel;
  recipients: NotificationRecipient;
  message: string;
  internalDestination: InternalDestination;
  enabled: boolean;
  scheduleMode: NotificationScheduleMode;
  singleDate: string;
  startDate: string;
  endDate: string;
  frequency: NotificationFrequency;
};

const recipientOptions: NotificationRecipient[] = [
  "Alumno deudor",
  "Secretaria",
  "Encargado",
  "Administrador",
  "Secretaria y encargado",
  "Secretaria, encargado y administrador",
];

const scheduleModes: NotificationScheduleMode[] = ["Fecha puntual", "Rango de fechas", "Permanente"];
const frequencyOptions: NotificationFrequency[] = ["Una vez", "Diaria", "Semanal", "Quincenal", "Mensual"];

const allInternalDestinationOptions: Array<{ value: InternalDestination; label: string }> = [
  { value: "/cobranzas", label: "Cobranzas - Secretaria" },
  { value: "/cobranzas/deudores", label: "Alumnos con deuda" },
  { value: "/cobranzas/reclamos", label: "Reclamos de pago" },
  { value: "/encargado", label: "Panel encargado" },
  { value: "/encargado/stock", label: "Stock - Encargado" },
  { value: "/kiosco", label: "Kiosco" },
  { value: "/kiosco/stock", label: "Stock del kiosco" },
  { value: "/admin/reportes", label: "Reportes del administrador" },
  { value: "/admin/notificaciones", label: "Configuracion de notificaciones" },
];

/**
 * Define qué pantallas internas son válidas para cada destinatario.
 * "Alumno deudor" no tiene acceso al sistema interno, por lo que
 * forzamos el canal a "Mail" cuando se selecciona ese destinatario.
 */
const destinationsByRecipient: Record<NotificationRecipient, InternalDestination[]> = {
  "Alumno deudor": [],
  "Secretaria": [
    "/cobranzas",
    "/cobranzas/deudores",
    "/cobranzas/reclamos",
  ],
  "Encargado": [
    "/encargado",
    "/encargado/stock",
    "/kiosco",
    "/kiosco/stock",
  ],
  "Administrador": [
    "/admin/reportes",
    "/admin/notificaciones",
    "/cobranzas/deudores",
  ],
  "Secretaria y encargado": [
    "/cobranzas",
    "/cobranzas/deudores",
    "/cobranzas/reclamos",
    "/encargado",
    "/encargado/stock",
    "/kiosco",
    "/kiosco/stock",
  ],
  "Secretaria, encargado y administrador": [
    "/cobranzas",
    "/cobranzas/deudores",
    "/cobranzas/reclamos",
    "/encargado",
    "/encargado/stock",
    "/kiosco",
    "/kiosco/stock",
    "/admin/reportes",
    "/admin/notificaciones",
  ],
};

function getAvailableDestinations(recipient: NotificationRecipient) {
  const allowed = destinationsByRecipient[recipient];
  return allInternalDestinationOptions.filter((option) => allowed.includes(option.value));
}

/**
 * Dado un cambio de destinatario, devuelve los campos que hay que
 * actualizar en el setting para mantener la consistencia:
 * - Si es "Alumno deudor", fuerza canal a "Mail" (no tiene pantalla interna).
 * - Si el destino actual ya no es válido para el nuevo destinatario,
 *   lo resetea al primero disponible.
 */
function patchOnRecipientChange(
  current: NotificationSetting,
  newRecipient: NotificationRecipient,
): Partial<NotificationSetting> {
  if (newRecipient === "Alumno deudor") {
    return { recipients: newRecipient, channel: "Mail" };
  }

  const available = destinationsByRecipient[newRecipient];
  const destinationStillValid = available.includes(current.internalDestination);

  return {
    recipients: newRecipient,
    internalDestination: destinationStillValid
      ? current.internalDestination
      : available[0],
  };
}

const initialSettings: NotificationSetting[] = [
  {
    id: "alumnos-con-deuda",
    title: "Alumnos con deuda",
    trigger: "Listado de alumnos que se encuentran en estado deudor.",
    channel: "Interna",
    recipients: "Secretaria",
    message: "4 alumnos requieren seguimiento de cobranza",
    internalDestination: "/cobranzas",
    enabled: true,
    scheduleMode: "Rango de fechas",
    singleDate: "2026-05-20",
    startDate: "2026-05-01",
    endDate: "2026-05-31",
    frequency: "Mensual",
  },
];

const defaultAlert = (position: number): NotificationSetting => ({
  id: `alerta-${Date.now()}-${position}`,
  title: "Nueva alerta",
  trigger: "Definir condicion que genera la alerta.",
  channel: "Interna",
  recipients: "Secretaria y encargado",
  message: "Escribir el mensaje que recibiran los destinatarios.",
  internalDestination: "/cobranzas",
  enabled: true,
  scheduleMode: "Fecha puntual",
  singleDate: "2026-05-20",
  startDate: "2026-05-20",
  endDate: "2026-05-31",
  frequency: "Una vez",
});

type ScheduleControlsProps = {
  setting: NotificationSetting;
  onChange: (patch: Partial<NotificationSetting>) => void;
};

function ScheduleControls({ setting, onChange }: ScheduleControlsProps) {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-blue-900">
        <CalendarDays className="h-4 w-4" />
        Programacion
      </div>

      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        {scheduleModes.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() =>
              onChange({
                scheduleMode: mode,
                frequency:
                  mode === "Fecha puntual" ? "Una vez" : setting.frequency === "Una vez" ? "Mensual" : setting.frequency,
              })
            }
            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
              setting.scheduleMode === mode
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-blue-200 bg-white text-blue-900 hover:bg-blue-100"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {setting.scheduleMode === "Fecha puntual" && (
        <label>
          <span className="mb-2 block text-sm font-medium text-blue-900">Fecha</span>
          <input
            type="date"
            value={setting.singleDate}
            onChange={(event) => onChange({ singleDate: event.target.value })}
            className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      )}

      {setting.scheduleMode === "Rango de fechas" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <label>
            <span className="mb-2 block text-sm font-medium text-blue-900">Desde</span>
            <input
              type="date"
              value={setting.startDate}
              onChange={(event) => onChange({ startDate: event.target.value })}
              className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-blue-900">Hasta</span>
            <input
              type="date"
              value={setting.endDate}
              onChange={(event) => onChange({ endDate: event.target.value })}
              className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-blue-900">Frecuencia</span>
            <select
              value={setting.frequency}
              onChange={(event) => onChange({ frequency: event.target.value as NotificationFrequency })}
              className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {frequencyOptions.filter((frequency) => frequency !== "Una vez").map((frequency) => (
                <option key={frequency} value={frequency}>
                  {frequency}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {setting.scheduleMode === "Permanente" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-medium text-blue-900">Desde</span>
            <input
              type="date"
              value={setting.startDate}
              onChange={(event) => onChange({ startDate: event.target.value })}
              className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-blue-900">Frecuencia</span>
            <select
              value={setting.frequency}
              onChange={(event) => onChange({ frequency: event.target.value as NotificationFrequency })}
              className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {frequencyOptions.filter((frequency) => frequency !== "Una vez").map((frequency) => (
                <option key={frequency} value={frequency}>
                  {frequency}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
}

// ─── Subcomponente reutilizable para los campos de canal/destinatario/destino ─
type RoutingFieldsProps = {
  setting: NotificationSetting;
  onChange: (patch: Partial<NotificationSetting>) => void;
};

function RoutingFields({ setting, onChange }: RoutingFieldsProps) {
  const availableDestinations = getAvailableDestinations(setting.recipients);
  const isAlumnoDeudor = setting.recipients === "Alumno deudor";

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm font-medium text-slate-700">Canal</span>
          <select
            value={setting.channel}
            disabled={isAlumnoDeudor}
            onChange={(event) => onChange({ channel: event.target.value as NotificationChannel })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          >
            <option value="Interna">Interna</option>
            <option value="Mail">Mail</option>
          </select>
          {isAlumnoDeudor && (
            <p className="mt-1 text-xs text-slate-400">
              Los alumnos reciben notificaciones solo por Mail.
            </p>
          )}
        </label>

        <label>
          <span className="mb-2 block text-sm font-medium text-slate-700">Destinatarios</span>
          <select
            value={setting.recipients}
            onChange={(event) => {
              const newRecipient = event.target.value as NotificationRecipient;
              onChange(patchOnRecipientChange(setting, newRecipient));
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {recipientOptions.map((recipient) => (
              <option key={recipient} value={recipient}>
                {recipient}
              </option>
            ))}
          </select>
        </label>
      </div>

      {setting.channel === "Interna" && !isAlumnoDeudor && (
        <label>
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Pantalla destino al hacer click
          </span>
          <select
            value={setting.internalDestination}
            onChange={(event) =>
              onChange({ internalDestination: event.target.value as InternalDestination })
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableDestinations.map((destination) => (
              <option key={destination.value} value={destination.value}>
                {destination.label}
              </option>
            ))}
          </select>
        </label>
      )}
    </>
  );
}

export default function ConfiguracionNotificaciones() {
  const [settings, setSettings] = useState(initialSettings);
  const [draftAlert, setDraftAlert] = useState<NotificationSetting | null>(null);
  const draftTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!draftAlert) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      draftTitleRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [draftAlert?.id]);

  const updateSetting = (id: string, patch: Partial<NotificationSetting>) => {
    setSettings((current) =>
      current.map((setting) => (setting.id === id ? { ...setting, ...patch } : setting))
    );
  };

  const openNewAlert = () => {
    setDraftAlert((current) => current ?? defaultAlert(settings.length + 1));
  };

  const updateDraftAlert = (patch: Partial<NotificationSetting>) => {
    setDraftAlert((current) => (current ? { ...current, ...patch } : current));
  };

  const createSetting = () => {
    if (!draftAlert) {
      return;
    }

    setSettings((current) => {
      const [firstSetting, ...otherSettings] = current;
      return firstSetting ? [firstSetting, draftAlert, ...otherSettings] : [draftAlert];
    });
    setDraftAlert(null);
  };

  const removeSetting = (id: string) => {
    setSettings((current) => current.filter((setting) => setting.id !== id));
  };

  const enabledCount = settings.filter((setting) => setting.enabled).length;

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Configuracion de notificaciones</h1>
          <p className="app-page-copy">
            Configura alertas, destinatarios, programacion y mensajes del sistema.
          </p>
        </div>
        <button
          type="button"
          onClick={openNewAlert}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Nueva alerta
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="app-panel p-5">
          <p className="text-sm text-slate-500">Alertas configuradas</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{settings.length}</p>
        </div>
        <div className="app-panel p-5">
          <p className="text-sm text-slate-500">Alertas activas</p>
          <p className="mt-2 text-2xl font-bold text-blue-700">{enabledCount}</p>
        </div>
        <div className="app-panel p-5">
          <p className="text-sm text-slate-500">Destinatarios disponibles</p>
          <p className="mt-2 text-2xl font-bold text-emerald-700">{recipientOptions.length}</p>
        </div>
      </div>

      <div className="space-y-5">
        {settings.map((setting, index) => (
          <section key={setting.id} className="app-panel overflow-hidden">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-lightest text-indigo-primary">
                    {index === 0 ? <Users className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0">
                    <input
                      type="text"
                      value={setting.title}
                      onChange={(event) => updateSetting(setting.id, { title: event.target.value })}
                      className="w-full rounded-lg border border-transparent bg-transparent px-0 py-1 text-xl font-bold text-slate-950 outline-none transition-colors focus:border-slate-300 focus:bg-white focus:px-3 focus:ring-2 focus:ring-blue-500"
                      aria-label="Nombre de alerta"
                    />
                    <p className="mt-1 text-sm text-slate-600">Alerta #{index + 1}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={setting.enabled}
                      onChange={(event) => updateSetting(setting.id, { enabled: event.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    {setting.enabled ? "Activa" : "Pausada"}
                  </label>

                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeSetting(setting.id)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 text-red-600 transition-colors hover:bg-red-50"
                      aria-label="Eliminar alerta"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="space-y-4">
                <label>
                  <span className="mb-2 block text-sm font-medium text-slate-700">Disparador</span>
                  <textarea
                    value={setting.trigger}
                    onChange={(event) => updateSetting(setting.id, { trigger: event.target.value })}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>

                <RoutingFields
                  setting={setting}
                  onChange={(patch) => updateSetting(setting.id, patch)}
                />

                <ScheduleControls setting={setting} onChange={(patch) => updateSetting(setting.id, patch)} />
              </div>

              <label>
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <MessageSquare className="h-4 w-4 text-slate-500" />
                  Mensaje de la alerta
                </span>
                <textarea
                  value={setting.message}
                  onChange={(event) => updateSetting(setting.id, { message: event.target.value })}
                  rows={11}
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
          </section>
        ))}
      </div>

      {draftAlert && (
        <div
          className="fixed inset-0 z-50 flex animate-in fade-in-0 justify-end bg-slate-950/40 p-0 duration-150 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="nueva-alerta-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDraftAlert(null);
            }
          }}
        >
          <aside className="flex h-full w-full max-w-3xl animate-in slide-in-from-right flex-col overflow-hidden bg-white shadow-2xl duration-200 sm:rounded-2xl">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-blue-700">Nueva alerta</p>
                  <h2 id="nueva-alerta-title" className="mt-1 text-2xl font-bold text-slate-950">
                    Crear notificacion
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setDraftAlert(null)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
              <label>
                <span className="mb-2 block text-sm font-medium text-slate-700">Nombre de la alerta</span>
                <input
                  ref={draftTitleRef}
                  type="text"
                  value={draftAlert.title}
                  onChange={(event) => updateDraftAlert({ title: event.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base font-semibold text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium text-slate-700">Disparador</span>
                <textarea
                  value={draftAlert.trigger}
                  onChange={(event) => updateDraftAlert({ trigger: event.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <RoutingFields setting={draftAlert} onChange={updateDraftAlert} />

              <ScheduleControls setting={draftAlert} onChange={updateDraftAlert} />

              <label>
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <MessageSquare className="h-4 w-4 text-slate-500" />
                  Mensaje de la alerta
                </span>
                <textarea
                  value={draftAlert.message}
                  onChange={(event) => updateDraftAlert({ message: event.target.value })}
                  rows={6}
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>

            <div className="border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setDraftAlert(null)}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={createSetting}
                  disabled={!draftAlert.title.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <Check className="h-4 w-4" />
                  Crear alerta
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
