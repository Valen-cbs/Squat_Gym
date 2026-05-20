import { useState } from "react";
import { Calendar, Download, DollarSign, FileText, TrendingDown, Users } from "lucide-react";

const currentPeriod = "05-2026";
const periodLabels: Record<string, string> = {
  "05-2026": "Mayo 2026",
  "04-2026": "Abril 2026",
  "03-2026": "Marzo 2026",
  "02-2026": "Febrero 2026",
  "01-2026": "Enero 2026",
};

const collectionsByBranchAndPeriod = [
  { period: "05-2026", month: "Mayo", name: "Sede Norte", received: 98200, pending: 15600, overdue: 6800, payments: 128, debtors: 8 },
  { period: "05-2026", month: "Mayo", name: "Sede Sur", received: 67800, pending: 22100, overdue: 13700, payments: 78, debtors: 15 },
  { period: "04-2026", month: "Abril", name: "Sede Norte", received: 92500, pending: 11200, overdue: 7400, payments: 119, debtors: 9 },
  { period: "04-2026", month: "Abril", name: "Sede Sur", received: 64100, pending: 15300, overdue: 12800, payments: 73, debtors: 14 },
  { period: "03-2026", month: "Marzo", name: "Sede Norte", received: 89500, pending: 10400, overdue: 8200, payments: 116, debtors: 10 },
  { period: "03-2026", month: "Marzo", name: "Sede Sur", received: 61200, pending: 13600, overdue: 12100, payments: 70, debtors: 13 },
  { period: "02-2026", month: "Febrero", name: "Sede Norte", received: 87400, pending: 9800, overdue: 7100, payments: 112, debtors: 8 },
  { period: "02-2026", month: "Febrero", name: "Sede Sur", received: 59800, pending: 11800, overdue: 10600, payments: 68, debtors: 12 },
  { period: "01-2026", month: "Enero", name: "Sede Norte", received: 85200, pending: 9200, overdue: 6500, payments: 109, debtors: 7 },
  { period: "01-2026", month: "Enero", name: "Sede Sur", received: 58100, pending: 10700, overdue: 9800, payments: 65, debtors: 11 },
];

export default function ReportesSedes() {
  const [period, setPeriod] = useState(currentPeriod);
  const isCurrentPeriod = period === currentPeriod;

  const collectionsByBranch = collectionsByBranchAndPeriod
    .filter((branch) => branch.period === period)
    .map((branch) => ({
      ...branch,
      debt: isCurrentPeriod ? branch.overdue : branch.overdue + branch.pending,
    }));

  const totalReceived = collectionsByBranch.reduce((sum, branch) => sum + branch.received, 0);
  const totalPending = collectionsByBranch.reduce((sum, branch) => sum + branch.pending, 0);
  const totalDebt = collectionsByBranch.reduce((sum, branch) => sum + branch.debt, 0);
  const totalDebtors = collectionsByBranch.reduce((sum, branch) => sum + branch.debtors, 0);

  const monthlyComparison = Object.values(
    collectionsByBranchAndPeriod.reduce<Record<string, { period: string; month: string; received: number; pending: number; debt: number }>>(
      (months, branch) => {
        const current = months[branch.period] ?? {
          period: branch.period,
          month: branch.month,
          received: 0,
          pending: 0,
          debt: 0,
        };

        months[branch.period] = {
          ...current,
          received: current.received + branch.received,
          pending: current.pending + branch.pending,
          debt: current.debt + (branch.period === currentPeriod ? branch.overdue : branch.overdue + branch.pending),
        };

        return months;
      },
      {}
    )
  ).reverse();

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Reporte de cobranzas</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="05-2026">Mayo 2026</option>
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

      <div className={`mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 ${isCurrentPeriod ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>
        <div className="app-panel p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Pagos recibidos</p>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-950">${totalReceived.toLocaleString()}</p>
        </div>
        {isCurrentPeriod && (
          <div className="app-panel p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Pendiente</p>
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-950">${totalPending.toLocaleString()}</p>
          </div>
        )}
        <div className="app-panel p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Deuda</p>
            <TrendingDown className="h-5 w-5 text-orange-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-orange-700">${totalDebt.toLocaleString()}</p>
        </div>
        <div className="app-panel p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Alumnos deudores</p>
            <Users className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-950">{totalDebtors}</p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {collectionsByBranch.map((branch) => (
          <div key={branch.name} className="app-panel overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
              <h2 className="text-xl font-bold">{branch.name}</h2>
              <p className="mt-1 text-sm text-white/85">Periodo seleccionado: {periodLabels[period]}</p>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <p className="text-sm text-slate-500">Pagos recibidos</p>
                <p className="text-2xl font-bold text-slate-950">${branch.received.toLocaleString()}</p>
              </div>
              <div className={`grid gap-4 border-t border-slate-200 pt-4 ${isCurrentPeriod ? "grid-cols-2" : "grid-cols-1"}`}>
                {isCurrentPeriod && (
                  <div>
                    <p className="text-sm text-slate-500">Pendiente</p>
                    <p className="text-xl font-bold text-slate-950">${branch.pending.toLocaleString()}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-slate-500">Deuda</p>
                  <p className="text-xl font-bold text-orange-700">${branch.debt.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                <div>
                  <p className="text-sm text-slate-500">Pagos</p>
                  <p className="text-lg font-bold text-slate-950">{branch.payments}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Deudores</p>
                  <p className="text-lg font-bold text-slate-950">{branch.debtors}</p>
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
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-500">Deuda</th>
              </tr>
            </thead>
            <tbody>
              {monthlyComparison.map((row) => (
                <tr key={row.month} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{row.month}</td>
                  <td className="px-6 py-4 text-right text-slate-900">${row.received.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-medium text-orange-700">${row.debt.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 font-bold">
                <td className="px-6 py-4 text-slate-900">Total {period}</td>
                <td className="px-6 py-4 text-right text-slate-900">${totalReceived.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-orange-700">${totalDebt.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
