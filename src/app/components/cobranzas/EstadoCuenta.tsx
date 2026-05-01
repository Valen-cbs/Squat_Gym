import { Link, useParams } from "react-router";
import {
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useUser } from "../../context/UserContext";
import { hasPermission } from "../../permissions";

const alumnos = {
  "1": {
    id: "1",
    name: "Juan Perez",
    dni: "12345678",
    email: "juan.perez@email.com",
    phone: "+54 11 1234-5678",
    plan: "Musculacion",
    monthlyFee: 850,
    status: "Al dia",
    debtAmount: 0,
    overdueMonths: 0,
  },
  "6": {
    id: "6",
    name: "Roberto Silva",
    dni: "67890123",
    email: "roberto.silva@email.com",
    phone: "+54 11 3344-6677",
    plan: "Full Access",
    monthlyFee: 850,
    status: "Deudor",
    debtAmount: 1700,
    overdueMonths: 2,
  },
  "7": {
    id: "7",
    name: "Laura Fernandez",
    dni: "78901234",
    email: "laura.fernandez@email.com",
    phone: "+54 11 9988-7766",
    plan: "Musculacion",
    monthlyFee: 850,
    status: "Deudor",
    debtAmount: 850,
    overdueMonths: 1,
  },
  "8": {
    id: "8",
    name: "Diego Lopez",
    dni: "89012345",
    email: "diego.lopez@email.com",
    phone: "+54 11 2211-4433",
    plan: "CrossFit",
    monthlyFee: 850,
    status: "Deudor",
    debtAmount: 2550,
    overdueMonths: 3,
  },
} as const;

export default function EstadoCuenta() {
  const { user } = useUser();
  const { id } = useParams();
  const alumno = alumnos[(id as keyof typeof alumnos) ?? "1"] ?? alumnos["1"];
  const canRegisterPayment = hasPermission(user?.role, "collections.registerPayment");
  const canSendReminder = hasPermission(user?.role, "collections.sendMassDueReminders");

  const paymentHistory = [
    { id: 1, date: "01/04/2026", amount: 850, method: "Efectivo", status: "Pagado", receipt: "REC-001234" },
    { id: 2, date: "01/03/2026", amount: 850, method: "Transferencia", status: "Pagado", receipt: "REC-001198" },
    { id: 3, date: "01/02/2026", amount: 850, method: "QR", status: "Pagado", receipt: "REC-001156" },
    { id: 4, date: "02/01/2026", amount: 850, method: "Tarjeta", status: "Pagado", receipt: "REC-001089" },
    { id: 5, date: "01/12/2025", amount: 850, method: "Pagado", status: "Pagado", receipt: "REC-001034" },
    { id: 6, date: "01/11/2025", amount: 850, method: "Transferencia", status: "Pagado", receipt: "REC-000987" },
  ];

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Estado de cuenta</h1>
        <p className="mt-2 text-gray-500">Informacion detallada del alumno y su historial de pagos.</p>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-light">
              <User className="h-8 w-8 text-indigo-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{alumno.name}</h2>
              <p className="text-gray-500">DNI: {alumno.dni}</p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
              alumno.status === "Al dia"
                ? "bg-success-light text-success-dark"
                : "bg-warning-light text-warning-dark"
            }`}
          >
            {alumno.status === "Al dia" ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            {alumno.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-900">{alumno.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Telefono</p>
              <p className="text-sm font-medium text-gray-900">{alumno.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Plan</p>
              <p className="text-sm font-medium text-gray-900">{alumno.plan}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Cuota mensual</p>
              <p className="text-sm font-bold text-gray-900">${alumno.monthlyFee}</p>
            </div>
          </div>
        </div>

        {alumno.status === "Deudor" && (
          <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4">
            <p className="text-sm font-medium text-orange-700">Deuda pendiente</p>
            <p className="mt-1 text-2xl font-bold text-orange-800">${alumno.debtAmount}</p>
            <p className="mt-1 text-sm text-orange-700">
              {alumno.overdueMonths} {alumno.overdueMonths === 1 ? "mes" : "meses"} de atraso.
            </p>
          </div>
        )}
      </div>

      {(canRegisterPayment || (canSendReminder && alumno.status === "Deudor")) && (
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {canRegisterPayment && (
            <Link
              to={`/cobranzas/registrar-pago/${alumno.id}`}
              className="flex items-center justify-center gap-3 rounded-lg bg-green-600 p-4 text-white transition-colors hover:bg-green-700"
            >
              <CreditCard className="h-5 w-5" />
              <span className="font-medium">Registrar pago</span>
            </Link>
          )}
          {canSendReminder && alumno.status === "Deudor" && (
            <button className="flex items-center justify-center gap-3 rounded-lg bg-blue-600 p-4 text-white transition-colors hover:bg-blue-700">
              <Mail className="h-5 w-5" />
              <span className="font-medium">Enviar recordatorio</span>
            </button>
          )}
        </div>
      )}

      {!canRegisterPayment && !canSendReminder && alumno.status === "Deudor" && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          Vista de consulta: el registro de pagos y los recordatorios quedan asignados a Secretaria o Sistema segun corresponda.
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Historial de pagos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Monto</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Metodo</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Recibo</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{payment.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${payment.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      <CheckCircle className="h-3 w-3" />
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">{payment.receipt}</td>
                  <td className="px-6 py-4">
                    {canRegisterPayment ? (
                      <Link
                        to={`/cobranzas/recibo/${payment.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Ver
                      </Link>
                    ) : (
                      <span className="text-sm text-slate-500">Solo consulta</span>
                    )}
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
