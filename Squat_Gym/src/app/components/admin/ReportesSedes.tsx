import { useState } from "react";
import { Calendar, Download, DollarSign, FileText, TrendingDown, TrendingUp, Users } from "lucide-react";

export default function ReportesSedes() {
  const [period, setPeriod] = useState("04-2026");

  const collectionsByBranch = [
    {
      name: "Sede Central",
      received: 125400,
      pending: 18400,
      overdue: 9200,
      payments: 142,
      debtors: 11,
      rate: 87,
      trend: "up",
    },
    {
      name: "Sede Norte",
      received: 98200,
      pending: 15600,
      overdue: 6800,
      payments: 128,
      debtors: 8,
      rate: 86,
      trend: "up",
    },
    {
      name: "Sede Sur",
      received: 67800,
      pending: 22100,
      overdue: 13700,
      payments: 78,
      debtors: 15,
      rate: 75,
      trend: "down",
    },
  ];

  const totalReceived = collectionsByBranch.reduce((sum, branch) => sum + branch.received, 0);
  const totalPending = collectionsByBranch.reduce((sum, branch) => sum + branch.pending, 0);
  const totalOverdue = collectionsByBranch.reduce((sum, branch) => sum + branch.overdue, 0);
  const totalPayments = collectionsByBranch.reduce((sum, branch) => sum + branch.payments, 0);
  const totalDebtors = collectionsByBranch.reduce((sum, branch) => sum + branch.debtors, 0);
  const collectionRate = Math.round((totalReceived / (totalReceived + totalPending)) * 100);

  const monthlyComparison = [
    { month: "Enero", received: 282000, pending: 44300, overdue: 18100 },
    { month: "Febrero", received: 286800, pending: 41800, overdue: 19600 },
    { month: "Marzo", received: 289500, pending: 46000, overdue: 23800 },
    { month: "Abril", received: totalReceived, pending: totalPending, overdue: totalOverdue },
  ];

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Reporte de cobranzas</h1>
          <p className="app-page-copy">Pagos recibidos, pendientes y deudas consolidadas por sede y periodo.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="04-2026">Abril 2026</option>
            <option value="03-2026">Marzo 2026</option>
            <option value="02-2026">Febrero 2026</option>
            <option value="01-2026">Enero 2026</option>
          </select>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
            <Download className="h-4 w-4" />
            Exportar reporte
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="app-panel p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Pagos recibidos</p>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-950">${totalReceived.toLocaleString()}</p>
        </div>
        <div className="app-panel p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Pendiente</p>
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-950">${totalPending.toLocaleString()}</p>
        </div>
        <div className="app-panel p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Deuda vencida</p>
            <TrendingDown className="h-5 w-5 text-orange-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-orange-700">${totalOverdue.toLocaleString()}</p>
        </div>
        <div className="app-panel p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Alumnos deudores</p>
            <Users className="h-5 w-5 text-red-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-950">{totalDebtors}</p>
        </div>
        <div className="app-panel p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Tasa de cobro</p>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-950">{collectionRate}%</p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {collectionsByBranch.map((branch) => (
          <div key={branch.name} className="app-panel overflow-hidden">
            <div
              className={`p-5 text-white ${
                branch.trend === "up"
                  ? "bg-gradient-to-r from-green-600 to-emerald-500"
                  : "bg-gradient-to-r from-orange-600 to-red-500"
              }`}
            >
              <h2 className="text-xl font-bold">{branch.name}</h2>
              <p className="mt-1 text-sm text-white/85">Periodo seleccionado: {period}</p>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <p className="text-sm text-slate-500">Pagos recibidos</p>
                <p className="text-2xl font-bold text-slate-950">${branch.received.toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                <div>
                  <p className="text-sm text-slate-500">Pendiente</p>
                  <p className="text-xl font-bold text-slate-950">${branch.pending.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Vencido</p>
                  <p className="text-xl font-bold text-orange-700">${branch.overdue.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-4">
                <div>
                  <p className="text-sm text-slate-500">Pagos</p>
                  <p className="text-lg font-bold text-slate-950">{branch.payments}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Deudores</p>
                  <p className="text-lg font-bold text-slate-950">{branch.debtors}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Cobro</p>
                  <p className="text-lg font-bold text-slate-950">{branch.rate}%</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="app-panel overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Evolucion mensual consolidada</h2>
          </div>
        </div>
        <div className="app-table-scroll">
          <table className="app-table w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Mes</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-500">Pagos recibidos</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-500">Pendiente</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-500">Deuda vencida</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-500">Tasa de cobro</th>
              </tr>
            </thead>
            <tbody>
              {monthlyComparison.map((row) => (
                <tr key={row.month} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{row.month}</td>
                  <td className="px-6 py-4 text-right text-slate-900">${row.received.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-slate-900">${row.pending.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-medium text-orange-700">${row.overdue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-950">
                    {Math.round((row.received / (row.received + row.pending)) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 font-bold">
                <td className="px-6 py-4 text-slate-900">Total {period}</td>
                <td className="px-6 py-4 text-right text-slate-900">${totalReceived.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-slate-900">${totalPending.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-orange-700">${totalOverdue.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-blue-700">{collectionRate}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:px-6">
          Pagos procesados en el periodo: {totalPayments}. El reporte consolida pagos recibidos, pendientes y deuda vencida por sede.
        </div>
      </div>
    </div>
  );
}
