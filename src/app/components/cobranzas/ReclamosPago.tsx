import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle, FileSearch, Search, ShieldCheck, XCircle } from "lucide-react";
import { claims as initialClaims, PaymentClaim } from "../../data/reclamos";

export default function ReclamosPago() {
  const [searchTerm, setSearchTerm] = useState("");
  const [claims, setClaims] = useState<PaymentClaim[]>(initialClaims);

  const filteredClaims = claims.filter((claim) =>
    `${claim.alumno} ${claim.dni} ${claim.operationNumber}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resolveClaim = (claimId: number) => {
    setClaims((current) => current.filter((claim) => claim.id !== claimId));
  };

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Reclamos de pago</h1>
        </div>
      </div>

      <div className="mb-6 app-panel p-5 sm:p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por alumno, DNI u operacion..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-lg border border-slate-300 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="app-panel overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Casos reportados ({filteredClaims.length})</h2>
          </div>
        </div>
        <div className="app-table-scroll">
          <table className="app-table w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Alumno</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Fecha informada</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Monto</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Medio</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Operacion</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Accion</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{claim.alumno}</p>
                    <p className="text-sm text-slate-500">DNI {claim.dni}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{claim.reportedDate}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">${claim.amount}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{claim.method}</td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-700">{claim.operationNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/cobranzas/reclamos/${claim.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Revisar
                      </Link>
                      <button
                        onClick={() => resolveClaim(claim.id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Resuelto
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClaims.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-500">
                    No hay reclamos pendientes para los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <div className="flex items-start gap-2">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
          <p>
            Verificar en la cuenta bancaria si el pago fue acreditado antes de marcar el reclamo como resuelto.
          </p>
        </div>
      </div>
    </div>
  );
}
