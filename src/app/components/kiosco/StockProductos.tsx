import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Search,
  AlertTriangle,
  CheckCircle,
  Package,
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const criticalStock = products.filter((p) => p.status === "critical").length;
  const warningStock = products.filter((p) => p.status === "warning").length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="p-8">
      <Link
        to="/kiosco"
        className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al kiosco
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Stock de Productos</h1>
        <p className="mt-2 text-gray-500">Consulta y gestiona el inventario del kiosco</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-500">Total productos</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <Package className="h-10 w-10 text-blue-500" />
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-500">Stock crítico</p>
              <p className="text-2xl font-bold text-red-600">{criticalStock}</p>
            </div>
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-500">Advertencias</p>
              <p className="text-2xl font-bold text-orange-600">{warningStock}</p>
            </div>
            <AlertTriangle className="h-10 w-10 text-orange-500" />
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <p className="mb-1 text-sm text-gray-500">Valor total stock</p>
            <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Inventario ({filteredProducts.length})
          </h2>
          <Link
            to="/kiosco/reposicion"
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
          >
            Solicitar Reposición
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Producto</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Categoría</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Precio</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Stock</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Estado</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">${product.price}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${
                        product.status === "critical"
                          ? "bg-red-100 text-red-700"
                          : product.status === "warning"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {product.status === "critical" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                        <AlertTriangle className="h-3 w-3" />
                        CRITICO
                      </span>
                    ) : product.status === "warning" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                        <AlertTriangle className="h-3 w-3" />
                        BAJO
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        <CheckCircle className="h-3 w-3" />
                        OK
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/kiosco/producto/${product.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
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
