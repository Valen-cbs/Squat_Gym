import { Link, useNavigate, useParams } from "react-router";
import { CheckCircle, XCircle } from "lucide-react";
import { getClaimById } from "../../data/reclamos";

export default function ReclamoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const claim = getClaimById(id ?? "");

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
          <p className="text-sm text-slate-600">El reclamo solicitado no esta disponible.</p>
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
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="app-panel p-6 lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">{claim.alumno}</h2>
            <p className="text-sm text-slate-500">DNI {claim.dni}</p>
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
              <p className="text-sm text-slate-500">Nro de operacion</p>
              <p className="mt-2 font-mono text-lg font-semibold text-slate-900">{claim.operationNumber}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
              <p className="text-sm text-slate-500">Descripcion del problema</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{claim.description}</p>
            </div>
          </div>
        </div>

        <div className="app-panel p-6">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Siguiente paso</h3>
          <button
            onClick={() => navigate("/cobranzas/reclamos")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4" /> Marcar como resuelto
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <div className="flex items-start gap-2">
          <XCircle className="mt-0.5 h-4 w-4 text-slate-500" />
          <p>Verificar en la cuenta bancaria si el pago fue acreditado. Si no se confirma, el reclamo permanece pendiente.</p>
        </div>
      </div>
    </div>
  );
}
