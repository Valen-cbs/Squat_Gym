import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle, FileSearch, Search, ShieldCheck, XCircle } from "lucide-react";

type ClaimStatus = "Pendiente" | "En revision" | "Resuelto";

type PaymentClaim = {
  id: number;
  alumno: string;
  dni: string;
  reportedDate: string;
  amount: number;
  method: string;
  receipt: string;
  status: ClaimStatus;
};

export default function ReclamosPago() {
  const [searchTerm, setSearchTerm] = useState("");
  const [claims, setClaims] = useState<PaymentClaim[]>([
    {
      id: 1,
      alumno: "Laura Fernandez",
      dni: "78901234",
      reportedDate: "22/04/2026",
      amount: 850,
      method: "Transferencia",
      receipt: "Comprobante banco Macro",
      status: "Pendiente",
    },
    {
      id: 2,
      alumno: "Diego Lopez",
      dni: "89012345",
      reportedDate: "20/04/2026",
      amount: 1200,
      method: "QR",
      receipt: "Operacion 80913",
      status: "En revision",
    },
    {
      id: 3,
      alumno: "Roberto Silva",
      dni: "67890123",
      reportedDate: "18/04/2026",
      amount: 850,
      method: "Efectivo",
      receipt: "Ticket caja tarde",
      status: "Resuelto",
    },
  ]);

  const filteredClaims = claims.filter((claim) =>
    `${claim.alumno} ${claim.dni} ${claim.receipt}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resolveClaim = (claimId: number) => {
    setClaims((current) =>
      current.map((claim) => (claim.id === claimId ? { ...claim, status: "Resuelto" } : claim))
    );
  };

  const markInReview = (claimId: number) => {
    setClaims((current) =>
      current.map((claim) => (claim.id === claimId ? { ...claim, status: "En revision" } : claim))
    );
  };

  const statusStyles: Record<ClaimStatus, string> = {
    Pendiente: "bg-orange-100 text-orange-700",
    "En revision": "bg-blue-100 text-blue-700",
    Resuelto: "bg-green-100 text-green-700",
  };

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Reclamos de pago</h1>
          <p className="app-page-copy">
            Verificacion de pagos informados por alumnos cuando el cobro no aparece registrado.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="app-panel p-5">
          <p className="text-sm text-slate-500">Pendientes</p>
          <p className="mt-2 text-3xl font-bold text-orange-600">
            {claims.filter((claim) => claim.status === "Pendiente").length}
          </p>
        </div>
        <div className="app-panel p-5">
          <p className="text-sm text-slate-500">En revision</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {claims.filter((claim) => claim.status === "En revision").length}
          </p>
        </div>
        <div className="app-panel p-5">
          <p className="text-sm text-slate-500">Resueltos</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {claims.filter((claim) => claim.status === "Resuelto").length}
          </p>
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
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Comprobante</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Estado</th>
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
                  <td className="px-6 py-4 text-sm text-slate-600">{claim.receipt}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[claim.status]}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {claim.status === "Resuelto" ? (
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        Pago conciliado
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {claim.status === "Pendiente" && (
                          <button
                            onClick={() => markInReview(claim.id)}
                            className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                          >
                            <ShieldCheck className="h-4 w-4" />
                            Marcar en revisión
                          </button>
                        )}
                        {claim.status === "En revision" && (
                          <Link
                            to={`/cobranzas/reclamos/${claim.id}`}
                            className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors"
                          >
                            <ShieldCheck className="h-4 w-4" />
                            Ver detalle
                          </Link>
                        )}
                        <button
                          onClick={() => resolveClaim(claim.id)}
                          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Marcar como resuelto
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <div className="flex items-start gap-2">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
          <p>
            Si el comprobante no coincide con caja o banco, la secretaria deja el caso en revisión y solicita respaldo adicional.
          </p>
        </div>
      </div>
    </div>
  );
}
