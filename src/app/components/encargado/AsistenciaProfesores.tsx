import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  UserCheck,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

export default function AsistenciaProfesores() {
  const [selectedDate, setSelectedDate] = useState("2026-04-21");

  const profesores = [
    { id: 1, name: "María González", specialty: "CrossFit", shift: "Mañana", entry: "08:00", status: "present", schedule: "08:00 - 14:00" },
    { id: 2, name: "Carlos Martínez", specialty: "Musculación", shift: "Mañana", entry: "08:15", status: "present", schedule: "08:00 - 14:00" },
    { id: 3, name: "Ana López", specialty: "Natación", shift: "Mañana", entry: "09:00", status: "present", schedule: "09:00 - 15:00" },
    { id: 4, name: "Roberto Silva", specialty: "Yoga", shift: "Tarde", entry: "14:05", status: "late", schedule: "14:00 - 20:00" },
    { id: 5, name: "Laura Fernández", specialty: "Spinning", shift: "Tarde", entry: "15:00", status: "present", schedule: "15:00 - 21:00" },
    { id: 6, name: "Diego Ruiz", specialty: "Funcional", shift: "Tarde", entry: "16:00", status: "present", schedule: "16:00 - 22:00" },
    { id: 7, name: "Sofía Castro", specialty: "Pilates", shift: "Mañana", entry: null, status: "absent", schedule: "10:00 - 16:00" },
    { id: 8, name: "Martín Torres", specialty: "Boxeo", shift: "Tarde", entry: "18:00", status: "present", schedule: "18:00 - 22:00" },
  ];

  const attendanceStats = {
    present: profesores.filter(p => p.status === "present").length,
    late: profesores.filter(p => p.status === "late").length,
    absent: profesores.filter(p => p.status === "absent").length,
    total: profesores.length
  };

  const attendancePercentage = Math.round((attendanceStats.present / attendanceStats.total) * 100);

  const weeklyAttendance = [
    { day: "Lun", date: "14/04", present: 8, total: 8 },
    { day: "Mar", date: "15/04", present: 7, total: 8 },
    { day: "Mié", date: "16/04", present: 8, total: 8 },
    { day: "Jue", date: "17/04", present: 8, total: 8 },
    { day: "Vie", date: "18/04", present: 7, total: 8 },
    { day: "Sáb", date: "19/04", present: 6, total: 8 },
    { day: "Dom", date: "20/04", present: 5, total: 8 },
  ];

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
        <h1 className="text-3xl font-bold text-gray-900">Control de Asistencia de Profesores</h1>
        <p className="text-gray-500 mt-2">Registro y seguimiento del personal docente</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Presentes</p>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">{attendanceStats.present}</p>
          <p className="text-xs text-gray-500 mt-1">de {attendanceStats.total} profesores</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Tardanzas</p>
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-600">{attendanceStats.late}</p>
          <p className="text-xs text-gray-500 mt-1">hoy</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Ausentes</p>
            <XCircle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">{attendanceStats.absent}</p>
          <p className="text-xs text-gray-500 mt-1">hoy</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Asistencia</p>
            <UserCheck className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{attendancePercentage}%</p>
          <p className="text-xs text-gray-500 mt-1">del personal</p>
        </div>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">
            Mostrando asistencia del {new Date(selectedDate).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Registro de Hoy</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Profesor</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Especialidad</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Turno</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Horario</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Entrada</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
              </tr>
            </thead>
            <tbody>
              {profesores.map((prof) => (
                <tr key={prof.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-blue-600">{prof.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-gray-900">{prof.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{prof.specialty}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{prof.shift}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {prof.schedule}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {prof.entry || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {prof.status === "present" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3" />
                        Presente
                      </span>
                    )}
                    {prof.status === "late" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                        <AlertTriangle className="w-3 h-3" />
                        Tarde
                      </span>
                    )}
                    {prof.status === "absent" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <XCircle className="w-3 h-3" />
                        Ausente
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Resumen Semanal</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-7 gap-4">
            {weeklyAttendance.map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-gray-500 mb-2">{day.day}</p>
                <p className="text-xs text-gray-400 mb-2">{day.date}</p>
                <div className={`w-full h-24 rounded-lg flex flex-col items-center justify-center ${
                  day.present === day.total ? "bg-green-100" : day.present >= day.total - 1 ? "bg-yellow-100" : "bg-orange-100"
                }`}>
                  <p className="text-2xl font-bold text-gray-900">{day.present}</p>
                  <p className="text-xs text-gray-600">de {day.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
