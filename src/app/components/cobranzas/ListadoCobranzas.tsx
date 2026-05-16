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
} from "lucide-react";

export default function ListadoCobranzas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethod, setFilterMethod] = useState("all");
  const [filterMonth, setFilterMonth] = useState("04");

  const cobranzas = [
    { id: 1, date: "21/04/2026", alumno: "Juan Perez", amount: 850, method: "Efectivo", status: "Pagado", receipt: "REC-001234" },
    { id: 2, date: "21/04/2026", alumno: "Maria Gonzalez", amount: 850, method: "Transferencia", status: "Pagado", receipt: "REC-001233" },
    { id: 3, date: "20/04/2026", alumno: "Carlos Rodriguez", amount: 1200, method: "Tarjeta", status: "Pagado", receipt: "REC-001232" },
    { id: 4, date: "20/04/2026", alumno: "Ana Martinez", amount: 850, method: "Efectivo", status: "Pagado", receipt: "REC-001231" },
    { id: 5, date: "19/04/2026", alumno: "Pedro Sanchez", amount: 680, method: "Efectivo", status: "Pagado", receipt: "REC-001230" },
    { id: 6, date: "18/04/2026", alumno: "Laura Gomez", amount: 850, method: "Transferencia", status: "Pagado", receipt: "REC-001229" },
    { id: 7, date: "17/04/2026", alumno: "Diego Fernandez", amount: 1200, method: "Tarjeta", status: "Pagado", receipt: "REC-001228" },
    { id: 8, date: "16/04/2026", alumno: "Sofia Lopez", amount: 850, method: "Tarjeta", status: "Pagado", receipt: "REC-001227" },
    { id: 9, date: "15/04/2026", alumno: "Martin Silva", amount: 850, method: "Efectivo", status: "Pagado", receipt: "REC-001226" },
    { id: 10, date: "14/04/2026", alumno: "Valentina Torres", amount: 1200, method: "Transferencia", status: "Pagado", receipt: "REC-001225" },
    { id: 11, date: "14/04/2026", alumno: "Camila Ruiz", amount: 1200, method: "Transferencia", status: "Pagado", receipt: "REC-001224" },
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
  const methodColors: Record<string, string> = {
    Efectivo: "#41A663",
    Transferencia: "#3C3DCC",
    Tarjeta: "#CC6F20",
  };
  const methodTotals = ["Efectivo", "Transferencia", "Tarjeta"].reduce<Record<string, number>>((totals, method) => {
    totals[method] = filteredCobranzas
      .filter((cobranza) => cobranza.method === method)
      .reduce((sum, cobranza) => sum + cobranza.amount, 0);
    return totals;
  }, {});
  let progress = 0;
  const donutSegments = Object.entries(methodTotals)
    .filter(([, amount]) => amount > 0)
    .map(([method, amount]) => {
      const start = progress;
      const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
      progress += percentage;
      return `${methodColors[method]} ${start}% ${progress}%`;
    });
  const donutBackground = donutSegments.length > 0 ? `conic-gradient(${donutSegments.join(", ")})` : "#D9D9F2";

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

      <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por alumno o recibo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
          <option value="04">Abril 2026</option>
          <option value="03">Marzo 2026</option>
          <option value="02">Febrero 2026</option>
          <option value="01">Enero 2026</option>
        </select>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(22rem,1.15fr)]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-600">Total pagos registrados</p>
              <Receipt className="h-5 w-5 text-indigo-primary/70" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{filteredCobranzas.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-600">Monto total recaudado</p>
              <DollarSign className="h-5 w-5 text-success-dark/80" />
            </div>
            <p className="text-3xl font-bold text-slate-900">${totalAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-bold text-slate-900">Distribucion de ingresos por metodo de pago</p>
              <div className="mt-4 space-y-3">
                {Object.entries(methodTotals).map(([method, amount]) => {
                  const percentage = totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0;
                  return (
                    <div key={method} className="flex items-center justify-between gap-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: methodColors[method] }} />
                        <span>{method}</span>
                      </div>
                      <span className="font-semibold text-slate-900">
                        ${amount.toLocaleString()} · {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="relative mx-auto h-40 w-40 shrink-0 rounded-full sm:mx-0"
              style={{ background: donutBackground }}
              aria-label="Distribucion de ingresos por metodo de pago"
            >
              <div className="absolute inset-6 rounded-full bg-white" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-slate-500">Total</span>
                <span className="text-lg font-bold text-slate-900">${totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
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
                      to={`/cobranzas/recibo/${cobranza.id}`}
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
