import { Link } from "react-router";
import {
  DollarSign,
  AlertCircle,
  Search,
  FileText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { getAlumnosDeudores } from "../../data/alumnos";

export default function DashboardCobranzas() {
  const pendingPayments = getAlumnosDeudores().length;
  const stats = [
    {
      label: "Cobranzas del mes",
      value: "$125,400",
      icon: DollarSign,
      tone: "border-indigo-light bg-indigo-lightest text-indigo-dark",
    },
    {
      label: "Alumnos al dia",
      value: "142",
      icon: CheckCircle2,
      tone: "border-success-medium bg-success-light text-success-dark",
    },
    {
      label: "Pendientes de pago",
      value: String(pendingPayments),
      icon: AlertCircle,
      tone: "border-warning-medium bg-warning-light text-warning-dark",
    },
  ];

  const recentPayments = [
    { id: 1, name: "Juan Perez", amount: 850, method: "Efectivo", date: "21/04/2026" },
    { id: 2, name: "Maria Gonzalez", amount: 850, method: "Transferencia", date: "21/04/2026" },
    { id: 3, name: "Carlos Rodriguez", amount: 1200, method: "Tarjeta", date: "20/04/2026" },
    { id: 4, name: "Ana Martinez", amount: 850, method: "QR", date: "20/04/2026" },
    { id: 5, name: "Pedro Sanchez", amount: 680, method: "Efectivo", date: "19/04/2026" },
  ];

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Panel de cobranzas</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat, index) => (
          <div key={index} className="app-panel p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-indigo-dark">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold text-indigo-darkest">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${stat.tone}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          to="/cobranzas/buscar-alumno"
          className="app-action-card group"
        >
          <div className="app-action-content">
            <div className="app-action-icon">
              <Search className="h-6 w-6" />
            </div>
            <span className="app-action-label">Buscar alumno</span>
          </div>
          <ArrowRight className="app-action-arrow" />
        </Link>

        <Link
          to="/cobranzas/listado"
          className="app-action-card group"
        >
          <div className="app-action-content">
            <div className="app-action-icon">
              <FileText className="h-6 w-6" />
            </div>
            <span className="app-action-label">Listado de cobranzas</span>
          </div>
          <ArrowRight className="app-action-arrow" />
        </Link>
      </div>

      <div className="mt-6">
        <div className="app-panel overflow-hidden">
          <div className="border-b border-indigo-light px-5 py-4 sm:px-6">
            <h2 className="text-xl font-bold text-indigo-darkest">Ultimos pagos recibidos</h2>
          </div>
          <div className="hidden px-4 py-4 lg:block lg:px-6">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-indigo-light">
                  <th className="w-[34%] py-3 pr-3 text-left text-sm font-medium text-indigo-dark">Alumno</th>
                  <th className="w-[18%] py-3 px-2 text-left text-sm font-medium text-indigo-dark">Monto</th>
                  <th className="w-[24%] py-3 px-2 text-left text-sm font-medium text-indigo-dark">Metodo</th>
                  <th className="w-[24%] py-3 pl-2 text-right text-sm font-medium text-indigo-dark">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-indigo-light odd:bg-indigo-lightest/60">
                    <td className="py-3 pr-3 text-sm text-indigo-darkest">{payment.name}</td>
                    <td className="py-3 px-2 text-sm font-medium text-success-dark">${payment.amount}</td>
                    <td className="py-3 px-2 text-sm text-indigo-dark">{payment.method}</td>
                    <td className="py-3 pl-2 text-right text-sm text-indigo-dark">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 px-5 py-4 lg:hidden">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="rounded-xl border border-indigo-light bg-indigo-lightest/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-indigo-darkest">{payment.name}</p>
                    <p className="mt-1 text-sm text-indigo-dark">{payment.method}</p>
                  </div>
                  <p className="font-bold text-success-dark">${payment.amount}</p>
                </div>
                <p className="mt-3 text-sm text-indigo-dark">{payment.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
