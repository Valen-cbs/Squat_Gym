import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Save } from "lucide-react";

export default function NuevoProducto() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    cost: "",
    stock: "",
    minStock: "",
    supplier: "",
    barcode: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/kiosco/stock");
  };

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Nuevo producto</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="app-panel p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Plus className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Datos del producto</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Categoria</label>
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar categoria</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Alimentos">Alimentos</option>
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
                  required
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
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Stock inicial</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(e) => updateField("stock", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Stock minimo recomendado</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.minStock}
                  onChange={(e) => updateField("minStock", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">Proveedor</label>
                <input
                  value={form.supplier}
                  onChange={(e) => updateField("supplier", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="app-panel p-5 sm:p-6 lg:sticky lg:top-8">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Resumen</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between gap-3">
                <span>Producto</span>
                <span className="text-right font-medium text-gray-900">{form.name || "-"}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Categoria</span>
                <span className="text-right font-medium text-gray-900">{form.category || "-"}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Precio</span>
                <span className="font-medium text-gray-900">{form.price ? `$${form.price}` : "-"}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Stock inicial</span>
                <span className="font-medium text-gray-900">{form.stock || "-"} u.</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Save className="h-5 w-5" />
              Agregar producto
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}
