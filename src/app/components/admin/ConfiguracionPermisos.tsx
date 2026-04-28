import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Shield,
  Bell,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

export default function ConfiguracionPermisos() {
  const [activeTab, setActiveTab] = useState("permisos");

  const roles = [
    {
      id: 1,
      name: "Administrador",
      users: 2,
      permissions: ["Acceso total", "Gestión de usuarios", "Configuración del sistema", "Reportes avanzados"],
      color: "red"
    },
    {
      id: 2,
      name: "Secretaría",
      users: 4,
      permissions: ["Gestión de cobranzas", "Gestión de kiosco", "Ver reportes básicos"],
      color: "blue"
    },
    {
      id: 3,
      name: "Instructor",
      users: 8,
      permissions: ["Ver alumnos", "Registrar asistencia", "Ver planes de entrenamiento"],
      color: "green"
    },
    {
      id: 4,
      name: "Mantenimiento",
      users: 3,
      permissions: ["Gestión de equipamiento", "Reportes de mantenimiento"],
      color: "gray"
    },
  ];

  const alertRules = [
    {
      id: 1,
      name: "Stock Crítico",
      description: "Notificar cuando un producto tiene menos de 5 unidades",
      condition: "Stock < 5",
      actions: ["Email a administración", "Notificación en sistema"],
      status: "Activa",
      triggers: 12
    },
    {
      id: 2,
      name: "Deuda Mayor a 2 Meses",
      description: "Alerta cuando un alumno tiene más de 2 meses de deuda",
      condition: "Meses_deuda >= 2",
      actions: ["Email a secretaría", "Bloqueo de acceso"],
      status: "Activa",
      triggers: 8
    },
    {
      id: 3,
      name: "Acceso No Autorizado",
      description: "Detectar intentos de acceso sin permisos",
      condition: "Acceso denegado",
      actions: ["Email a administrador", "Log de auditoría"],
      status: "Activa",
      triggers: 3
    },
    {
      id: 4,
      name: "Vencimiento de Promoción",
      description: "Notificar 7 días antes del vencimiento de una promoción",
      condition: "Días_restantes <= 7",
      actions: ["Email a administración"],
      status: "Activa",
      triggers: 2
    },
    {
      id: 5,
      name: "Ingresos Mensuales Bajos",
      description: "Alerta si los ingresos caen más del 10% respecto al mes anterior",
      condition: "Variación < -10%",
      actions: ["Email a administración", "Reporte automático"],
      status: "Inactiva",
      triggers: 0
    },
  ];

  return (
    <div className="p-8">
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configuración de Permisos y Alertas</h1>
        <p className="text-gray-500 mt-2">Administrar roles de usuario y reglas de notificación automática</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab("permisos")}
              className={`px-4 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "permisos"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Roles y Permisos
              </div>
            </button>
            <button
              onClick={() => setActiveTab("alertas")}
              className={`px-4 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "alertas"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Alertas Automáticas
              </div>
            </button>
          </div>
        </div>

        {activeTab === "permisos" ? (
          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">Roles configurados</p>
                <p className="text-2xl font-bold text-blue-700">{roles.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-600 mb-1">Total usuarios</p>
                <p className="text-2xl font-bold text-green-700">{roles.reduce((sum, r) => sum + r.users, 0)}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-600 mb-1">Permisos únicos</p>
                <p className="text-2xl font-bold text-purple-700">18</p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Nuevo Rol
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((role) => (
                <div key={role.id} className={`border-2 border-${role.color}-200 bg-${role.color}-50 rounded-xl p-6`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-${role.color}-100 rounded-lg flex items-center justify-center`}>
                        <Shield className={`w-6 h-6 text-${role.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{role.name}</h3>
                        <p className="text-sm text-gray-600">{role.users} usuarios asignados</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Permisos:</p>
                    <ul className="space-y-2">
                      {role.permissions.map((permission, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
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
        ) : (
          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">Reglas activas</p>
                <p className="text-2xl font-bold text-blue-700">{alertRules.filter(r => r.status === "Activa").length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-600 mb-1">Alertas hoy</p>
                <p className="text-2xl font-bold text-green-700">25</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <p className="text-sm text-orange-600 mb-1">Total triggers</p>
                <p className="text-2xl font-bold text-orange-700">{alertRules.reduce((sum, r) => sum + r.triggers, 0)}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-600 mb-1">Reglas inactivas</p>
                <p className="text-2xl font-bold text-purple-700">{alertRules.filter(r => r.status === "Inactiva").length}</p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                <Plus className="w-4 h-4" />
                Nueva Regla
              </button>
            </div>

            <div className="space-y-4">
              {alertRules.map((rule) => (
                <div key={rule.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        <h3 className="text-lg font-bold text-gray-900">{rule.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          rule.status === "Activa" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}>
                          {rule.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">Condición:</p>
                          <p className="text-sm font-mono bg-gray-100 px-3 py-2 rounded">{rule.condition}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">Acciones:</p>
                          <ul className="space-y-1">
                            {rule.actions.map((action, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Triggers</p>
                        <p className="text-xl font-bold text-gray-900">{rule.triggers}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
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
