import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Calendar, CreditCard, Search, Tag, User, X, Lock } from "lucide-react";
import PaymentMethodSelector, { paymentMethodLabels } from "../PaymentMethodSelector";
import { alumnos, getAlumnoById } from "../../data/alumnos";

type CardData = {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
};

function CardForm({
  onConfirm,
  onCancel,
}: {
  onConfirm: (data: CardData) => void;
  onCancel: () => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<Partial<CardData>>({});

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const validate = (): boolean => {
    const newErrors: Partial<CardData> = {};
    const rawCard = cardNumber.replace(/\s/g, "");
    if (rawCard.length < 13 || rawCard.length > 16) newErrors.cardNumber = "Número de tarjeta inválido";
    if (!cardHolder.trim()) newErrors.cardHolder = "Ingresá el nombre del titular";
    const [mm, yy] = expiry.split("/");
    if (!mm || !yy || Number(mm) < 1 || Number(mm) > 12 || yy.length < 2)
      newErrors.expiry = "Fecha de vencimiento inválida";
    if (cvv.length < 3) newErrors.cvv = "CVV inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onConfirm({ cardNumber: cardNumber.replace(/\s/g, ""), cardHolder, expiry, cvv });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Datos de tarjeta</h2>
          </div>
          <button onClick={onCancel} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Card preview */}
        <div className="mb-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-lg">
          <div className="mb-4 flex justify-between items-center">
            <div className="text-xs text-slate-400 uppercase tracking-widest">Tarjeta de crédito/débito</div>
            <CreditCard className="h-6 w-6 text-slate-300" />
          </div>
          <p className="font-mono text-lg tracking-widest mb-4">
            {cardNumber || "•••• •••• •••• ••••"}
          </p>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-xs text-slate-400">Titular</p>
              <p className="font-medium uppercase">{cardHolder || "NOMBRE APELLIDO"}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Vence</p>
              <p className="font-medium">{expiry || "MM/AA"}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Número de tarjeta</label>
            <input
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`w-full rounded-lg border px-3 py-2.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? "border-red-400 bg-red-50" : "border-gray-300"}`}
            />
            {errors.cardNumber && <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Nombre del titular</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
              placeholder="TAL COMO FIGURA EN LA TARJETA"
              className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardHolder ? "border-red-400 bg-red-50" : "border-gray-300"}`}
            />
            {errors.cardHolder && <p className="mt-1 text-xs text-red-600">{errors.cardHolder}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Vencimiento</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/AA"
                maxLength={5}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expiry ? "border-red-400 bg-red-50" : "border-gray-300"}`}
              />
              {errors.expiry && <p className="mt-1 text-xs text-red-600">{errors.expiry}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">CVV</label>
              <div className="relative">
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="•••"
                  maxLength={4}
                  className={`w-full rounded-lg border px-3 py-2.5 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cvv ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.cvv && <p className="mt-1 text-xs text-red-600">{errors.cvv}</p>}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Confirmar datos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RegistrarPago() {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialAlumno = id ? getAlumnoById(id) : undefined;
  const [selectedAlumnoId, setSelectedAlumnoId] = useState(initialAlumno?.id ?? 0);
  const [studentSearch, setStudentSearch] = useState(initialAlumno?.name ?? "");
  const alumno = getAlumnoById(selectedAlumnoId);
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardConfirmed, setCardConfirmed] = useState(false);
  const [cardData, setCardData] = useState<CardData | null>(null);

  const filteredAlumnos = useMemo(() => {
    const normalizedSearch = studentSearch.trim().toLowerCase();
    if (!normalizedSearch) return alumnos;
    return alumnos.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(normalizedSearch) ||
        candidate.dni.includes(normalizedSearch)
    );
  }, [studentSearch]);

  useEffect(() => {
    if (!alumno) { setAmount(""); return; }
    setAmount(String(alumno.debtAmount > 0 ? alumno.debtAmount : alumno.monthlyFee));
  }, [alumno]);

  // Show card form when tarjeta is selected
  useEffect(() => {
    if (paymentMethod === "tarjeta") {
      if (!cardConfirmed) setShowCardForm(true);
    } else {
      setShowCardForm(false);
      setCardConfirmed(false);
      setCardData(null);
    }
  }, [paymentMethod]);

  const selectAlumno = (nextAlumno: (typeof alumnos)[number]) => {
    setSelectedAlumnoId(nextAlumno.id);
    setStudentSearch(nextAlumno.name);
  };

  const handleCardConfirm = (data: CardData) => {
    setCardData(data);
    setCardConfirmed(true);
    setShowCardForm(false);
  };

  const subtotal = Number(amount || 0);
  const discountPercent = paymentMethod === "efectivo" ? 10 : 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalAmount = subtotal - discountAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alumno) return;
    if (paymentMethod === "tarjeta" && !cardConfirmed) {
      setShowCardForm(true);
      return;
    }
    navigate(`/cobranzas/recibo/${Date.now()}`, {
      state: {
        alumno,
        payment: {
          amount: subtotal,
          method: paymentMethodLabels[paymentMethod],
          discount: Number(discountAmount.toFixed(2)),
          total: Number(finalAmount.toFixed(2)),
          ...(cardData ? { cardLast4: cardData.cardNumber.slice(-4) } : {}),
        },
        notes,
      },
    });
  };

  return (
    <div className="app-page">
      {showCardForm && (
        <CardForm
          onConfirm={handleCardConfirm}
          onCancel={() => {
            setShowCardForm(false);
            setPaymentMethod("efectivo");
          }}
        />
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Registrar pago</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          {alumno?.debtAmount
            ? `Monto de deuda actual: $${alumno.debtAmount}`
            : "Completa el formulario para registrar un nuevo pago."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="app-panel p-5 sm:p-6">
            <div className="mb-6 rounded-lg border border-indigo-light bg-indigo-lightest p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-light">
                  <User className="h-6 w-6 text-indigo-primary" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {alumno ? alumno.name : "Seleccionar alumno"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {alumno
                      ? `Plan: ${alumno.plan} - $${alumno.monthlyFee}/mes`
                      : "Busca por nombre o DNI para continuar con el pago."}
                  </p>
                </div>
              </div>

              <label className="mb-2 block text-sm font-medium text-gray-700">Alumno</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => {
                    setStudentSearch(e.target.value);
                    setSelectedAlumnoId(0);
                  }}
                  placeholder="Buscar por nombre o DNI..."
                  className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {!alumno && studentSearch && (
                <div className="mt-3 max-h-56 overflow-y-auto rounded-lg border border-indigo-light bg-white">
                  {filteredAlumnos.length > 0 ? (
                    filteredAlumnos.map((candidate) => (
                      <button
                        key={candidate.id}
                        type="button"
                        onClick={() => selectAlumno(candidate)}
                        className="flex w-full items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 text-left last:border-b-0 hover:bg-indigo-lightest"
                      >
                        <span>
                          <span className="block font-medium text-gray-900">{candidate.name}</span>
                          <span className="block text-sm text-gray-600">
                            DNI {candidate.dni} - {candidate.plan}
                          </span>
                        </span>
                        <span className="text-sm font-semibold text-indigo-primary">
                          ${candidate.debtAmount > 0 ? candidate.debtAmount : candidate.monthlyFee}
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-sm text-gray-500">No se encontraron alumnos.</p>
                  )}
                </div>
              )}
            </div>

            <div className="mb-6">
              <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
              {paymentMethod === "tarjeta" && (
                <div className="mt-3">
                  {cardConfirmed && cardData ? (
                    <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <CreditCard className="h-4 w-4" />
                        <span>Tarjeta terminada en <strong>••••{cardData.cardNumber.slice(-4)}</strong> — {cardData.cardHolder}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setCardConfirmed(false); setCardData(null); setShowCardForm(true); }}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Cambiar
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowCardForm(true)}
                      className="w-full rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 py-3 text-sm font-medium text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      + Ingresar datos de tarjeta
                    </button>
                  )}
                </div>
              )}
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
              disabled={!alumno || (paymentMethod === "tarjeta" && !cardConfirmed)}
              className="w-full rounded-lg bg-success-medium py-3 font-medium text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
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
