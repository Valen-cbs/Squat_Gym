import { useState } from "react";
import { Link } from "react-router";
import { AlertCircle, CheckCircle, Search, SlidersHorizontal, User } from "lucide-react";
import { alumnos as initialAlumnos, type Alumno } from "../../data/alumnos";

export default function Alumnos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [alumnos, setAlumnos] = useState<Alumno[]>(initialAlumnos);
  const planOptions = Array.from(new Set(alumnos.map((alumno) => alumno.plan)));

  const filteredAlumnos = alumnos.filter((alumno) => {
    const matchesSearch =
      alumno.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumno.dni.includes(searchTerm) ||
      alumno.plan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || alumno.status === statusFilter;
    const matchesPlan = planFilter === "all" || alumno.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alumnos</h1>
        <p className="mt-2 text-gray-500">Listado general de alumnos de la sede.</p>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, DNI o plan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setFiltersOpen((current) => !current)}
            className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-indigo-primary transition-colors hover:bg-indigo-lightest"
            aria-label="Abrir filtros"
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
        {filtersOpen && (
          <div className="mt-4 grid gap-4 rounded-lg border border-indigo-light bg-indigo-lightest/60 p-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-indigo-darkest">Estado</label>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-lg border border-indigo-light bg-white px-3 py-2.5 text-sm text-indigo-darkest focus:outline-none focus:ring-2 focus:ring-indigo-primary"
              >
                <option value="all">Todos</option>
                <option value="Al dia">Al dia</option>
                <option value="Deudor">Deudor</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-indigo-darkest">Plan</label>
              <select
                value={planFilter}
                onChange={(event) => setPlanFilter(event.target.value)}
                className="w-full rounded-lg border border-indigo-light bg-white px-3 py-2.5 text-sm text-indigo-darkest focus:outline-none focus:ring-2 focus:ring-indigo-primary"
              >
                <option value="all">Todos</option>
                {planOptions.map((plan) => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Resultados ({filteredAlumnos.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Alumno</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">DNI</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Cuota</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumnos.map((alumno) => (
                <tr key={alumno.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <Link
                        to={`/cobranzas/estado-cuenta/${alumno.id}`}
                        className="font-medium text-gray-900 transition-colors hover:text-blue-700 hover:underline"
                      >
                        {alumno.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{alumno.dni}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{alumno.plan}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">${alumno.monthlyFee}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                        alumno.status === "Al dia"
                          ? "bg-success-light text-success-dark"
                          : "bg-warning-light text-warning-dark"
                      }`}
                    >
                      {alumno.status === "Al dia" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      {alumno.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
