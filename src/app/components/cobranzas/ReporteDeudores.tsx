import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  FileText,
  Phone,
  Search,
  User,
} from "lucide-react";
import { getAlumnosDeudores } from "../../data/alumnos";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

const addMonths = (dateValue: string, months: number) => {
  const [day, month, year] = dateValue.split("/").map(Number);
  const date = new Date(year, month - 1 + months, day);
  return formatDate(date);
};

export default function ReporteDeudores() {
  const alumnos = getAlumnosDeudores();
  const [searchTerm, setSearchTerm] = useState("");
  const issueDate = formatDate(new Date());

  const reportRows = useMemo(
    () =>
      alumnos
        .map((alumno) => ({
          ...alumno,
          dueDate: addMonths(alumno.lastPayment, 1),
        }))
        .filter((alumno) => {
          const normalizedSearch = searchTerm.trim().toLowerCase();
          const matchesSearch =
            normalizedSearch.length === 0 ||
            alumno.name.toLowerCase().includes(normalizedSearch) ||
            alumno.dni.includes(normalizedSearch) ||
            alumno.phone.includes(normalizedSearch);

          return matchesSearch;
        }),
    [alumnos, searchTerm],
  );

  const totalDebt = reportRows.reduce((sum, alumno) => sum + alumno.debtAmount, 0);

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Reporte de alumnos deudores</h1>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          disabled={reportRows.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-success-medium px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <FileText className="h-4 w-4" />
          Exportar PDF
        </button>
      </div>

      <div className="mb-6 app-panel p-5 sm:p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, DNI o telefono..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="app-panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Listado de alumnos morosos</h2>
          </div>
          <span className="inline-flex w-fit rounded-full bg-indigo-lightest px-3 py-1 text-sm font-semibold text-indigo-primary">
            {reportRows.length} resultados
          </span>
        </div>

        <div className="app-table-scroll">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Alumno</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">DNI</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Fecha vencimiento</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Monto</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Telefono</th>
              </tr>
            </thead>
            <tbody>
              {reportRows.map((alumno) => (
                <tr key={alumno.id} className="border-b border-slate-100 transition-colors hover:bg-indigo-lightest/60">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning-light text-warning-dark">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <Link
                          to={`/cobranzas/estado-cuenta/${alumno.id}`}
                          className="font-medium text-slate-950 transition-colors hover:text-indigo-primary hover:underline"
                        >
                          {alumno.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-slate-500">Ultimo pago: {alumno.lastPayment}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{alumno.dni}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{alumno.plan}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{alumno.dueDate}</td>
                  <td className="px-6 py-4 text-sm font-bold text-error-dark">{formatCurrency(alumno.debtAmount)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      {alumno.phone}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {reportRows.length > 0 && (
              <tfoot>
                <tr className="border-t border-slate-300 bg-slate-50">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900" colSpan={4}>
                    Total del reporte
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-error-dark">{formatCurrency(totalDebt)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    Emitido el {issueDate}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {reportRows.length === 0 && (
          <div className="px-5 py-10 text-center sm:px-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-lightest text-indigo-primary">
              <Search className="h-5 w-5" />
            </div>
            <p className="mt-4 font-semibold text-slate-950">No hay alumnos para esos filtros</p>
            <p className="mt-1 text-sm text-slate-500">Proba con otra busqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
