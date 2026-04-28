import { Link, useParams } from "react-router";
import { CheckCircle, Download, Printer, Send, ArrowLeft } from "lucide-react";

export default function ReciboGenerado() {
  const { id } = useParams();

  const receipt = {
    id: id,
    number: "REC-001234",
    date: new Date().toLocaleDateString('es-AR'),
    time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    alumno: {
      name: "Juan Pérez",
      dni: "12345678",
      plan: "Musculación"
    },
    payment: {
      amount: 850,
      method: "Efectivo",
      discount: 0,
      total: 850
    },
    attendedBy: "Secretaría - Recepción"
  };

  return (
    <div className="p-8">
      <Link
        to="/cobranzas"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al dashboard
      </Link>

      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-green-900">¡Pago Registrado Exitosamente!</h2>
          <p className="text-green-700">El recibo ha sido generado y está listo para imprimir o enviar</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button className="bg-blue-600 text-white rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors">
          <Printer className="w-5 h-5" />
          <span className="font-medium">Imprimir Recibo</span>
        </button>
        <button className="bg-purple-600 text-white rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-purple-700 transition-colors">
          <Download className="w-5 h-5" />
          <span className="font-medium">Descargar PDF</span>
        </button>
        <button className="bg-green-600 text-white rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-green-700 transition-colors">
          <Send className="w-5 h-5" />
          <span className="font-medium">Enviar por Email</span>
        </button>
      </div>

      {/* Receipt */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border-2 border-gray-300 p-8">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SquatGym</h1>
          <p className="text-gray-600">Centro de Entrenamiento Integral</p>
          <p className="text-sm text-gray-500 mt-2">Av. Principal 1234 - Tel: (11) 4567-8900</p>
        </div>

        {/* Receipt Info */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Recibo N°</p>
              <p className="text-xl font-bold text-gray-900">{receipt.number}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Fecha y Hora</p>
              <p className="font-medium text-gray-900">{receipt.date}</p>
              <p className="text-sm text-gray-600">{receipt.time}</p>
            </div>
          </div>
        </div>

        {/* Cliente Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Datos del Alumno</p>
          <p className="font-bold text-gray-900">{receipt.alumno.name}</p>
          <p className="text-sm text-gray-600">DNI: {receipt.alumno.dni}</p>
          <p className="text-sm text-gray-600">Plan: {receipt.alumno.plan}</p>
        </div>

        {/* Payment Details */}
        <div className="mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 text-sm font-medium text-gray-500">Concepto</th>
                <th className="text-right py-3 text-sm font-medium text-gray-500">Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 text-gray-900">Cuota mensual - {receipt.alumno.plan}</td>
                <td className="py-3 text-right font-medium text-gray-900">${receipt.payment.amount}</td>
              </tr>
              {receipt.payment.discount > 0 && (
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-900">Descuento aplicado</td>
                  <td className="py-3 text-right font-medium text-green-600">-${receipt.payment.discount}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total Pagado</span>
            <span className="text-2xl font-bold text-blue-700">${receipt.payment.total}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Método de pago: {receipt.payment.method}</p>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t-2 border-gray-300 text-center">
          <p className="text-sm text-gray-600">Atendido por: {receipt.attendedBy}</p>
          <p className="text-xs text-gray-500 mt-2">
            Este recibo certifica el pago de la cuota mensual del gimnasio.
          </p>
          <p className="text-xs text-gray-500 mt-4 font-medium">
            ¡Gracias por confiar en SquatGym!
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-2xl mx-auto mt-6 flex justify-center gap-4">
        <Link
          to="/cobranzas/buscar-alumno"
          className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
        >
          Registrar otro pago
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          to="/cobranzas"
          className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
        >
          Volver al dashboard
        </Link>
      </div>
    </div>
  );
}
