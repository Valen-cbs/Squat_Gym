import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { CreditCard, Tag, Calendar, User } from "lucide-react";
import PaymentMethodSelector, { paymentMethodLabels } from "../PaymentMethodSelector";
import { getAlumnoById } from "../../data/alumnos";
import { getPlanPrice } from "../../data/catalog";

export default function RegistrarPago() {
  const { id } = useParams();
  const navigate = useNavigate();
  const alumno = getAlumnoById(id ?? "1") ?? {
    id: Number(id ?? 0),
    name: "Alumno desconocido",
    plan: "-",
    monthlyFee: getPlanPrice("Musculacion"),
    debtAmount: 0,
  };
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [amount, setAmount] = useState(
    String(alumno.debtAmount > 0 ? alumno.debtAmount : alumno.monthlyFee)
  );
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/cobranzas/recibo/${Date.now()}`, {
      state: {
        alumno,
        payment: {
          amount: subtotal,
          method: paymentMethodLabels[paymentMethod],
          discount: Number(discountAmount.toFixed(2)),
          total: Number(finalAmount.toFixed(2)),
        },
        notes,
      },
    });
  };

  const subtotal = Number(amount || 0);
  const discountPercent = paymentMethod === "efectivo" ? 10 : 0;
  const discountAmount = subtotal * discountPercent / 100;
  const finalAmount = subtotal - discountAmount;

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Registrar pago</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          {alumno.debtAmount > 0
            ? `Monto de deuda actual: $${alumno.debtAmount}`
            : "Completa el formulario para registrar un nuevo pago."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="app-panel p-5 sm:p-6">
            <div className="mb-6 rounded-lg border border-indigo-light bg-indigo-lightest p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-light">
                  <User className="h-6 w-6 text-indigo-primary" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{alumno.name}</p>
                  <p className="text-sm text-gray-600">Plan: {alumno.plan} - ${alumno.monthlyFee}/mes</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">Monto</label>
              <input
                type="number"
                min="0"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                <Tag className="mr-2 inline h-4 w-4" />
                Promocion aplicada
              </label>
              <div className="rounded-lg border border-indigo-light bg-indigo-lightest px-4 py-3 text-sm text-indigo-dark">
                {paymentMethod === "efectivo"
                  ? "Pago en efectivo: descuento automatico del 10%."
                  : "Sin descuento para este metodo de pago."}
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">Notas (opcional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Agregar observaciones..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-success-medium py-3 font-medium text-white transition-colors hover:opacity-90"
            >
              Confirmar pago y emitir recibo
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="app-panel p-5 sm:p-6 lg:sticky lg:top-8">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Resumen del pago</h3>

            <div className="mb-6 space-y-3 border-b border-gray-200 pb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-900">${subtotal}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Descuento efectivo ({discountPercent}%):</span>
                  <span className="font-medium text-success-dark">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="mb-6 flex items-center justify-between">
              <span className="font-bold text-gray-900">Total a pagar:</span>
              <span className="text-2xl font-bold text-gray-900">${finalAmount.toFixed(2)}</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Fecha: {new Date().toLocaleDateString("es-AR")}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CreditCard className="h-4 w-4" />
                <span>Metodo: {paymentMethodLabels[paymentMethod]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
