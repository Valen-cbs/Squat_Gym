import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit
} from "lucide-react";

export default function Auditoria() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("today");

  const auditLogs = [
    {
      id: 1,
      timestamp: "21/04/2026 14:35:22",
      user: "Juan Pérez",
      role: "Administrador",
      action: "Creó nuevo usuario",
      details: "Usuario: María López (Secretaría - Sede Norte)",
      type: "create",
      severity: "info",
      ip: "192.168.1.45"
    },
    {
      id: 2,
      timestamp: "21/04/2026 14:28:15",
      user: "María González",
      role: "Secretaría",
      action: "Registró pago",
      details: "Alumno: Carlos Rodríguez - Monto: $850 (Efectivo)",
      type: "payment",
      severity: "info",
      ip: "192.168.1.23"
    },
    {
      id: 3,
      timestamp: "21/04/2026 14:15:08",
      user: "Carlos Rodríguez",
      role: "Administrador",
      action: "Modificó promoción",
      details: "Promoción: 2x1 Verano - Cambió fecha de fin",
      type: "update",
      severity: "warning",
      ip: "192.168.1.45"
    },
    {
      id: 4,
      timestamp: "21/04/2026 13:52:33",
      user: "Sistema",
      role: "Sistema",
      action: "Alerta automática",
      details: "Stock crítico: Bebida Isotónica (3 unidades)",
      type: "alert",
      severity: "warning",
      ip: "127.0.0.1"
    },
    {
      id: 5,
      timestamp: "21/04/2026 13:45:19",
      user: "Ana Martínez",
      role: "Secretaría",
      action: "Intentó acceder sin permisos",
      details: "Módulo: Configuración de sistema",
      type: "security",
      severity: "error",
      ip: "192.168.1.67"
    },
    {
      id: 6,
      timestamp: "21/04/2026 13:30:42",
      user: "Pedro Sánchez",
      role: "Secretaría",
      action: "Generó reporte",
      details: "Reporte: Cobranzas mensuales - Abril 2026",
      type: "report",
      severity: "info",
      ip: "192.168.1.89"
    },
    {
      id: 7,
      timestamp: "21/04/2026 12:15:28",
      user: "Juan Pérez",
      role: "Administrador",
      action: "Eliminó usuario",
      details: "Usuario: Roberto Silva (Inactivo)",
      type: "delete",
      severity: "warning",
      ip: "192.168.1.45"
    },
    {
      id: 8,
      timestamp: "21/04/2026 11:22:55",
      user: "María González",
      role: "Secretaría",
      action: "Registró venta kiosco",
      details: "Productos: 3 items - Total: $210",
      type: "sale",
      severity: "info",
      ip: "192.168.1.23"
    },
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || log.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "create": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "update": return <Edit className="w-4 h-4 text-blue-600" />;
      case "delete": return <XCircle className="w-4 h-4 text-red-600" />;
      case "alert": return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "security": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case "error":
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">ERROR</span>;
      case "warning":
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">ADVERTENCIA</span>;
      default:
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">INFO</span>;
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900">Auditoría de Actividad</h1>
        <p className="text-gray-500 mt-2">Registro completo de eventos y acciones del sistema</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total eventos hoy</p>
          <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Eventos críticos</p>
          <p className="text-2xl font-bold text-red-600">{auditLogs.filter(l => l.severity === "error").length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Advertencias</p>
          <p className="text-2xl font-bold text-orange-600">{auditLogs.filter(l => l.severity === "warning").length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Usuarios activos</p>
          <p className="text-2xl font-bold text-blue-600">{new Set(auditLogs.map(l => l.user)).size}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en registros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los tipos</option>
            <option value="create">Creación</option>
            <option value="update">Modificación</option>
            <option value="delete">Eliminación</option>
            <option value="payment">Pagos</option>
            <option value="sale">Ventas</option>
            <option value="alert">Alertas</option>
            <option value="security">Seguridad</option>
          </select>
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Hoy</option>
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
            <option value="all">Todo el historial</option>
          </select>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Registro de Eventos ({filteredLogs.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Fecha/Hora</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Usuario</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Acción</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Detalles</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Severidad</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">IP</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {log.timestamp}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{log.user}</p>
                        <p className="text-xs text-gray-500">{log.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(log.type)}
                      <span className="text-sm text-gray-900">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">
                    {log.details}
                  </td>
                  <td className="px-6 py-4">
                    {getSeverityBadge(log.severity)}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
