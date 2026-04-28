import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Download,
  Filter,
  Search,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function ListadoCobranzas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethod, setFilterMethod] = useState("all");
  const [filterMonth, setFilterMonth] = useState("04");

  const cobranzas = [
    { id: 1, date: "21/04/2026", alumno: "Juan Pérez", amount: 850, method: "Efectivo", status: "Pagado", receipt: "REC-001234" },
    { id: 2, date: "21/04/2026", alumno: "María González", amount: 850, method: "Transferencia", status: "Pagado", receipt: "REC-001233" },
    { id: 3, date: "20/04/2026", alumno: "Carlos Rodríguez", amount: 1200, method: "Tarjeta", status: "Pagado", receipt: "REC-001232" },
    { id: 4, date: "20/04/2026", alumno: "Ana Martínez", amount: 850, method: "QR", status: "Pagado", receipt: "REC-001231" },
    { id: 5, date: "19/04/2026", alumno: "Pedro Sánchez", amount: 680, method: "Efectivo", status: "Pagado", receipt: "REC-001230" },
    { id: 6, date: "18/04/2026", alumno: "Laura Gómez", amount: 850, method: "Transferencia", status: "Pagado", receipt: "REC-001229" },
    { id: 7, date: "17/04/2026", alumno: "Diego Fernández", amount: 1200, method: "Tarjeta", status: "Pagado", receipt: "REC-001228" },
    { id: 8, date: "16/04/2026", alumno: "Sofía López", amount: 850, method: "QR", status: "Pagado", receipt: "REC-001227" },
    { id: 9, date: "15/04/2026", alumno: "Martín Silva", amount: 850, method: "Efectivo", status: "Pagado", receipt: "REC-001226" },
    { id: 10, date: "14/04/2026", alumno: "Valentina Torres", amount: 1200, method: "Transferencia", status: "Pagado", receipt: "REC-001225" },
    { id: 11, date: "14/04/2026", alumno: "Valentina Torres", amount: 1200, method: "Transferencia", status: "Pagado", receipt: "REC-001225" },
  ];

  const filteredCobranzas = cobranzas.filter(cobranza => {
    const matchesSearch = cobranza.alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cobranza.receipt.includes(searchTerm);
    const matchesMethod = filterMethod === "all" || cobranza.method === filterMethod;
    return matchesSearch && matchesMethod;
  });

  const totalAmount = filteredCobranzas.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="p-8">
      <Link
        to="/cobranzas"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Listado de Cobranzas</h1>
        <p className="text-gray-500 mt-2">Historial completo de pagos recibidos</p>
      </div>

      {/* Filters and Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por alumno o recibo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter by Method */}
          <div>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los métodos</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Tarjeta">Tarjeta</option>
              <option value="QR">QR</option>
            </select>
          </div>

          {/* Filter by Month */}
          <div>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="04">Abril 2026</option>
              <option value="03">Marzo 2026</option>
              <option value="02">Febrero 2026</option>
              <option value="01">Enero 2026</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-600 mb-1">Total del período</p>
            <p className="text-2xl font-bold text-blue-700">${totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-600 mb-1">Pagos registrados</p>
            <p className="text-2xl font-bold text-green-700">{filteredCobranzas.length}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-purple-600 mb-1">Promedio por pago</p>
            <p className="text-2xl font-bold text-purple-700">
              ${filteredCobranzas.length > 0 ? Math.round(totalAmount / filteredCobranzas.length) : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="mb-4 flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Download className="w-4 h-4" />
          Exportar a Excel
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Recibo</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Fecha</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Alumno</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Monto</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Método</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredCobranzas.map((cobranza) => (
                <tr key={cobranza.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">{cobranza.receipt}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {cobranza.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{cobranza.alumno}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">${cobranza.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cobranza.method}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3" />
                      {cobranza.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/cobranzas/recibo/${cobranza.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                    >
                      Ver recibo
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
