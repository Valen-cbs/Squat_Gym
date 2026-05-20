import { useState } from "react";
import { Save, User } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function PerfilPreferencias() {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user?.name ?? "Usuario");
  const [email, setEmail] = useState(user?.name?.includes("@") ? user.name : "secretaria@squatgym.com");
  const [phone, setPhone] = useState("11 5555-2046");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (user) {
      setUser({ ...user, name });
    }

    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Datos de cuenta</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="app-panel p-5 sm:p-6">
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

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          {saved && (
            <p className="rounded-lg bg-success-light px-3 py-2 text-center text-sm font-medium text-success-dark">
              Datos guardados
            </p>
          )}
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
          >
            <Save className="h-4 w-4" />
            Guardar datos
          </button>
        </div>
      </form>
    </div>
  );
}
