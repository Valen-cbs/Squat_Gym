import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  BarChart3,
  BoxIcon,
  CalendarDays,
  DollarSign,
  Package,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";
import { useUser } from "../../context/UserContext";
import { hasPermission } from "../../permissions";
import { kioskProducts } from "../../data/catalog";

const branches = ["Sede Norte", "Sede Sur"];
const shifts = ["Manana", "Tarde", "Noche"];

const salesReportData = [
  { id: 101, branch: "Sede Norte", date: "2026-04-21", shift: "Manana", sales: 18, amount: 1560 },
  { id: 102, branch: "Sede Norte", date: "2026-04-21", shift: "Tarde", sales: 24, amount: 2690 },
  { id: 103, branch: "Sede Norte", date: "2026-04-21", shift: "Noche", sales: 15, amount: 1840 },
  { id: 104, branch: "Sede Norte", date: "2026-04-20", shift: "Manana", sales: 14, amount: 1320 },
  { id: 105, branch: "Sede Norte", date: "2026-04-20", shift: "Tarde", sales: 22, amount: 2410 },
  { id: 106, branch: "Sede Norte", date: "2026-04-20", shift: "Noche", sales: 12, amount: 1430 },
  { id: 107, branch: "Sede Norte", date: "2026-04-19", shift: "Manana", sales: 16, amount: 1480 },
  { id: 108, branch: "Sede Norte", date: "2026-04-19", shift: "Tarde", sales: 19, amount: 2160 },
  { id: 109, branch: "Sede Norte", date: "2026-04-19", shift: "Noche", sales: 11, amount: 1180 },
  { id: 201, branch: "Sede Norte", date: "2026-04-21", shift: "Manana", sales: 12, amount: 1260 },
  { id: 202, branch: "Sede Norte", date: "2026-04-21", shift: "Tarde", sales: 20, amount: 2240 },
  { id: 203, branch: "Sede Norte", date: "2026-04-21", shift: "Noche", sales: 13, amount: 1510 },
  { id: 204, branch: "Sede Norte", date: "2026-04-20", shift: "Manana", sales: 10, amount: 980 },
  { id: 205, branch: "Sede Norte", date: "2026-04-20", shift: "Tarde", sales: 18, amount: 1970 },
  { id: 206, branch: "Sede Norte", date: "2026-04-20", shift: "Noche", sales: 9, amount: 1040 },
  { id: 301, branch: "Sede Sur", date: "2026-04-21", shift: "Manana", sales: 9, amount: 870 },
  { id: 302, branch: "Sede Sur", date: "2026-04-21", shift: "Tarde", sales: 15, amount: 1680 },
  { id: 303, branch: "Sede Sur", date: "2026-04-21", shift: "Noche", sales: 8, amount: 920 },
  { id: 304, branch: "Sede Sur", date: "2026-04-20", shift: "Manana", sales: 7, amount: 740 },
  { id: 305, branch: "Sede Sur", date: "2026-04-20", shift: "Tarde", sales: 13, amount: 1420 },
  { id: 306, branch: "Sede Sur", date: "2026-04-20", shift: "Noche", sales: 6, amount: 760 },
];

type ReportMode = "shift" | "day";

function formatCurrency(value: number) {
  return `$${value.toLocaleString("es-AR")}`;
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("es-AR");
}

export default function KioscoPrincipal() {
  const { user } = useUser();
  const canRegisterSale = hasPermission(user?.role, "kiosk.registerSale");
  const canViewStock = hasPermission(user?.role, "kiosk.viewStock");
  const canCreateRestockOrder = hasPermission(user?.role, "kiosk.createRestockOrder");
  const canViewDailySales = hasPermission(user?.role, "kiosk.viewDailySales");
  const lowStockProducts = kioskProducts.filter((product) => product.status !== "ok");
  const [reportMode, setReportMode] = useState<ReportMode>("shift");
  const [selectedBranch, setSelectedBranch] = useState("Sede Norte");
  const [reportDate, setReportDate] = useState("2026-04-21");
  const [dateFrom, setDateFrom] = useState("2026-04-19");
  const [dateTo, setDateTo] = useState("2026-04-21");

  const branchForReport = user?.role === "admin" ? selectedBranch : "Sede Norte";

  const stats = [
    ...(canViewDailySales
      ? [
          { label: "Ventas del dia", value: formatCurrency(6090), icon: DollarSign, color: "from-emerald-500 to-green-500" },
          { label: "Productos vendidos", value: "57", icon: ShoppingCart, color: "from-sky-500 to-blue-500" },
        ]
      : []),
    ...(canViewStock
      ? [
          { label: "Stock critico", value: String(lowStockProducts.length), icon: AlertTriangle, color: "from-amber-500 to-orange-500" },
          { label: "Productos disponibles", value: String(kioskProducts.length), icon: Package, color: "from-violet-500 to-purple-500" },
        ]
      : []),
  ];

  const actionCards = [
    ...(canRegisterSale
      ? [
          {
            to: "/kiosco/nueva-venta",
            title: "Nueva venta",
            description: "Registrar productos vendidos y emitir ticket.",
            icon: ShoppingCart,
            color: "from-blue-600 to-cyan-500",
          },
        ]
      : []),
  ];

  const shiftRows = useMemo(() => {
    const records = salesReportData.filter((sale) => sale.branch === branchForReport && sale.date === reportDate);

    return shifts.map((shift) => {
      const shiftRecords = records.filter((sale) => sale.shift === shift);
      return {
        shift,
        sales: shiftRecords.reduce((total, sale) => total + sale.sales, 0),
        amount: shiftRecords.reduce((total, sale) => total + sale.amount, 0),
      };
    });
  }, [branchForReport, reportDate]);

  const dayRows = useMemo(() => {
    const totalsByDate = salesReportData
      .filter((sale) => sale.branch === branchForReport && sale.date >= dateFrom && sale.date <= dateTo)
      .reduce<Record<string, { sales: number; amount: number }>>((totals, sale) => {
        const current = totals[sale.date] ?? { sales: 0, amount: 0 };
        totals[sale.date] = {
          sales: current.sales + sale.sales,
          amount: current.amount + sale.amount,
        };
        return totals;
      }, {});

    return Object.entries(totalsByDate)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, totals]) => ({ date, ...totals }));
  }, [branchForReport, dateFrom, dateTo]);

  const reportRows = reportMode === "shift" ? shiftRows : dayRows;
  const reportTotals = reportRows.reduce(
    (totals, row) => ({
      sales: totals.sales + row.sales,
      amount: totals.amount + row.amount,
    }),
    { sales: 0, amount: 0 }
  );

  const lowStock = lowStockProducts.map((product) => ({
    id: product.id,
    name: product.name,
    stock: product.stock,
    min: product.minStock,
    status: product.status,
  }));

  const actionGridClass =
    actionCards.length === 1
      ? "mx-auto max-w-xl grid-cols-1"
      : actionCards.length === 2
        ? "mx-auto max-w-5xl grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Kiosco principal</h1>
          <p className="app-page-copy">Accesos ajustados al rol activo para ventas, inventario y control diario.</p>
        </div>
      </div>

      {stats.length > 0 && (
        <div className="app-stat-grid">
          {stats.map((stat, index) => (
            <div key={index} className="app-panel p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {actionCards.length > 0 && (
        <div className={`mt-6 grid gap-4 ${actionGridClass}`}>
          {actionCards.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className={`min-h-36 rounded-[24px] bg-gradient-to-br ${action.color} p-5 text-white shadow-lg`}
            >
              <action.icon className="h-8 w-8" />
              <p className="mt-4 text-xl font-bold">{action.title}</p>
              <p className="mt-1 text-sm text-white/85">{action.description}</p>
            </Link>
          ))}
        </div>
      )}

      {canViewDailySales && (
        <div className="mt-6 app-panel overflow-hidden">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900">Reporte de ventas diarias</h2>
            </div>
          </div>

          <div className="space-y-5 px-5 py-5 sm:px-6">
            <div className="grid gap-4 lg:grid-cols-4">
              {user?.role === "admin" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Sede</label>
                  <select
                    value={selectedBranch}
                    onChange={(event) => setSelectedBranch(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Vista</label>
                <div className="grid grid-cols-2 rounded-lg border border-slate-300 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setReportMode("shift")}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${reportMode === "shift" ? "bg-slate-900 text-white" : "text-slate-600"}`}
                  >
                    Por turno
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportMode("day")}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${reportMode === "day" ? "bg-slate-900 text-white" : "text-slate-600"}`}
                  >
                    Por dia
                  </button>
                </div>
              </div>

              {reportMode === "shift" ? (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Fecha</label>
                  <input
                    type="date"
                    value={reportDate}
                    onChange={(event) => setReportDate(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Desde</label>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(event) => setDateFrom(event.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Hasta</label>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(event) => setDateTo(event.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <CalendarDays className="mr-2 inline h-4 w-4 text-slate-500" />
              {branchForReport} | {reportMode === "shift"
                ? `Reporte del ${formatDate(reportDate)} discriminado por turno`
                : `Reporte del ${formatDate(dateFrom)} al ${formatDate(dateTo)} discriminado por dia`}
            </div>

            <div className="flex justify-end">
              <Link
                to="/kiosco/detalle-ventas"
                state={{
                  branch: branchForReport,
                  reportMode,
                  reportDate,
                  dateFrom,
                  dateTo,
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              >
                Ver detalle de ventas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="app-table-scroll">
              <table className="app-table w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 text-left text-sm font-medium text-slate-500">
                      {reportMode === "shift" ? "Turno" : "Dia"}
                    </th>
                    <th className="py-3 text-right text-sm font-medium text-slate-500">Ventas</th>
                    <th className="py-3 text-right text-sm font-medium text-slate-500">Total parcial</th>
                  </tr>
                </thead>
                <tbody>
                  {reportRows.map((row) => (
                    <tr key={"shift" in row ? row.shift : row.date} className="border-b border-slate-100">
                      <td className="py-3 text-sm font-medium text-slate-900">
                        {"shift" in row ? `Turno ${row.shift}` : formatDate(row.date)}
                      </td>
                      <td className="py-3 text-right text-sm text-slate-600">{row.sales}</td>
                      <td className="py-3 text-right text-sm font-semibold text-slate-900">{formatCurrency(row.amount)}</td>
                    </tr>
                  ))}
                  {reportRows.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-sm text-slate-500">
                        No hay ventas registradas para los filtros seleccionados.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t border-slate-300 bg-slate-50">
                    <td className="py-3 text-sm font-bold text-slate-950">Total general</td>
                    <td className="py-3 text-right text-sm font-bold text-slate-950">{reportTotals.sales}</td>
                    <td className="py-3 text-right text-sm font-bold text-slate-950">{formatCurrency(reportTotals.amount)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
