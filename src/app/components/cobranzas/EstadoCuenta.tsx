import { Link, useParams } from "react-router";
import {
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from "lucide-react";

export default function EstadoCuenta() {
  const { id } = useParams();

  const alumno = {
    id: id,
    name: "Juan Pérez",
    dni: "12345678",
    email: "juan.perez@email.com",
    phone: "+54 11 1234-5678",
    plan: "Musculación",
    monthlyFee: 850,
    startDate: "15/01/2024",
    status: "Al día"
  };

  const paymentHistory = [
    { id: 1, date: "01/04/2026", amount: 850, method: "Efectivo", status: "Pagado", receipt: "REC-001234" },
    { id: 2, date: "01/03/2026", amount: 850, method: "Transferencia", status: "Pagado", receipt: "REC-001198" },
    { id: 3, date: "01/02/2026", amount: 850, method: "QR", status: "Pagado", receipt: "REC-001156" },
    { id: 4, date: "02/01/2026", amount: 850, method: "Tarjeta", status: "Pagado", receipt: "REC-001089" },
    { id: 5, date: "01/12/2025", amount: 850, method: "Efectivo", status: "Pagado", receipt: "REC-001034" },
    { id: 6, date: "01/11/2025", amount: 850, method: "Transferencia", status: "Pagado", receipt: "REC-000987" },
  ];

  return (
    <div className="p-8">
      <Link
        to="/cobranzas/buscar-alumno"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a búsqueda
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Estado de Cuenta</h1>
        <p className="text-gray-500 mt-2">Información detallada del alumno y su historial de pagos</p>
      </div>

      {/* Alumno Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{alumno.name}</h2>
              <p className="text-gray-500">DNI: {alumno.dni}</p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            alumno.status === "Al día"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}>
            {alumno.status === "Al día" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {alumno.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-900">{alumno.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-sm font-medium text-gray-900">{alumno.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Plan</p>
              <p className="text-sm font-medium text-gray-900">{alumno.plan}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Cuota mensual</p>
              <p className="text-sm font-bold text-gray-900">${alumno.monthlyFee}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Link
          to={`/cobranzas/registrar-pago/${id}`}
          className="bg-green-600 text-white rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-green-700 transition-colors"
        >
          <CreditCard className="w-5 h-5" />
          <span className="font-medium">Registrar Pago</span>
        </Link>
        <button className="bg-blue-600 text-white rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors">
          <Mail className="w-5 h-5" />
          <span className="font-medium">Enviar Recordatorio</span>
        </button>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Historial de Pagos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Fecha</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Monto</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Método</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Recibo</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Acción</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{payment.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${payment.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3" />
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{payment.receipt}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/cobranzas/recibo/${payment.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                    >
                      Ver recibo
                    </Link>
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
