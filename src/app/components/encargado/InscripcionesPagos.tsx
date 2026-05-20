import { useState } from "react";
import {
  DollarSign,
  Receipt,
  Search,
  TrendingUp,
} from "lucide-react";

export default function InscripcionesPagos() {
  const [searchTerm, setSearchTerm] = useState("");

  const pagos = [
    { id: 1, date: "21/04/2026", alumno: "Juan Perez", amount: 850, method: "Efectivo", secretary: "Maria Gonzalez", receipt: "REC-001234" },
    { id: 2, date: "21/04/2026", alumno: "Ana Martinez", amount: 1200, method: "Transferencia", secretary: "Maria Gonzalez", receipt: "REC-001233" },
    { id: 3, date: "20/04/2026", alumno: "Carlos Lopez", amount: 850, method: "QR", secretary: "Carlos Rodriguez", receipt: "REC-001232" },
    { id: 4, date: "19/04/2026", alumno: "Laura Silva", amount: 1500, method: "Tarjeta", secretary: "Maria Gonzalez", receipt: "REC-001231" },
    { id: 5, date: "18/04/2026", alumno: "Pedro Gomez", amount: 950, method: "Efectivo", secretary: "Carlos Rodriguez", receipt: "REC-001230" },
  ];

  const filteredPagos = pagos.filter((pago) =>
    pago.alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pago.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pago.receipt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalRecaudado = filteredPagos.reduce((sum, pago) => sum + pago.amount, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pagos de la Sede</h1>
        <p className="mt-2 text-gray-500">Consulta de pagos registrados por secretaria.</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-500">Pagos registrados</p>
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{filteredPagos.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-500">Recibos emitidos</p>
            <Receipt className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{pagos.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-500">Total recaudado</p>
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalRecaudado.toLocaleString("es-AR")}</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Pagos ({filteredPagos.length})</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar pagos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Alumno</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Monto</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Metodo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Recibo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Registrado por</th>
                </tr>
              </thead>
              <tbody>
                {filteredPagos.map((pago) => (
                  <tr key={pago.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-600">{pago.date}</td>
                    <td className="px-4 py-4 font-medium text-gray-900">{pago.alumno}</td>
                    <td className="px-4 py-4 font-bold text-gray-900">${pago.amount}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{pago.method}</td>
                    <td className="px-4 py-4 font-mono text-sm text-gray-600">{pago.receipt}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{pago.secretary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
