import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock, Dumbbell, Shield, Briefcase, Users, ArrowRight } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"admin" | "manager" | "secretary">("secretary");

  const roles = [
    {
      value: "admin" as const,
      name: "Administrador general",
      icon: Shield,
      color: "from-rose-500 to-red-500",
      description: "Acceso completo al sistema",
    },
    {
      value: "manager" as const,
      name: "Encargado de sucursal",
      icon: Briefcase,
      color: "from-amber-500 to-orange-500",
      description: "Gestión operativa de la sede",
    },
    {
      value: "secretary" as const,
      name: "Secretaría / recepción",
      icon: Users,
      color: "from-sky-500 to-blue-500",
      description: "Cobros, kiosco y atención diaria",
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const role = roles.find((item) => item.value === selectedRole);
    if (role) {
      setUser({
        name: email || "Usuario",
        role: selectedRole,
        roleName: role.name,
      });
    }
    navigate("/home");
  };

  return (
    <div className="relative min-h-svh overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.30),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.20),_transparent_25%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)]" />
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle,_rgba(255,255,255,0.12),_transparent_60%)] blur-3xl" />

      <div className="relative mx-auto grid min-h-svh max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,480px)] lg:px-8">
        <section className="hidden text-white lg:block">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
              <Dumbbell className="h-4 w-4" />
              Plataforma administrativa
            </div>
            <h1 className="mt-6 text-5xl font-bold leading-tight">
              SquatGym ahora se siente más claro, moderno y usable en cualquier pantalla.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              La experiencia de acceso se rediseñó para que el ingreso, la selección de rol y los formularios funcionen
              con la misma comodidad en desktop y mobile.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-sm text-slate-300">UI adaptable</p>
                <p className="mt-3 text-2xl font-semibold">100%</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Roles demo</p>
                <p className="mt-3 text-2xl font-semibold">3 perfiles</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Acceso guiado</p>
                <p className="mt-3 text-2xl font-semibold">1 paso</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full">
          <div className="mx-auto w-full max-w-xl rounded-[32px] border border-white/15 bg-white/96 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-8">
            <div className="mb-6 text-center sm:mb-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg sm:h-20 sm:w-20">
                <Dumbbell className="h-9 w-9 sm:h-10 sm:w-10" />
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">SquatGym</h1>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">Sistema administrativo responsive</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Seleccioná tu rol
                </label>
                <div className="grid gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      className={`w-full rounded-2xl border p-4 text-left transition-all sm:p-5 ${
                        selectedRole === role.value
                          ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-100"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${role.color} text-white shadow-sm`}>
                          <role.icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-900">{role.name}</p>
                          <p className="text-sm text-slate-500">{role.description}</p>
                        </div>
                        <div className={`h-5 w-5 rounded-full border-2 ${
                          selectedRole === role.value ? "border-blue-500 bg-blue-500" : "border-slate-300"
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Usuario o correo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingresa tu usuario o correo"
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingresa tu contraseña"
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
              >
                Ingresar
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-center text-sm text-blue-800">
              Modo prototipo: elegí un rol y entrá sin credenciales reales.
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-500">
              SquatGym © 2026 · Gestión administrativa
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
