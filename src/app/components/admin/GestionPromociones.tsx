import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Plus,
  Tag,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  Percent
} from "lucide-react";

export default function GestionPromociones() {
  const [activeTab, setActiveTab] = useState("promociones");

  const promociones = [
    { id: 1, name: "2x1 Verano", discount: 50, type: "Porcentaje", startDate: "01/12/2025", endDate: "28/02/2026", status: "Activa", uses: 45 },
    { id: 2, name: "Pago Anual", discount: 15, type: "Porcentaje", startDate: "01/01/2026", endDate: "31/12/2026", status: "Activa", uses: 23 },
    { id: 3, name: "Referido Amigo", discount: 150, type: "Monto fijo", startDate: "01/01/2026", endDate: "31/12/2026", status: "Activa", uses: 67 },
    { id: 4, name: "Black Friday", discount: 30, type: "Porcentaje", startDate: "20/11/2025", endDate: "30/11/2025", status: "Expirada", uses: 89 },
    { id: 5, name: "Estudiantes", discount: 10, type: "Porcentaje", startDate: "01/03/2026", endDate: "31/12/2026", status: "Activa", uses: 34 },
  ];

  const planes = [
    { id: 1, name: "Musculación", price: 850, duration: "Mensual", benefits: "Acceso a sala de musculación", active: true, subscribers: 165 },
    { id: 2, name: "Full Access", price: 1200, duration: "Mensual", benefits: "Acceso completo + clases", active: true, subscribers: 142 },
    { id: 3, name: "CrossFit", price: 1500, duration: "Mensual", benefits: "Box CrossFit + entrenador", active: true, subscribers: 78 },
    { id: 4, name: "Natación", price: 950, duration: "Mensual", benefits: "Pileta + clases de natación", active: true, subscribers: 56 },
    { id: 5, name: "Plan Anual", price: 8500, duration: "Anual", benefits: "Full Access - 15% descuento", active: true, subscribers: 23 },
    { id: 6, name: "Plan Corporativo", price: 750, duration: "Mensual", benefits: "Full Access empresas", active: false, subscribers: 12 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Promociones y Planes</h1>
        <p className="text-gray-500 mt-2">Gestionar promociones especiales y planes de membresía</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab("promociones")}
              className={`px-4 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "promociones"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Promociones
              </div>
            </button>
            <button
              onClick={() => setActiveTab("planes")}
              className={`px-4 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "planes"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Planes de Membresía
              </div>
            </button>
          </div>
        </div>

        {activeTab === "promociones" ? (
          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">Promociones activas</p>
                <p className="text-2xl font-bold text-blue-700">{promociones.filter(p => p.status === "Activa").length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-600 mb-1">Total usos este mes</p>
                <p className="text-2xl font-bold text-green-700">258</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-600 mb-1">Ahorro generado</p>
                <p className="text-2xl font-bold text-purple-700">$45,680</p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4" />
                Nueva Promoción
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Nombre</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Descuento</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Tipo</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Vigencia</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Estado</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Usos</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {promociones.map((promo) => (
                    <tr key={promo.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-900">{promo.name}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 text-green-600 font-bold">
                          <Percent className="w-4 h-4" />
                          {promo.discount}{promo.type === "Porcentaje" ? "%" : "$"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{promo.type}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {promo.startDate} - {promo.endDate}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                          promo.status === "Activa" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}>
                          {promo.status === "Activa" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {promo.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{promo.uses}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">Planes activos</p>
                <p className="text-2xl font-bold text-blue-700">{planes.filter(p => p.active).length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-600 mb-1">Total suscriptores</p>
                <p className="text-2xl font-bold text-green-700">{planes.reduce((sum, p) => sum + p.subscribers, 0)}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-600 mb-1">Ingreso mensual</p>
                <p className="text-2xl font-bold text-purple-700">$291,400</p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4" />
                Nuevo Plan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planes.map((plan) => (
                <div key={plan.id} className={`border-2 rounded-xl p-6 ${
                  plan.active ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      plan.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {plan.active ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-blue-600">${plan.price}</p>
                    <p className="text-sm text-gray-600">{plan.duration}</p>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">{plan.benefits}</p>
                  <div className="pt-4 border-t border-gray-200 mb-4">
                    <p className="text-sm text-gray-500">Suscriptores</p>
                    <p className="text-2xl font-bold text-gray-900">{plan.subscribers}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    <button className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
