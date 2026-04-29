import { Link, useParams } from "react-router";
import { CheckCircle, Download, Printer, ArrowLeft, Calendar, ShoppingCart } from "lucide-react";

export default function DetalleVenta() {
  const { id } = useParams();

  const sale = {
    id: id,
    number: "VENTA-" + id?.slice(-6),
    date: new Date().toLocaleDateString('es-AR'),
    time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    items: [
      { id: 1, name: "Bebida Isotónica", quantity: 2, price: 60, total: 120 },
      { id: 2, name: "Barrita Proteica", quantity: 1, price: 70, total: 70 },
      { id: 3, name: "Agua Mineral", quantity: 3, price: 30, total: 90 },
    ],
    total: 280,
    paymentMethod: "Efectivo",
    attendedBy: "Secretaría - Recepción"
  };

  return (
    <div className="p-8">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-green-900">¡Venta Registrada Exitosamente!</h2>
          <p className="text-green-700">El stock se actualizó automáticamente</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button className="bg-blue-600 text-white rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors">
          <Printer className="w-5 h-5" />
          <span className="font-medium">Imprimir Ticket</span>
        </button>
        <Link
          to="/kiosco/nueva-venta"
          className="bg-purple-600 text-white rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-purple-700 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-medium">Nueva Venta</span>
        </Link>
      </div>

      {/* Sale Detail */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border-2 border-gray-300 p-8">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SquatGym - Kiosco</h1>
          <p className="text-gray-600">Ticket de Venta</p>
        </div>

        {/* Sale Info */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Número de Venta</p>
              <p className="text-xl font-bold text-gray-900">{sale.number}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Fecha y Hora</p>
              <p className="font-medium text-gray-900">{sale.date}</p>
              <p className="text-sm text-gray-600">{sale.time}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 text-sm font-medium text-gray-500">Producto</th>
                <th className="text-center py-3 text-sm font-medium text-gray-500">Cant.</th>
                <th className="text-right py-3 text-sm font-medium text-gray-500">Precio</th>
                <th className="text-right py-3 text-sm font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {sale.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-3 text-sm text-gray-900">{item.name}</td>
                  <td className="py-3 text-sm text-center text-gray-900">{item.quantity}</td>
                  <td className="py-3 text-sm text-right text-gray-900">${item.price}</td>
                  <td className="py-3 text-sm text-right font-medium text-gray-900">${item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-700">${sale.total}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Método de pago: {sale.paymentMethod}</p>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t-2 border-gray-300 text-center">
          <p className="text-sm text-gray-600">Atendido por: {sale.attendedBy}</p>
          <p className="text-xs text-gray-500 mt-4 font-medium">
            ¡Gracias por tu compra!
          </p>
        </div>
      </div>
    </div>
  );
}
