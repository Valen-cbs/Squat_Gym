import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  QrCode,
  Smartphone,
  Tag,
  Calendar,
  User
} from "lucide-react";

export default function RegistrarPago() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [amount, setAmount] = useState("850");
  const [discount, setDiscount] = useState("");
  const [notes, setNotes] = useState("");

  const alumno = {
    id: id,
    name: "Juan Pérez",
    plan: "Musculación",
    monthlyFee: 850
  };

  const promotions = [
    { id: "promo1", name: "Sin promoción", discount: 0 },
    { id: "promo2", name: "Pago anual (-15%)", discount: 15 },
    { id: "promo3", name: "Pago semestral (-10%)", discount: 10 },
    { id: "promo4", name: "Referido (-5%)", discount: 5 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/cobranzas/recibo/${Date.now()}`);
  };

  const finalAmount = discount
    ? parseFloat(amount) * (1 - parseFloat(discount) / 100)
    : parseFloat(amount);

  return (
    <div className="app-page">
      <Link
        to={`/cobranzas/estado-cuenta/${id}`}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al estado de cuenta
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Registrar Pago</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">Complete el formulario para registrar un nuevo pago</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="app-panel p-5 sm:p-6">
            {/* Alumno Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{alumno.name}</p>
                  <p className="text-sm text-gray-600">Plan: {alumno.plan} - ${alumno.monthlyFee}/mes</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Método de Pago
              </label>
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("efectivo")}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                    paymentMethod === "efectivo"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Banknote className="w-6 h-6" />
                  <span className="text-sm font-medium">Efectivo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("qr")}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                    paymentMethod === "qr"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <QrCode className="w-6 h-6" />
                  <span className="text-sm font-medium">QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("transferencia")}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                    paymentMethod === "transferencia"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Smartphone className="w-6 h-6" />
                  <span className="text-sm font-medium">Transferencia</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("tarjeta")}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                    paymentMethod === "tarjeta"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="text-sm font-medium">Tarjeta</span>
                </button>
              </div>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monto
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Promotion */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-2" />
                Aplicar Promoción
              </label>
              <select
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {promotions.map(promo => (
                  <option key={promo.id} value={promo.discount}>
                    {promo.name} {promo.discount > 0 && `(-${promo.discount}%)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas (opcional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Agregar observaciones..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Confirmar Pago y Emitir Recibo
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="app-panel p-5 sm:p-6 lg:sticky lg:top-8">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Resumen del Pago</h3>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-900">${amount}</span>
              </div>
              {discount && parseFloat(discount) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Descuento ({discount}%):</span>
                  <span className="font-medium text-green-600">
                    -${(parseFloat(amount) * parseFloat(discount) / 100).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-gray-900">Total a pagar:</span>
              <span className="text-2xl font-bold text-gray-900">${finalAmount.toFixed(2)}</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Fecha: {new Date().toLocaleDateString('es-AR')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CreditCard className="w-4 h-4" />
                <span>Método: {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
