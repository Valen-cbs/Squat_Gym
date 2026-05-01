import { useState } from "react";
import { BellRing, CheckCircle, Clock, Mail, Search, Send } from "lucide-react";

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
  const [sent, setSent] = useState(false);

  const students: DueStudent[] = [
    { id: 1, alumno: "Juan Perez", dni: "12345678", dueDate: "03/05/2026", amount: 850, status: "Proximo a vencer", channel: "Email + WhatsApp" },
    { id: 2, alumno: "Maria Gonzalez", dni: "23456789", dueDate: "04/05/2026", amount: 850, status: "Proximo a vencer", channel: "Email" },
    { id: 3, alumno: "Laura Fernandez", dni: "78901234", dueDate: "28/04/2026", amount: 850, status: "Vencido", channel: "Email + WhatsApp" },
    { id: 4, alumno: "Roberto Silva", dni: "67890123", dueDate: "26/04/2026", amount: 1700, status: "Vencido", channel: "WhatsApp" },
  ];

  const filteredStudents = students.filter((student) =>
    `${student.alumno} ${student.dni} ${student.status}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dueSoonCount = students.filter((student) => student.status === "Proximo a vencer").length;
  const overdueCount = students.filter((student) => student.status === "Vencido").length;
  const totalAmount = students.reduce((sum, student) => sum + student.amount, 0);

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <h1 className="app-page-title">Recordatorios de vencimiento</h1>
          <p className="app-page-copy">
            Envio masivo a alumnos con cuotas proximas a vencer o ya vencidas.
          </p>
        </div>
        <button
          onClick={() => setSent(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Send className="h-4 w-4" />
          Enviar recordatorios
        </button>
      </div>

      {sent && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
          <CheckCircle className="h-5 w-5" />
          <p className="font-medium">Recordatorios enviados a {students.length} alumnos seleccionados.</p>
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="app-panel p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Proximos a vencer</p>
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-950">{dueSoonCount}</p>
        </div>
        <div className="app-panel p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Vencidos</p>
            <BellRing className="h-5 w-5 text-orange-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-orange-600">{overdueCount}</p>
        </div>
        <div className="app-panel p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Monto involucrado</p>
            <Mail className="h-5 w-5 text-green-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-950">${totalAmount.toLocaleString()}</p>
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
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Vencimiento</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Monto</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Canal</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{student.alumno}</p>
                    <p className="text-sm text-slate-500">DNI {student.dni}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{student.dueDate}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">${student.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        student.status === "Vencido"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{student.channel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
