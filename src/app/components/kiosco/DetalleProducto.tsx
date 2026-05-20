import { Link, useParams } from "react-router";
import { Edit, Plus } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { hasPermission } from "../../permissions";
import { getProductById } from "../../data/catalog";
import ProductArtwork from "./ProductArtwork";

export default function DetalleProducto() {
  const { user } = useUser();
  const { id } = useParams();
  const canCreateRestockOrder = hasPermission(user?.role, "kiosk.createRestockOrder");

  const product = getProductById(id ?? 1) ?? getProductById(1)!;
  const needsRestock = product.stock <= product.minStock;

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Detalle de producto</h1>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <ProductArtwork product={product} size="lg" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-gray-500">{product.category}</p>
            </div>
          </div>
          <Link
            to={`/kiosco/producto/${product.id}/editar`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Edit className="h-4 w-4" />
            Editar
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <label className="rounded-lg bg-gray-50 p-4">
            <span className="mb-1 block text-sm text-gray-500">Precio de venta</span>
            <input
              type="number"
              min="0"
              step="1"
              defaultValue={product.price}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="rounded-lg bg-gray-50 p-4">
            <span className="mb-1 block text-sm text-gray-500">Costo</span>
            <input
              type="number"
              min="0"
              step="1"
              defaultValue={product.cost}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className={`rounded-lg p-4 ${needsRestock ? "bg-red-50" : "bg-gray-50"}`}>
            <span className="mb-1 block text-sm text-gray-500">Stock actual</span>
            <input
              type="number"
              min="0"
              step="1"
              defaultValue={product.stock}
              className={`w-full rounded-lg border px-3 py-2 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                needsRestock
                  ? "border-red-200 bg-white text-red-700"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
          </label>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Stock minimo</p>
            <p className="font-medium text-gray-900">{product.minStock} unidades</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Proveedor</p>
            <p className="font-medium text-gray-900">{product.supplier}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Codigo de barras</p>
            <p className="font-medium text-gray-900">{product.barcode}</p>
          </div>
        </div>
      </div>

      {canCreateRestockOrder && (
        <div className="mb-6">
          <Link
            to="/encargado/reposicion?modo=automatico"
            className="flex items-center justify-center gap-3 rounded-lg bg-orange-600 p-4 text-white transition-colors hover:bg-orange-700"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Generar reposicion</span>
          </Link>
        </div>
      )}
    </div>
  );
}
