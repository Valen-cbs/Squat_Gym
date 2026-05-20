import { useState } from "react";
import { Bell, Lock, Mail, Monitor, Save, Shield, User } from "lucide-react";
import { useUser } from "../context/UserContext";

type ToggleKey =
  | "emailNotifications"
  | "systemNotifications"
  | "dailySummary"
  | "compactMode"
  | "requirePin";

export default function PerfilPreferencias() {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user?.name ?? "Usuario");
  const [email, setEmail] = useState(user?.name?.includes("@") ? user.name : "secretaria@squatgym.com");
  const [phone, setPhone] = useState("11 5555-2046");
  const [language, setLanguage] = useState("es-AR");
  const [theme, setTheme] = useState("system");
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    emailNotifications: true,
    systemNotifications: true,
    dailySummary: false,
    compactMode: false,
    requirePin: true,
  });

  const updateToggle = (key: ToggleKey) => {
    setToggles((current) => ({ ...current, [key]: !current[key] }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (user) {
      setUser({ ...user, name });
    }

    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  const ToggleRow = ({
    id,
    label,
    description,
  }: {
    id: ToggleKey;
    label: string;
    description: string;
  }) => (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div>
        <p className="font-medium text-slate-900">{label}</p>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => updateToggle(id)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          toggles[id] ? "bg-indigo-primary" : "bg-slate-300"
        }`}
        aria-label={label}
        aria-pressed={toggles[id]}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            toggles[id] ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Preferencias de perfil</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <section className="app-panel p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-lightest text-indigo-primary">
                <User className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Datos de cuenta</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-medium text-slate-700">Nombre visible</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-primary"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-medium text-slate-700">Correo</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-primary"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-medium text-slate-700">Telefono</span>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-primary"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-medium text-slate-700">Rol</span>
                <input
                  value={user?.roleName ?? "Rol no asignado"}
                  disabled
                  className="w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500"
                />
              </label>
            </div>
          </section>

          <section className="app-panel p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-lightest text-indigo-primary">
                <Bell className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Notificaciones</h2>
            </div>
            <div className="space-y-3">
              <ToggleRow
                id="systemNotifications"
                label="Alertas del sistema"
                description="Avisos de deudores, reclamos y stock bajo."
              />
              <ToggleRow
                id="emailNotifications"
                label="Notificaciones por correo"
                description="Copias de avisos importantes en el mail del perfil."
              />
              <ToggleRow
                id="dailySummary"
                label="Resumen diario"
                description="Un cierre al final del dia con actividad pendiente."
              />
            </div>
          </section>

          <section className="app-panel p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-lightest text-indigo-primary">
                <Monitor className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Visualizacion</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-medium text-slate-700">Tema</span>
                <select
                  value={theme}
                  onChange={(event) => setTheme(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-primary"
                >
                  <option value="system">Segun sistema</option>
                  <option value="light">Claro</option>
                  <option value="dark">Oscuro</option>
                </select>
              </label>
              <label>
                <span className="mb-2 block text-sm font-medium text-slate-700">Idioma</span>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-primary"
                >
                  <option value="es-AR">Espanol Argentina</option>
                  <option value="es-UY">Espanol Uruguay</option>
                  <option value="pt-BR">Portugues Brasil</option>
                </select>
              </label>
            </div>

            <div className="mt-4">
              <ToggleRow
                id="compactMode"
                label="Modo compacto"
                description="Tablas y paneles con menos espacio vertical."
              />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="app-panel p-5 sm:p-6 lg:sticky lg:top-24">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-lightest text-indigo-primary">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Seguridad</h2>
            </div>

            <div className="space-y-3">
              <ToggleRow
                id="requirePin"
                label="Pedir PIN"
                description="Solicitar PIN antes de acciones sensibles."
              />
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Lock className="h-4 w-4" />
                Cambiar contrasena
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Mail className="h-4 w-4" />
                Verificar correo
              </button>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              <Save className="h-4 w-4" />
              Guardar preferencias
            </button>

            {saved && (
              <p className="mt-3 rounded-lg bg-success-light px-3 py-2 text-center text-sm font-medium text-success-dark">
                Preferencias guardadas
              </p>
            )}
          </section>
        </aside>
      </form>
    </div>
  );
}
