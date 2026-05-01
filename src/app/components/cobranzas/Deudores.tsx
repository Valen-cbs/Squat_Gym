import { useState } from "react";
import { Link } from "react-router";
import { Search, User, Calendar, AlertCircle } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { hasPermission } from "../../permissions";

export default function Deudores() {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const canRegisterPayment = hasPermission(user?.role, "collections.registerPayment");

  const alumnos = [
    { id: 6, name: "Roberto Silva", dni: "67890123", status: "Deudor", lastPayment: "15/02/2026", plan: "Full Access", debtAmount: 1700, overdueMonths: 2 },
    { id: 7, name: "Laura Fernandez", dni: "78901234", status: "Deudor", lastPayment: "20/03/2026", plan: "Musculacion", debtAmount: 850, overdueMonths: 1 },
    { id: 8, name: "Diego Lopez", dni: "89012345", status: "Deudor", lastPayment: "10/01/2026", plan: "CrossFit", debtAmount: 2550, overdueMonths: 3 },
  ];

  const filteredAlumnos = alumnos.filter((alumno) =>
    alumno.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.dni.includes(searchTerm)
  );

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Deudores</h1>
        <p className="mt-2 text-gray-500">Listado de alumnos con deuda para seguimiento y cobranza.</p>
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
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Deuda</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumnos.map((alumno) => (
                <tr key={alumno.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                        <User className="h-5 w-5 text-orange-600" />
                      </div>
                      <Link
                        to={`/cobranzas/estado-cuenta/${alumno.id}`}
                        className="font-medium text-gray-900 transition-colors hover:text-blue-700 hover:underline"
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
                  <td className="px-6 py-4 text-sm font-bold text-error-dark">${alumno.debtAmount}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-error-light px-3 py-1 text-sm font-medium text-error-dark">
                      <AlertCircle className="h-4 w-4" />
                      {alumno.overdueMonths} {alumno.overdueMonths === 1 ? "mes" : "meses"} de atraso
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {canRegisterPayment ? (
                      <Link
                        to={`/cobranzas/registrar-pago/${alumno.id}`}
                        className="text-sm font-medium text-indigo-primary hover:text-indigo-dark hover:underline"
                      >
                        Registrar pago
                      </Link>
                    ) : (
                      <Link
                        to={`/cobranzas/estado-cuenta/${alumno.id}`}
                        className="text-sm font-medium text-indigo-primary hover:text-indigo-dark hover:underline"
                      >
                        Ver detalle
                      </Link>
                    )}
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
