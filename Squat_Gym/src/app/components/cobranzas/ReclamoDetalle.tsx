import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, CheckCircle, ShieldCheck, XCircle } from "lucide-react";
import { getClaimById, PaymentClaim, claims as initialClaims } from "../../data/reclamos";

const statusStyles: Record<PaymentClaim["status"], string> = {
  Pendiente: "bg-orange-100 text-orange-700",
  "En revision": "bg-blue-100 text-blue-700",
  Resuelto: "bg-green-100 text-green-700",
};

export default function ReclamoDetalle() {
  const { id } = useParams();
  const [claims, setClaims] = useState(initialClaims);
  const claim = claims.find((c) => c.id === Number(id));

  const markInReview = () => {
    setClaims((prev) =>
      prev.map((c) => (c.id === Number(id) ? { ...c, status: "En revision" as const } : c))
    );
  };

  const markResolved = () => {
    setClaims((prev) =>
      prev.map((c) => (c.id === Number(id) ? { ...c, status: "Resuelto" as const } : c))
    );
  };

  if (!claim) {
    return (
      <div className="app-page">
        <div className="app-page-header">
          <div>
            <h1 className="app-page-title">Reclamo no encontrado</h1>
            <p className="app-page-copy">Verifica que el reclamo exista y vuelve a intentarlo.</p>
          </div>
        </div>
        <div className="app-panel p-6 text-center">
          <p className="text-sm text-slate-600">El reclamo solicitado no está disponible.</p>
          <Link to="/cobranzas/reclamos" className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Volver a reclamos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Reclamo de pago</h1>
          <p className="app-page-copy">Detalle y seguimiento del comprobante reportado.</p>
        </div>
        <Link
          to="/cobranzas/reclamos"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" /> Volver
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="app-panel p-6 lg:col-span-2">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{claim.alumno}</h2>
              <p className="text-sm text-slate-500">DNI {claim.dni}</p>
            </div>
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[claim.status]}`}>
              {claim.status}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Fecha reportada</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{claim.reportedDate}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Monto</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">${claim.amount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Medio</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{claim.method}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Comprobante</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{claim.receipt}</p>
            </div>
          </div>
        </div>

        <div className="app-panel p-6">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Acciones</h3>
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Estado actual</p>
              <p className="mt-2 text-sm font-semibold text-slate-700">{claim.status}</p>
            </div>

            {claim.status === "Resuelto" ? (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm font-medium text-green-700">
                <CheckCircle className="h-5 w-5 shrink-0" />
                Reclamo resuelto
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {claim.status !== "En revision" && (
                  <button
                    onClick={markInReview}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    <ShieldCheck className="h-4 w-4" /> Marcar en revisión
                  </button>
                )}
                <button
                  onClick={markResolved}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="h-4 w-4" /> Marcar como resuelto
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <div className="flex items-start gap-2">
          <XCircle className="mt-0.5 h-4 w-4 text-slate-500" />
          <p>Si el comprobante no coincide con caja o banco, solicita respaldo adicional y conserva el caso en revisión.</p>
        </div>
      </div>
    </div>
  );
}
