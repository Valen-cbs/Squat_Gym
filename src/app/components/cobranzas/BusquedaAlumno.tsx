import { useState } from "react";
import { Link } from "react-router";
import { Search, User, Calendar, CheckCircle, AlertCircle } from "lucide-react";

export default function BusquedaAlumno() {
  const [searchTerm, setSearchTerm] = useState("");

  const alumnos = [
    { id: 1, name: "Juan Perez", dni: "12345678", status: "Al dia", lastPayment: "01/04/2026", plan: "Musculacion" },
    { id: 2, name: "Maria Gonzalez", dni: "23456789", status: "Al dia", lastPayment: "05/04/2026", plan: "Full Access" },
    { id: 3, name: "Carlos Rodriguez", dni: "34567890", status: "Al dia", lastPayment: "10/04/2026", plan: "CrossFit" },
    { id: 4, name: "Ana Martinez", dni: "45678901", status: "Al dia", lastPayment: "15/04/2026", plan: "Natacion" },
    { id: 5, name: "Pedro Sanchez", dni: "56789012", status: "Al dia", lastPayment: "18/04/2026", plan: "Musculacion" },
    { id: 6, name: "Roberto Silva", dni: "67890123", status: "Deudor", lastPayment: "15/02/2026", plan: "Full Access" },
    { id: 7, name: "Laura Fernandez", dni: "78901234", status: "Deudor", lastPayment: "20/03/2026", plan: "Musculacion" },
    { id: 8, name: "Diego Lopez", dni: "89012345", status: "Deudor", lastPayment: "10/01/2026", plan: "CrossFit" },
  ];

  const filteredAlumnos = alumnos.filter((alumno) =>
    alumno.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.dni.includes(searchTerm)
  );

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Buscar alumno</h1>
        <p className="mt-2 text-gray-500">Encuentra un alumno para consultar su estado de cuenta o registrar un pago.</p>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Resultados ({filteredAlumnos.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Alumno</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">DNI</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Ultimo pago</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumnos.map((alumno) => (
                <tr key={alumno.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-light">
                        <User className="h-5 w-5 text-indigo-primary" />
                      </div>
                      <Link
                        to={`/cobranzas/registrar-pago/${alumno.id}`}
                        className="font-medium text-gray-900 transition-colors hover:text-indigo-primary hover:underline"
                      >
                        {alumno.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{alumno.dni}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{alumno.plan}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {alumno.lastPayment}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                        alumno.status === "Al dia"
                          ? "bg-success-light text-success-dark"
                          : "bg-warning-light text-warning-dark"
                      }`}
                    >
                      {alumno.status === "Al dia" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      {alumno.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/cobranzas/registrar-pago/${alumno.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Registrar pago
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
