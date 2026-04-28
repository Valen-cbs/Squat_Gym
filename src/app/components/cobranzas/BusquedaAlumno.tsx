import { useState } from "react";
import { Link } from "react-router";
import { Search, User, Calendar, CheckCircle, AlertCircle } from "lucide-react";

export default function BusquedaAlumno() {
  const [searchTerm, setSearchTerm] = useState("");

  const alumnos = [
    { id: 1, name: "Juan Pérez", dni: "12345678", status: "Al día", lastPayment: "01/04/2026", plan: "Musculación" },
    { id: 2, name: "María González", dni: "23456789", status: "Al día", lastPayment: "05/04/2026", plan: "Full Access" },
    { id: 3, name: "Carlos Rodríguez", dni: "34567890", status: "Al día", lastPayment: "10/04/2026", plan: "CrossFit" },
    { id: 4, name: "Ana Martínez", dni: "45678901", status: "Al día", lastPayment: "15/04/2026", plan: "Natación" },
    { id: 5, name: "Pedro Sánchez", dni: "56789012", status: "Al día", lastPayment: "18/04/2026", plan: "Musculación" },
    { id: 6, name: "Roberto Silva", dni: "67890123", status: "Deudor", lastPayment: "15/02/2026", plan: "Full Access" },
    { id: 7, name: "Laura Fernández", dni: "78901234", status: "Deudor", lastPayment: "20/03/2026", plan: "Musculación" },
    { id: 8, name: "Diego López", dni: "89012345", status: "Deudor", lastPayment: "10/01/2026", plan: "CrossFit" },
  ];

  const filteredAlumnos = alumnos.filter(alumno =>
    alumno.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.dni.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Buscar Alumno</h1>
        <p className="text-gray-500 mt-2">Encuentra un alumno para consultar su estado de cuenta</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Resultados ({filteredAlumnos.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Alumno</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">DNI</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Plan</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Último Pago</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumnos.map((alumno) => (
                <tr key={alumno.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{alumno.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{alumno.dni}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{alumno.plan}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {alumno.lastPayment}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                      alumno.status === "Al día"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {alumno.status === "Al día" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                      {alumno.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/cobranzas/estado-cuenta/${alumno.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                    >
                      Ver estado de cuenta
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
