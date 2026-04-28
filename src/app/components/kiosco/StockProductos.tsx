import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Search,
  AlertTriangle,
  CheckCircle,
  Package,
  Edit
} from "lucide-react";

export default function StockProductos() {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: 1, name: "Bebida Isotónica", category: "Bebidas", price: 60, stock: 15, minStock: 10, status: "ok" },
    { id: 2, name: "Barrita Proteica", category: "Suplementos", price: 70, stock: 22, minStock: 15, status: "ok" },
    { id: 3, name: "Agua Mineral", category: "Bebidas", price: 30, stock: 35, minStock: 20, status: "ok" },
    { id: 4, name: "Batido de Proteína", category: "Suplementos", price: 80, stock: 18, minStock: 12, status: "ok" },
    { id: 5, name: "Snack Saludable", category: "Alimentos", price: 40, stock: 28, minStock: 15, status: "ok" },
    { id: 6, name: "Bebida Energética", category: "Bebidas", price: 65, stock: 3, minStock: 10, status: "critical" },
    { id: 7, name: "Toalla Deportiva", category: "Accesorios", price: 150, stock: 2, minStock: 5, status: "critical" },
    { id: 8, name: "Guantes de Entrenamiento", category: "Accesorios", price: 250, stock: 6, minStock: 8, status: "warning" },
    { id: 9, name: "Shaker", category: "Accesorios", price: 120, stock: 15, minStock: 8, status: "ok" },
    { id: 10, name: "Creatina", category: "Suplementos", price: 180, stock: 12, minStock: 8, status: "ok" },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const criticalStock = products.filter(p => p.status === "critical").length;
  const warningStock = products.filter(p => p.status === "warning").length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="p-8">
      <Link
        to="/kiosco"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al kiosco
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Stock de Productos</h1>
        <p className="text-gray-500 mt-2">Consulta y gestiona el inventario del kiosco</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total productos</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <Package className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Stock crítico</p>
              <p className="text-2xl font-bold text-red-600">{criticalStock}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Advertencias</p>
              <p className="text-2xl font-bold text-orange-600">{warningStock}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div>
            <p className="text-sm text-gray-500 mb-1">Valor total stock</p>
            <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Inventario ({filteredProducts.length})
          </h2>
          <Link
            to="/kiosco/reposicion"
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
          >
            Solicitar Reposición
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Producto</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Categoría</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Precio</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Stock</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Mínimo</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">${product.price}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                      product.status === "critical"
                        ? "bg-red-100 text-red-700"
                        : product.status === "warning"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-600">{product.minStock}</td>
                  <td className="px-6 py-4 text-center">
                    {product.status === "critical" ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <AlertTriangle className="w-3 h-3" />
                        CRÍTICO
                      </span>
                    ) : product.status === "warning" ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                        <AlertTriangle className="w-3 h-3" />
                        BAJO
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3" />
                        OK
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/kiosco/producto/${product.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                    >
                      Ver detalle
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
