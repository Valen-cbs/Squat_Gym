import { useState } from "react";
import {
  Search,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
import { getPlanPrice } from "../../data/catalog";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function parseDateDDMMYYYY(dateStr: string): Date | null {
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;
  const [dd, mm, yyyy] = parts.map(Number);
  return new Date(yyyy, mm - 1, dd);
}

export default function InscripcionesPagos() {
  const [activeTab, setActiveTab] = useState("inscripciones");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState<number | "">("");
  const [filterDay, setFilterDay] = useState<number | "">("");

  const inscripciones = [
    { id: 1, name: "Roberto García", plan: "Full Access", date: "20/04/2026", secretary: "María González", status: "Activo", amount: getPlanPrice("Full Access") },
    { id: 2, name: "Lucía Fernández", plan: "Musculacion", date: "18/04/2026", secretary: "María González", status: "Activo", amount: getPlanPrice("Musculacion") },
    { id: 3, name: "Martín Ruiz", plan: "CrossFit", date: "15/04/2026", secretary: "Carlos Rodríguez", status: "Activo", amount: getPlanPrice("CrossFit") },
    { id: 4, name: "Sofía Morales", plan: "Natacion", date: "12/04/2026", secretary: "María González", status: "Activo", amount: getPlanPrice("Natacion") },
    { id: 5, name: "Diego Castro", plan: "Full Access", date: "10/03/2026", secretary: "Carlos Rodríguez", status: "Pendiente", amount: getPlanPrice("Full Access") },
  ];

  const pagos = [
    { id: 1, date: "21/04/2026", alumno: "Juan Pérez", amount: 850, method: "Efectivo", secretary: "María González", receipt: "REC-001234" },
    { id: 2, date: "21/04/2026", alumno: "Ana Martínez", amount: 1200, method: "Transferencia", secretary: "María González", receipt: "REC-001233" },
    { id: 3, date: "20/04/2026", alumno: "Carlos López", amount: 850, method: "QR", secretary: "Carlos Rodríguez", receipt: "REC-001232" },
    { id: 4, date: "19/03/2026", alumno: "Laura Silva", amount: 1500, method: "Tarjeta", secretary: "María González", receipt: "REC-001231" },
    { id: 5, date: "18/03/2026", alumno: "Pedro Gómez", amount: 950, method: "Efectivo", secretary: "Carlos Rodríguez", receipt: "REC-001230" },
  ];

  const applyDateFilter = <T extends { date: string }>(items: T[]): T[] => {
    return items.filter((item) => {
      const d = parseDateDDMMYYYY(item.date);
      if (!d) return true;
      if (filterMonth !== "" && d.getMonth() !== filterMonth) return false;
      if (filterDay !== "" && d.getDate() !== filterDay) return false;
      return true;
    });
  };

  const filteredInscripciones = applyDateFilter(
    inscripciones.filter((insc) =>
      insc.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredPagos = applyDateFilter(
    pagos.filter((pago) =>
      pago.alumno.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const clearFilters = () => {
    setFilterMonth("");
    setFilterDay("");
    setSearchTerm("");
  };

  const hasActiveFilter = filterMonth !== "" || filterDay !== "";

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inscripciones y Pagos de la Sede</h1>
        <p className="text-gray-500 mt-2">Consulta de inscripciones y pagos registrados por secretaría</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Inscripciones mes</p>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{inscripciones.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Pagos registrados</p>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{pagos.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Total recaudado</p>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${pagos.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab("inscripciones")}
              className={`px-4 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "inscripciones"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Inscripciones
              </div>
            </button>
            <button
              onClick={() => setActiveTab("pagos")}
              className={`px-4 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "pagos"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Pagos
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Search + Filters */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Buscar ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 shrink-0" />
              <select
                value={filterMonth}
                onChange={(e) => { setFilterMonth(e.target.value === "" ? "" : Number(e.target.value)); setFilterDay(""); }}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos los meses</option>
                {MESES.map((mes, idx) => (
                  <option key={idx} value={idx}>{mes}</option>
                ))}
              </select>

              {filterMonth !== "" && (
                <select
                  value={filterDay}
                  onChange={(e) => setFilterDay(e.target.value === "" ? "" : Number(e.target.value))}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos los días</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              )}

              {hasActiveFilter && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:underline whitespace-nowrap"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {hasActiveFilter && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-700 border border-blue-200">
              <Filter className="w-4 h-4" />
              Filtrando por: {filterMonth !== "" ? MESES[filterMonth as number] : ""}{filterDay !== "" ? ` - día ${filterDay}` : ""}
            </div>
          )}

          {activeTab === "inscripciones" ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Fecha</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Alumno</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Plan</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Monto</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Registrado por</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInscripciones.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                        No hay inscripciones para el filtro seleccionado.
                      </td>
                    </tr>
                  ) : filteredInscripciones.map((insc) => (
                    <tr key={insc.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-600">{insc.date}</td>
                      <td className="px-4 py-4 font-medium text-gray-900">{insc.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{insc.plan}</td>
                      <td className="px-4 py-4 font-bold text-gray-900">${insc.amount}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{insc.secretary}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                          insc.status === "Activo" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}>
                          {insc.status === "Activo" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {insc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Fecha</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Alumno</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Monto</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Método</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Recibo</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Registrado por</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPagos.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                        No hay pagos para el filtro seleccionado.
                      </td>
                    </tr>
                  ) : filteredPagos.map((pago) => (
                    <tr key={pago.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-600">{pago.date}</td>
                      <td className="px-4 py-4 font-medium text-gray-900">{pago.alumno}</td>
                      <td className="px-4 py-4 font-bold text-gray-900">${pago.amount}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{pago.method}</td>
                      <td className="px-4 py-4 text-sm font-mono text-gray-600">{pago.receipt}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{pago.secretary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
