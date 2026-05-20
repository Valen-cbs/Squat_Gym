import { useState } from "react";
import { Link } from "react-router";
import {
  Plus,
  Search,
  Package,
} from "lucide-react";
import { kioskProducts } from "../../data/catalog";
import ProductArtwork from "./ProductArtwork";

export default function StockProductos() {
  const [searchTerm, setSearchTerm] = useState("");
  const products = kioskProducts;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStock = products.filter((product) => product.stock <= product.minStock).length;

  return (
    <div className="app-page">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="mt-2 text-gray-500">Consulta y gestiona el inventario del kiosco.</p>
        </div>
        <Link
          to="/kiosco/producto/nuevo"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="mb-1 text-sm text-gray-500">Total productos</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <Package className="h-8 w-8 shrink-0 text-blue-500 sm:h-10 sm:w-10" />
          </div>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="mb-1 text-sm text-red-700">Bajo</p>
              <p className="text-2xl font-bold text-red-700">{lowStock}</p>
            </div>
            <Package className="h-8 w-8 shrink-0 text-red-500 sm:h-10 sm:w-10" />
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Inventario ({filteredProducts.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Producto</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Categoria</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Precio</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Stock</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Accion</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const needsRestock = product.stock <= product.minStock;

                return (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        <ProductArtwork product={product} />
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">${product.price}</td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${
                          needsRestock ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <Link
                          to={`/kiosco/producto/${product.id}`}
                          className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          Ver detalle
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
