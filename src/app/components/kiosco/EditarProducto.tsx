import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, Save } from "lucide-react";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "Bebida Isotonica",
    category: "Bebidas",
    price: "60",
    cost: "35",
    stock: "3",
    minStock: "10",
    maxStock: "50",
    supplier: "Distribuidora Deportiva SA",
    barcode: "7790123456789",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/kiosco/producto/${id}`);
  };

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Editar producto</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">Actualiza los datos comerciales y de stock del producto.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="app-panel p-5 sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Informacion general</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Categoria</label>
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Bebidas">Bebidas</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Suplementos">Suplementos</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Codigo de barras</label>
                <input
                  value={form.barcode}
                  onChange={(e) => updateField("barcode", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Precio de venta</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Costo</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.cost}
                  onChange={(e) => updateField("cost", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Stock actual</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(e) => updateField("stock", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Proveedor</label>
                <input
                  value={form.supplier}
                  onChange={(e) => updateField("supplier", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="app-panel p-5 sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Politica de stock</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Stock minimo</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.minStock}
                  onChange={(e) => updateField("minStock", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Stock maximo</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.maxStock}
                  onChange={(e) => updateField("maxStock", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="app-panel p-5 sm:p-6 lg:sticky lg:top-8">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Resumen</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Producto</span>
                <span className="font-medium text-gray-900">{form.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Categoria</span>
                <span className="font-medium text-gray-900">{form.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Precio</span>
                <span className="font-medium text-gray-900">${form.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Stock</span>
                <span className="font-medium text-gray-900">{form.stock} u.</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Save className="h-5 w-5" />
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
