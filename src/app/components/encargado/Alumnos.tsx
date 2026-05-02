import { useState } from "react";
import { Link } from "react-router";
import { AlertCircle, CheckCircle, Search, Trash2, User, X } from "lucide-react";
import { alumnos as initialAlumnos, type Alumno } from "../../data/alumnos";

export default function Alumnos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [alumnos, setAlumnos] = useState<Alumno[]>(initialAlumnos);
  const [studentToDelete, setStudentToDelete] = useState<Alumno | null>(null);

  const filteredAlumnos = alumnos.filter((alumno) =>
    alumno.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.dni.includes(searchTerm) ||
    alumno.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteStudent = () => {
    if (!studentToDelete) {
      return;
    }

    setAlumnos((current) => current.filter((alumno) => alumno.id !== studentToDelete.id));
    setStudentToDelete(null);
  };

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alumnos</h1>
        <p className="mt-2 text-gray-500">Listado general de alumnos de la sede.</p>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, DNI o plan..."
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
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Cuota</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumnos.map((alumno) => (
                <tr key={alumno.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <User className="h-5 w-5 text-blue-600" />
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
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">${alumno.monthlyFee}</td>
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
                    <button
                      onClick={() => setStudentToDelete(alumno)}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Borrar alumno</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Vas a borrar a {studentToDelete.name} del listado de alumnos.
                </p>
              </div>
              <button
                onClick={() => setStudentToDelete(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setStudentToDelete(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={deleteStudent}
                className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
              >
                Borrar alumno
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
