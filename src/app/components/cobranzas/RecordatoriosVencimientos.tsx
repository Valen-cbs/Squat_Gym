import { useState } from "react";
import { Link } from "react-router";
import { CreditCard, FileText, Search } from "lucide-react";

type DueStudent = {
  id: number;
  alumno: string;
  dni: string;
  dueDate: string;
  amount: number;
  status: "Proximo a vencer" | "Vencido";
  channel: string;
};

export default function RecordatoriosVencimientos() {
  const [searchTerm, setSearchTerm] = useState("");

  const students: DueStudent[] = [
    { id: 1, alumno: "Juan Perez", dni: "12345678", dueDate: "03/05/2026", amount: 850, status: "Proximo a vencer", channel: "Email + WhatsApp" },
    { id: 2, alumno: "Maria Gonzalez", dni: "23456789", dueDate: "04/05/2026", amount: 850, status: "Proximo a vencer", channel: "Email" },
    { id: 3, alumno: "Laura Fernandez", dni: "78901234", dueDate: "28/04/2026", amount: 850, status: "Vencido", channel: "Email + WhatsApp" },
    { id: 4, alumno: "Roberto Silva", dni: "67890123", dueDate: "26/04/2026", amount: 1700, status: "Vencido", channel: "WhatsApp" },
  ];

  const filteredStudents = students.filter((student) =>
    `${student.alumno} ${student.dni} ${student.status}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Recordatorios de vencimiento</h1>
        </div>
      </div>

      <div className="mb-6 app-panel p-5 sm:p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por alumno, DNI o estado..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-lg border border-slate-300 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="app-panel overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-xl font-bold text-slate-900">Alumnos incluidos ({filteredStudents.length})</h2>
        </div>
        <div className="app-table-scroll">
          <table className="app-table w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Alumno</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Monto</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Canal</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{student.alumno}</p>
                    <p className="text-sm text-slate-500">DNI {student.dni}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">${student.amount}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{student.channel}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Link
                        to={`/cobranzas/estado-cuenta/${student.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-light px-3 py-2 text-sm font-medium text-indigo-primary transition-colors hover:bg-indigo-lightest"
                      >
                        <FileText className="h-4 w-4" />
                        Estado
                      </Link>
                      <Link
                        to={`/cobranzas/registrar-pago/${student.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-success-medium px-3 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
                      >
                        <CreditCard className="h-4 w-4" />
                        Pago
                      </Link>
                    </div>
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
