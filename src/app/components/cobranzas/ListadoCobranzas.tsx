import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Calendar,
  DollarSign,
  Download,
  Eye,
  Receipt,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { cobranzas } from "../../data/cobranzas";

export default function ListadoCobranzas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterMethod, setFilterMethod] = useState("all");
  const [filterMonth, setFilterMonth] = useState("04");
  const monthOptions = [
    { value: "04", label: "Abril 2026" },
    { value: "03", label: "Marzo 2026" },
    { value: "02", label: "Febrero 2026" },
    { value: "01", label: "Enero 2026" },
  ];

  const filteredCobranzas = cobranzas.filter((cobranza) => {
    const matchesSearch =
      cobranza.alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cobranza.receipt.includes(searchTerm);
    const matchesMethod = filterMethod === "all" || cobranza.method === filterMethod;
    const matchesMonth = cobranza.date.split("/")[1] === filterMonth;

    return matchesSearch && matchesMethod && matchesMonth;
  });

  const totalAmount = filteredCobranzas.reduce((sum, cobranza) => sum + cobranza.amount, 0);
  const selectedMonthLabel = monthOptions.find((month) => month.value === filterMonth)?.label ?? "el mes seleccionado";

  return (
    <div className="p-8">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Listado de Cobranzas</h1>
          <p className="mt-2 text-gray-500">Historial completo de pagos recibidos</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-success-medium px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90">
          <Download className="h-4 w-4" />
          Exportar a Excel
        </button>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por alumno o recibo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setFiltersOpen((current) => !current)}
            className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-indigo-primary transition-colors hover:bg-indigo-lightest"
            aria-label="Abrir filtros"
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        {filtersOpen && (
          <div className="mt-4 grid gap-4 rounded-lg border border-indigo-light bg-indigo-lightest/60 p-4 sm:grid-cols-2">
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los metodos</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Tarjeta">Tarjeta</option>
            </select>

            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {monthOptions.map((month) => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-600">Total pagos registrados</p>
            <Receipt className="h-5 w-5 text-indigo-primary/70" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{filteredCobranzas.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-600">Monto total recaudado en {selectedMonthLabel}</p>
            <DollarSign className="h-5 w-5 text-success-dark/80" />
          </div>
          <p className="text-3xl font-bold text-slate-900">${totalAmount.toLocaleString()}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Recibo</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Alumno</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Monto</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Metodo</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {filteredCobranzas.map((cobranza) => (
                <tr key={cobranza.id} className="border-b border-gray-100 transition-colors hover:bg-indigo-lightest/60">
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">{cobranza.receipt}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {cobranza.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{cobranza.alumno}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">${cobranza.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cobranza.method}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/cobranzas/comprobante/${cobranza.id}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-light text-indigo-primary transition-colors hover:bg-indigo-lightest"
                      aria-label={`Ver detalle de ${cobranza.receipt}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-300 bg-slate-50">
                <td className="px-6 py-4 text-sm font-bold text-slate-900" colSpan={3}>Totales</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">${totalAmount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{filteredCobranzas.length} pagos</td>
                <td className="px-6 py-4 text-right">
                  <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
