import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Search,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function InscripcionesPagos() {
  const [activeTab, setActiveTab] = useState("inscripciones");
  const [searchTerm, setSearchTerm] = useState("");

  const inscripciones = [
    { id: 1, name: "Roberto García", plan: "Full Access", date: "20/04/2026", secretary: "María González", status: "Activo", amount: 1200 },
    { id: 2, name: "Lucía Fernández", plan: "Musculación", date: "18/04/2026", secretary: "María González", status: "Activo", amount: 850 },
    { id: 3, name: "Martín Ruiz", plan: "CrossFit", date: "15/04/2026", secretary: "Carlos Rodríguez", status: "Activo", amount: 1500 },
    { id: 4, name: "Sofía Morales", plan: "Natación", date: "12/04/2026", secretary: "María González", status: "Activo", amount: 950 },
    { id: 5, name: "Diego Castro", plan: "Full Access", date: "10/04/2026", secretary: "Carlos Rodríguez", status: "Pendiente", amount: 1200 },
  ];

  const pagos = [
    { id: 1, date: "21/04/2026", alumno: "Juan Pérez", amount: 850, method: "Efectivo", secretary: "María González", receipt: "REC-001234" },
    { id: 2, date: "21/04/2026", alumno: "Ana Martínez", amount: 1200, method: "Transferencia", secretary: "María González", receipt: "REC-001233" },
    { id: 3, date: "20/04/2026", alumno: "Carlos López", amount: 850, method: "QR", secretary: "Carlos Rodríguez", receipt: "REC-001232" },
    { id: 4, date: "19/04/2026", alumno: "Laura Silva", amount: 1500, method: "Tarjeta", secretary: "María González", receipt: "REC-001231" },
    { id: 5, date: "18/04/2026", alumno: "Pedro Gómez", amount: 950, method: "Efectivo", secretary: "Carlos Rodríguez", receipt: "REC-001230" },
  ];

  const filteredInscripciones = inscripciones.filter(insc =>
    insc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPagos = pagos.filter(pago =>
    pago.alumno.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inscripciones y Pagos de la Sede</h1>
        <p className="text-gray-500 mt-2">Consulta de inscripciones y pagos registrados por secretaría</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Ticket promedio</p>
            <Calendar className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${Math.round(pagos.reduce((sum, p) => sum + p.amount, 0) / pagos.length)}</p>
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
          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Buscar ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
                  {filteredInscripciones.map((insc) => (
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
                  {filteredPagos.map((pago) => (
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
