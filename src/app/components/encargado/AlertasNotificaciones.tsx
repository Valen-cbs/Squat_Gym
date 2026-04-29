import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  AlertTriangle,
  Users,
  Calendar,
  Package,
  Bell,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function AlertasNotificaciones() {
  const [filterType, setFilterType] = useState("all");

  const alertas = [
    {
      id: 1,
      type: "debtor",
      severity: "high",
      title: "Alumno deudor detectado",
      message: "Roberto Silva - 3 meses de deuda ($2,550)",
      date: "21/04/2026 14:30",
      status: "pending",
      icon: Users
    },
    {
      id: 2,
      type: "stock",
      severity: "critical",
      title: "Stock crítico en kiosco",
      message: "Bebida Isotónica: Solo 2 unidades disponibles",
      date: "21/04/2026 13:45",
      status: "pending",
      icon: Package
    },
    {
      id: 3,
      type: "class",
      severity: "medium",
      title: "Clase reprogramada",
      message: "CrossFit 18:00 movida a 19:00 por mantenimiento",
      date: "21/04/2026 12:00",
      status: "pending",
      icon: Calendar
    },
    {
      id: 4,
      type: "debtor",
      severity: "high",
      title: "Alumno deudor detectado",
      message: "Laura Gómez - 2 meses de deuda ($1,700)",
      date: "21/04/2026 10:15",
      status: "pending",
      icon: Users
    },
    {
      id: 5,
      type: "stock",
      severity: "high",
      title: "Stock bajo en kiosco",
      message: "Toalla Deportiva: 3 unidades (mínimo: 5)",
      date: "20/04/2026 16:30",
      status: "pending",
      icon: Package
    },
    {
      id: 6,
      type: "class",
      severity: "medium",
      title: "Clase cancelada",
      message: "Yoga 10:00 - Prof. ausente (enfermedad)",
      date: "20/04/2026 09:00",
      status: "resolved",
      icon: Calendar
    },
    {
      id: 7,
      type: "debtor",
      severity: "medium",
      title: "Alumno con 1 mes de deuda",
      message: "Diego Castro - $1,200 pendiente",
      date: "19/04/2026 14:00",
      status: "resolved",
      icon: Users
    },
    {
      id: 8,
      type: "stock",
      severity: "critical",
      title: "Producto agotado",
      message: "Barrita Proteica: Sin stock disponible",
      date: "19/04/2026 11:20",
      status: "resolved",
      icon: Package
    },
  ];

  const filteredAlertas = alertas.filter(alert => {
    if (filterType === "all") return true;
    return alert.type === filterType;
  });

  const pendingCount = alertas.filter(a => a.status === "pending").length;
  const criticalCount = alertas.filter(a => a.severity === "critical" && a.status === "pending").length;

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "critical": return "border-red-500 bg-red-50";
      case "high": return "border-orange-500 bg-orange-50";
      default: return "border-yellow-500 bg-yellow-50";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case "critical":
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">CRÍTICO</span>;
      case "high":
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">ALTO</span>;
      default:
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">MEDIO</span>;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alertas y Notificaciones</h1>
        <p className="text-gray-500 mt-2">Control de deudores, clases reprogramadas y stock crítico</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Alertas pendientes</p>
            <Bell className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Críticas</p>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Deudores</p>
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {alertas.filter(a => a.type === "debtor" && a.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Stock crítico</p>
            <Package className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {alertas.filter(a => a.type === "stock" && a.status === "pending").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todas ({alertas.length})
          </button>
          <button
            onClick={() => setFilterType("debtor")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === "debtor" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Deudores ({alertas.filter(a => a.type === "debtor").length})
          </button>
          <button
            onClick={() => setFilterType("stock")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === "stock" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Stock ({alertas.filter(a => a.type === "stock").length})
          </button>
          <button
            onClick={() => setFilterType("class")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === "class" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Clases ({alertas.filter(a => a.type === "class").length})
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlertas.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-xl shadow-sm border-l-4 p-6 ${getSeverityColor(alert.severity)} ${
              alert.status === "resolved" ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  alert.severity === "critical" ? "bg-red-100" :
                  alert.severity === "high" ? "bg-orange-100" : "bg-yellow-100"
                }`}>
                  <alert.icon className={`w-6 h-6 ${
                    alert.severity === "critical" ? "text-red-600" :
                    alert.severity === "high" ? "text-orange-600" : "text-yellow-600"
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">{alert.title}</h3>
                    {getSeverityBadge(alert.severity)}
                    {alert.status === "resolved" && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        RESUELTA
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{alert.message}</p>
                  <p className="text-sm text-gray-500">{alert.date}</p>
                </div>
              </div>
              {alert.status === "pending" && (
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    Resolver
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Ver detalle
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
