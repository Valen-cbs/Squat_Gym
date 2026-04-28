import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  FileText,
  Plus,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  Trash2
} from "lucide-react";

export default function NovedadesInternas() {
  const [showForm, setShowForm] = useState(false);

  const novedades = [
    {
      id: 1,
      type: "maintenance",
      title: "Reparación aire acondicionado",
      description: "Se completó la reparación del aire acondicionado de la sala principal. Sistema funcionando correctamente.",
      author: "Juan Pérez",
      date: "21/04/2026 14:00",
      priority: "high",
      status: "completed"
    },
    {
      id: 2,
      type: "incident",
      title: "Corte de luz temporal",
      description: "Corte programado de energía eléctrica de 10:00 a 11:30. Se informó a los alumnos presentes.",
      author: "María González",
      date: "21/04/2026 11:45",
      priority: "medium",
      status: "completed"
    },
    {
      id: 3,
      type: "equipment",
      title: "Equipo de sonido defectuoso",
      description: "El equipo de sonido de la sala de spinning presenta problemas. Se solicitó revisión técnica.",
      author: "Carlos Martínez",
      date: "21/04/2026 09:30",
      priority: "high",
      status: "pending"
    },
    {
      id: 4,
      type: "event",
      title: "Clase especial de CrossFit",
      description: "Se organizó una clase especial de CrossFit para el sábado 26/04. Inscripción abierta.",
      author: "Ana López",
      date: "20/04/2026 16:00",
      priority: "low",
      status: "active"
    },
    {
      id: 5,
      type: "maintenance",
      title: "Limpieza profunda vestuarios",
      description: "Programada limpieza profunda de vestuarios para el domingo 27/04. Sede cerrada de 8:00 a 12:00.",
      author: "Juan Pérez",
      date: "20/04/2026 13:00",
      priority: "medium",
      status: "active"
    },
    {
      id: 6,
      type: "incident",
      title: "Alumno accidentado",
      description: "Alumno sufrió leve esguince durante entrenamiento. Se aplicó protocolo de primeros auxilios. Derivado a centro médico.",
      author: "Roberto Silva",
      date: "19/04/2026 18:30",
      priority: "high",
      status: "completed"
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case "high":
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">ALTA</span>;
      case "medium":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">MEDIA</span>;
      default:
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">BAJA</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          Completada
        </span>;
      case "pending":
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
          <Clock className="w-3 h-3" />
          Pendiente
        </span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
          <AlertTriangle className="w-3 h-3" />
          Activa
        </span>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "maintenance": return "🔧";
      case "incident": return "⚠️";
      case "equipment": return "🏋️";
      default: return "📅";
    }
  };

  return (
    <div className="p-8">
      <Link
        to="/encargado"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al dashboard
      </Link>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Novedades Internas</h1>
            <p className="text-gray-500 mt-2">Registro de eventos, incidentes y avisos de la sede</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nueva Novedad
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total del mes</p>
          <p className="text-3xl font-bold text-gray-900">{novedades.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Pendientes</p>
          <p className="text-3xl font-bold text-orange-600">
            {novedades.filter(n => n.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Completadas</p>
          <p className="text-3xl font-bold text-green-600">
            {novedades.filter(n => n.status === "completed").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Prioridad alta</p>
          <p className="text-3xl font-bold text-red-600">
            {novedades.filter(n => n.priority === "high").length}
          </p>
        </div>
      </div>

      {/* New Event Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Registrar Nueva Novedad</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Mantenimiento</option>
                  <option>Incidente</option>
                  <option>Equipamiento</option>
                  <option>Evento</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
              <input
                type="text"
                placeholder="Resumen breve de la novedad..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea
                rows={4}
                placeholder="Descripción detallada del evento o incidente..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Guardar Novedad
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News List */}
      <div className="space-y-4">
        {novedades.map((novedad) => (
          <div key={novedad.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="text-3xl">{getTypeIcon(novedad.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{novedad.title}</h3>
                    {getPriorityBadge(novedad.priority)}
                    {getStatusBadge(novedad.status)}
                  </div>
                  <p className="text-gray-700 mb-3">{novedad.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {novedad.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {novedad.date}
                    </div>
                  </div>
                </div>
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
        ))}
      </div>
    </div>
  );
}
