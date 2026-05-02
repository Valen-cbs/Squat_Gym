import { Link, useParams } from "react-router";
import { Package, AlertTriangle, Plus } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { hasPermission } from "../../permissions";
<<<<<<< HEAD
import { getProductById } from "../../data/catalog";
=======
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a

export default function DetalleProducto() {
  const { user } = useUser();
  const { id } = useParams();
  const canCreateRestockOrder = hasPermission(user?.role, "kiosk.createRestockOrder");

<<<<<<< HEAD
  const product = getProductById(id ?? 1) ?? getProductById(1)!;
=======
  const product = {
    id,
    name: "Bebida Isotonica",
    category: "Bebidas",
    price: 60,
    cost: 35,
    stock: 3,
    minStock: 10,
    supplier: "Distribuidora Deportiva SA",
    barcode: "7790123456789",
    status: "critical",
  };
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Detalle de producto</h1>
        <p className="mt-2 text-gray-500">Informacion principal del producto y su estado actual.</p>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-gray-500">{product.category}</p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
              product.status === "critical"
                ? "bg-red-100 text-red-700"
<<<<<<< HEAD
                : product.status === "warning"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-green-100 text-green-700"
=======
                : "bg-green-100 text-green-700"
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
            }`}
          >
            {product.status === "critical" ? (
              <AlertTriangle className="h-5 w-5" />
            ) : (
              <Package className="h-5 w-5" />
            )}
<<<<<<< HEAD
            {product.status === "critical" ? "STOCK CRITICO" : product.status === "warning" ? "STOCK BAJO" : "STOCK OK"}
=======
            {product.status === "critical" ? "STOCK CRITICO" : "STOCK OK"}
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="mb-1 text-sm text-gray-500">Precio de venta</p>
            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="mb-1 text-sm text-gray-500">Costo</p>
            <p className="text-2xl font-bold text-gray-900">${product.cost}</p>
          </div>
          <div className={`rounded-lg p-4 ${product.stock < product.minStock ? "bg-red-50" : "bg-blue-50"}`}>
            <p className="mb-1 text-sm text-gray-500">Stock actual</p>
            <p className={`text-2xl font-bold ${product.stock < product.minStock ? "text-red-700" : "text-blue-700"}`}>
              {product.stock} unidades
            </p>
          </div>
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

      {canCreateRestockOrder ? (
        <div className="mb-6">
          <Link
            to={`/kiosco/reposicion?productId=${product.id}`}
            className="flex items-center justify-center gap-3 rounded-lg bg-orange-600 p-4 text-white transition-colors hover:bg-orange-700"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Generar reposicion</span>
          </Link>
        </div>
      ) : (
        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          Vista de consulta: los pedidos de reposicion quedan asignados al encargado.
        </div>
      )}
    </div>
  );
}
