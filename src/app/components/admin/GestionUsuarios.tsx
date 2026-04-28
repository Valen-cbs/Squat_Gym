import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  UserPlus,
  Search,
  Shield,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function GestionUsuarios() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const users = [
    { id: 1, name: "Juan Pérez", email: "juan.perez@squatgym.com", role: "Administrador", sede: "Central", status: "Activo", lastLogin: "21/04/2026 14:30" },
    { id: 2, name: "María González", email: "maria.gonzalez@squatgym.com", role: "Secretaría", sede: "Central", status: "Activo", lastLogin: "21/04/2026 13:15" },
    { id: 3, name: "Carlos Rodríguez", email: "carlos.rodriguez@squatgym.com", role: "Secretaría", sede: "Norte", status: "Activo", lastLogin: "21/04/2026 09:45" },
    { id: 4, name: "Ana Martínez", email: "ana.martinez@squatgym.com", role: "Instructor", sede: "Central", status: "Activo", lastLogin: "20/04/2026 18:20" },
    { id: 5, name: "Pedro Sánchez", email: "pedro.sanchez@squatgym.com", role: "Secretaría", sede: "Sur", status: "Activo", lastLogin: "21/04/2026 10:00" },
    { id: 6, name: "Laura Fernández", email: "laura.fernandez@squatgym.com", role: "Instructor", sede: "Norte", status: "Activo", lastLogin: "19/04/2026 16:30" },
    { id: 7, name: "Diego López", email: "diego.lopez@squatgym.com", role: "Mantenimiento", sede: "Sur", status: "Inactivo", lastLogin: "15/04/2026 12:00" },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const roleColors: { [key: string]: string } = {
    "Administrador": "bg-red-100 text-red-700",
    "Secretaría": "bg-blue-100 text-blue-700",
    "Instructor": "bg-green-100 text-green-700",
    "Mantenimiento": "bg-gray-100 text-gray-700"
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
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
        <p className="text-gray-500 mt-2">Administrar usuarios y sus permisos en el sistema</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total usuarios</p>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Usuarios activos</p>
          <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === "Activo").length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Administradores</p>
          <p className="text-2xl font-bold text-red-600">{users.filter(u => u.role === "Administrador").length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Usuarios inactivos</p>
          <p className="text-2xl font-bold text-orange-600">{users.filter(u => u.status === "Inactivo").length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los roles</option>
            <option value="Administrador">Administrador</option>
            <option value="Secretaría">Secretaría</option>
            <option value="Instructor">Instructor</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
        </div>
      </div>

      {/* New User Button */}
      <div className="mb-4 flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="w-4 h-4" />
          Nuevo Usuario
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Usuario</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Email</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Rol</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Sede</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Último acceso</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-blue-600">{user.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                      <Shield className="w-3 h-3" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.sede}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "Activo" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {user.status === "Activo" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-4">
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
    </div>
  );
}
