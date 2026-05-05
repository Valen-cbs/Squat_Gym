import { useState } from "react";
import { Calendar, Download, DollarSign, FileText, TrendingDown, TrendingUp, Users } from "lucide-react";

export default function ReportesSedes() {
  const [selectedBranch, setSelectedBranch] = useState("Sede Norte");
  const [startMonth, setStartMonth] = useState("02");
  const [startYear, setStartYear] = useState("2026");
  const [endMonth, setEndMonth] = useState("04");
  const [endYear, setEndYear] = useState("2026");

  const months = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  const years = ["2024", "2025", "2026", "2027"];

  const branches = ["Sede Norte", "Sede Sur"];

  const collectionsByBranch = [
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

  const selectedBranchData = collectionsByBranch.find((branch) => branch.name === selectedBranch);

  // Todos los datos mensuales disponibles
  const allMonthlyData = [
    { monthNum: "01", month: "Enero", year: "2026", received: 82000, pending: 14300, overdue: 8100, payments: 42, debtors: 3 },
    { monthNum: "02", month: "Febrero", year: "2026", received: 86800, pending: 11800, overdue: 9600, payments: 44, debtors: 2 },
    { monthNum: "03", month: "Marzo", year: "2026", received: 89500, pending: 16000, overdue: 13800, payments: 48, debtors: 4 },
    { monthNum: "04", month: "Abril", year: "2026", received: selectedBranchData?.received || 98200, pending: selectedBranchData?.pending || 15600, overdue: selectedBranchData?.overdue || 6800, payments: selectedBranchData?.payments || 128, debtors: selectedBranchData?.debtors || 8 },
  ];

  // Filtrar datos basándose en el rango de fechas seleccionado
  const getFilteredData = () => {
    const startDateNum = parseInt(`${startYear}${startMonth}`);
    const endDateNum = parseInt(`${endYear}${endMonth}`);
    
    return allMonthlyData.filter((data) => {
      const dataDateNum = parseInt(`${data.year}${data.monthNum}`);
      return dataDateNum >= startDateNum && dataDateNum <= endDateNum;
    });
  };

  const monthlyComparison = getFilteredData();

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Reporte de cobranzas</h1>
          <p className="app-page-copy">Pagos recibidos, pendientes y deudas consolidadas por sede y periodo.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
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

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="app-panel p-5">
          <label className="block text-sm font-medium text-slate-700 mb-2">Sede</label>
          <select
            value={selectedBranch}
            onChange={(event) => setSelectedBranch(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        <div className="app-panel p-5">
          <label className="block text-sm font-medium text-slate-700 mb-2">Mes inicio</label>
          <div className="flex gap-2">
            <select
              value={startMonth}
              onChange={(event) => setStartMonth(event.target.value)}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <select
              value={startYear}
              onChange={(event) => setStartYear(event.target.value)}
              className="w-24 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="app-panel p-5">
          <label className="block text-sm font-medium text-slate-700 mb-2">Mes final</label>
          <div className="flex gap-2">
            <select
              value={endMonth}
              onChange={(event) => setEndMonth(event.target.value)}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <select
              value={endYear}
              onChange={(event) => setEndYear(event.target.value)}
              className="w-24 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="app-panel overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Evolución mensual consolidada - {selectedBranch}</h2>
          </div>
        </div>
        <div className="app-table-scroll">
          <table className="app-table w-full min-w-0" style={{ tableLayout: "fixed", whiteSpace: "normal" }}>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-4 text-left text-sm font-medium text-slate-500">Mes</th>
                <th className="px-4 py-4 text-right text-sm font-medium text-slate-500">Pagos recibidos</th>
                <th className="px-4 py-4 text-right text-sm font-medium text-slate-500">Pendiente</th>
                <th className="px-4 py-4 text-right text-sm font-medium text-slate-500">Deuda vencida</th>
                <th className="px-4 py-4 text-right text-sm font-medium text-slate-500">Cantidad de pagos</th>
                <th className="px-4 py-4 text-right text-sm font-medium text-slate-500">Deudores</th>
                <th className="px-4 py-4 text-right text-sm font-medium text-slate-500">Tasa de cobro</th>
              </tr>
            </thead>
            <tbody>
              {monthlyComparison.map((row) => (
                <tr key={`${row.month}-${row.year}`} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-900">{row.month} {row.year}</td>
                  <td className="px-4 py-4 text-right text-slate-900">${row.received.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right text-slate-900">${row.pending.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right font-medium text-orange-700">${row.overdue.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right text-slate-900">{row.payments}</td>
                  <td className="px-4 py-4 text-right text-slate-900">{row.debtors}</td>
                  <td className="px-4 py-4 text-right font-bold text-slate-950">
                    {Math.round((row.received / (row.received + row.pending)) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 font-bold">
                <td className="px-4 py-4 text-slate-900">Total del periodo</td>
                <td className="px-4 py-4 text-right text-slate-900">${monthlyComparison.reduce((sum, row) => sum + row.received, 0).toLocaleString()}</td>
                <td className="px-4 py-4 text-right text-slate-900">${monthlyComparison.reduce((sum, row) => sum + row.pending, 0).toLocaleString()}</td>
                <td className="px-4 py-4 text-right text-orange-700">${monthlyComparison.reduce((sum, row) => sum + row.overdue, 0).toLocaleString()}</td>
                <td className="px-4 py-4 text-right text-slate-900">{monthlyComparison.reduce((sum, row) => sum + row.payments, 0)}</td>
                <td className="px-4 py-4 text-right text-slate-900">{monthlyComparison.reduce((sum, row) => sum + row.debtors, 0)}</td>
                <td className="px-4 py-4 text-right text-blue-700">
                  {Math.round((monthlyComparison.reduce((sum, row) => sum + row.received, 0) / (monthlyComparison.reduce((sum, row) => sum + row.received, 0) + monthlyComparison.reduce((sum, row) => sum + row.pending, 0))) * 100)}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:px-6">
          Reporte consolidado para {selectedBranch} del {months.find((m) => m.value === startMonth)?.label} {startYear} al {months.find((m) => m.value === endMonth)?.label} {endYear}.
        </div>
      </div>
    </div>
  );
}
