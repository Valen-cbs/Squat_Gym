import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Dumbbell, Lock, User } from "lucide-react";
import { useUser } from "../context/UserContext";
import type { Role } from "../permissions";

type LoginRole = {
  input: string;
  value: Role;
  name: string;
};

const roles: LoginRole[] = [
  {
    input: "secretaria",
    value: "secretary",
    name: "Secretaria",
  },
  {
    input: "administrador",
    value: "admin",
    name: "Administrador",
  },
  {
    input: "encargado",
    value: "manager",
    name: "Encargado de sede norte",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [roleInput, setRoleInput] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const requestedRole = roleInput.trim().toLowerCase();
    const role = roles.find((item) => item.input === requestedRole);

    if (!role) {
      setLoginError("Ingresá una de estas opciones: secretaria, administrador o encargado.");
      return;
    }

    setLoginError("");
    setUser({
      name: role.name,
      role: role.value,
      roleName: role.name,
    });
    navigate("/home");
  };

  return (
    <div className="relative min-h-svh overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.28),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)]" />

      <div className="relative mx-auto flex min-h-svh max-w-6xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/12 bg-white/96 shadow-2xl shadow-slate-950/30 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)]">
          <section className="flex flex-col justify-center bg-slate-950 px-6 py-8 text-white sm:px-8 lg:px-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg sm:h-20 sm:w-20">
              <Dumbbell className="h-9 w-9 sm:h-10 sm:w-10" />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">SquatGym</h1>
            <p className="mt-3 text-base text-slate-300 sm:text-lg">Sistema administrativo</p>
          </section>

          <section className="w-full px-5 py-6 sm:px-8 sm:py-8">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Iniciar sesión</h2>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">Escribí el rol e ingresá al sistema.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Usuario
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={roleInput}
                      onChange={(e) => {
                        setRoleInput(e.target.value);
                        setLoginError("");
                      }}
                      placeholder="secretaria, administrador o encargado"
                      required
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Opciones: secretaria, administrador, encargado.</p>
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
                      required
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              {loginError && (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
              >
                Ingresar
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>


            <div className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-500">
              SquatGym © 2026
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
