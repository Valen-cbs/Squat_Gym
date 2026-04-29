import { Link } from "react-router";
import { ArrowLeft, TrendingUp, TrendingDown, Users, DollarSign, Calendar, Download } from "lucide-react";

export default function ReportesSedes() {
  const sedesData = [
    {
      name: "Sede Central",
      revenue: 125400,
      growth: "+12%",
      members: 165,
      newMembers: 8,
      payments: 142,
      averageTicket: 882,
      trend: "up"
    },
    {
      name: "Sede Norte",
      revenue: 98200,
      growth: "+8%",
      members: 142,
      newMembers: 5,
      payments: 128,
      averageTicket: 767,
      trend: "up"
    },
    {
      name: "Sede Sur",
      revenue: 67800,
      growth: "-3%",
      members: 89,
      newMembers: 2,
      payments: 78,
      averageTicket: 869,
      trend: "down"
    }
  ];

  const totalRevenue = sedesData.reduce((sum, sede) => sum + sede.revenue, 0);
  const totalMembers = sedesData.reduce((sum, sede) => sum + sede.members, 0);
  const totalPayments = sedesData.reduce((sum, sede) => sum + sede.payments, 0);

  const monthlyComparison = [
    { month: "Enero", central: 118500, norte: 92300, sur: 71200 },
    { month: "Febrero", central: 121800, norte: 94100, sur: 68900 },
    { month: "Marzo", central: 123200, norte: 96800, sur: 69500 },
    { month: "Abril", central: 125400, norte: 98200, sur: 67800 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reportes y Estadísticas por Sede</h1>
            <p className="text-gray-500 mt-2">Análisis consolidado del rendimiento de todas las sedes</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            Exportar Reporte
          </button>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Ingresos Totales</p>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">+8.3% vs mes anterior</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Alumnos Totales</p>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
          <p className="text-sm text-blue-600 mt-1">+15 nuevos este mes</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Pagos Procesados</p>
            <Calendar className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalPayments}</p>
          <p className="text-sm text-purple-600 mt-1">Abril 2026</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Ticket Promedio</p>
            <TrendingUp className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${Math.round(totalRevenue / totalPayments)}</p>
          <p className="text-sm text-orange-600 mt-1">Por transacción</p>
        </div>
      </div>

      {/* Sedes Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {sedesData.map((sede, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
            <div className={`p-6 ${
              sede.trend === "up" ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-orange-500 to-orange-600"
            } text-white`}>
              <h3 className="text-xl font-bold mb-2">{sede.name}</h3>
              <div className="flex items-center gap-2">
                {sede.trend === "up" ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
                <span className="text-lg font-medium">{sede.growth}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Ingresos del mes</p>
                  <p className="text-2xl font-bold text-gray-900">${sede.revenue.toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Alumnos</p>
                    <p className="text-xl font-bold text-gray-900">{sede.members}</p>
                    <p className="text-xs text-green-600">+{sede.newMembers} nuevos</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pagos</p>
                    <p className="text-xl font-bold text-gray-900">{sede.payments}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Ticket promedio</p>
                  <p className="text-xl font-bold text-gray-900">${sede.averageTicket}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Comparación Mensual de Ingresos</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Mes</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Sede Central</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Sede Norte</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Sede Sur</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {monthlyComparison.map((data, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">{data.month}</td>
                  <td className="px-4 py-4 text-right text-gray-900">${data.central.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right text-gray-900">${data.norte.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right text-gray-900">${data.sur.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right font-bold text-gray-900">
                    ${(data.central + data.norte + data.sur).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 font-bold">
                <td className="px-4 py-4 text-gray-900">Promedio</td>
                <td className="px-4 py-4 text-right text-gray-900">$122,225</td>
                <td className="px-4 py-4 text-right text-gray-900">$95,350</td>
                <td className="px-4 py-4 text-right text-gray-900">$69,350</td>
                <td className="px-4 py-4 text-right text-blue-700">$286,925</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
