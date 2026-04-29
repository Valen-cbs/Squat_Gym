import { Link } from "react-router";
import {
  DollarSign,
  Users,
  AlertCircle,
  Search,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function DashboardCobranzas() {
  const stats = [
    { label: "Cobranzas del mes", value: "$125,400", icon: DollarSign, color: "from-emerald-500 to-green-500" },
    { label: "Alumnos al dia", value: "142", icon: Users, color: "from-sky-500 to-blue-500" },
    { label: "Pendientes de pago", value: "23", icon: AlertCircle, color: "from-amber-500 to-orange-500" },
  ];

  const recentPayments = [
    { id: 1, name: "Juan Perez", amount: 850, method: "Efectivo", date: "21/04/2026" },
    { id: 2, name: "Maria Gonzalez", amount: 850, method: "Transferencia", date: "21/04/2026" },
    { id: 3, name: "Carlos Rodriguez", amount: 1200, method: "Tarjeta", date: "20/04/2026" },
    { id: 4, name: "Ana Martinez", amount: 850, method: "QR", date: "20/04/2026" },
    { id: 5, name: "Pedro Sanchez", amount: 680, method: "Efectivo", date: "19/04/2026" },
  ];

  const debtors = [
    { id: 6, name: "Roberto Silva", debt: 1700, months: 2 },
    { id: 7, name: "Laura Fernandez", debt: 850, months: 1 },
    { id: 8, name: "Diego Lopez", debt: 2550, months: 3 },
  ];

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Panel de cobranzas</h1>
          <p className="app-page-copy">Seguimiento de pagos, cuentas corrientes y alumnos con deuda desde una vista mas compacta para mobile.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          to="/cobranzas/buscar-alumno"
          className="rounded-[24px] bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white shadow-lg"
        >
          <Search className="h-8 w-8" />
          <p className="mt-4 text-xl font-bold">Buscar alumno</p>
          <p className="mt-1 text-sm text-blue-50">Consultar estado de cuenta y pagos pendientes.</p>
        </Link>

        <Link
          to="/cobranzas/listado"
          className="rounded-[24px] bg-gradient-to-br from-violet-600 to-fuchsia-500 p-5 text-white shadow-lg"
        >
          <FileText className="h-8 w-8" />
          <p className="mt-4 text-xl font-bold">Listado de cobranzas</p>
          <p className="mt-1 text-sm text-violet-50">Visualiza los registros de cobros del periodo.</p>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="app-panel overflow-hidden">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-xl font-bold text-slate-900">Ultimos pagos recibidos</h2>
          </div>
          <div className="app-table-scroll px-5 py-4 sm:px-6">
            <table className="app-table w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 text-left text-sm font-medium text-slate-500">Alumno</th>
                  <th className="py-3 text-left text-sm font-medium text-slate-500">Monto</th>
                  <th className="py-3 text-left text-sm font-medium text-slate-500">Metodo</th>
                  <th className="py-3 text-left text-sm font-medium text-slate-500">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-slate-100">
                    <td className="py-3 text-sm text-slate-900">{payment.name}</td>
                    <td className="py-3 text-sm font-medium text-slate-900">${payment.amount}</td>
                    <td className="py-3 text-sm text-slate-600">{payment.method}</td>
                    <td className="py-3 text-sm text-slate-600">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="app-panel">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <h2 className="text-xl font-bold text-slate-900">Alumnos con deuda</h2>
            </div>
          </div>
          <div className="space-y-3 px-5 py-5 sm:px-6">
            {debtors.map((debtor) => (
              <div key={debtor.id} className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{debtor.name}</p>
                    <p className="text-sm text-slate-600">
                      {debtor.months} {debtor.months === 1 ? "mes" : "meses"} de atraso
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <p className="font-bold text-amber-700">${debtor.debt}</p>
                    <Link
                      to={`/cobranzas/estado-cuenta/${debtor.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"
                    >
                      Ver detalle
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
