import { FormEvent, useMemo, useState } from "react";
import {
  Plus,
  Tag,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  Percent,
  X,
} from "lucide-react";
import { membershipPlans, promotions, type MembershipPlan, type Promotion } from "../../data/catalog";

type EditingItem =
  | { kind: "promotion"; value: Promotion }
  | { kind: "plan"; value: MembershipPlan }
  | null;

export default function GestionPromociones() {
  const [activeTab, setActiveTab] = useState("promociones");
  const [promotionsState, setPromotions] = useState<Promotion[]>(promotions);
  const [plans, setPlans] = useState<MembershipPlan[]>(membershipPlans);
  const [editingItem, setEditingItem] = useState<EditingItem>(null);

  const monthlyPlanIncome = useMemo(
    () => plans.reduce((sum, plan) => sum + (plan.active ? plan.price * plan.subscribers : 0), 0),
    [plans],
  );

  const totalPromotionUses = useMemo(
    () => promotionsState.reduce((sum, promotion) => sum + promotion.uses, 0),
    [promotionsState],
  );

  const openNewPromotion = () => {
    setEditingItem({
      kind: "promotion",
      value: {
        id: Date.now(),
        name: "",
        discount: 0,
        type: "Porcentaje",
        startDate: "",
        endDate: "",
        status: "Activa",
        uses: 0,
      },
    });
  };

  const openNewPlan = () => {
    setEditingItem({
      kind: "plan",
      value: {
        id: Date.now(),
        name: "",
        price: 0,
        duration: "Mensual",
        benefits: "",
        active: true,
        subscribers: 0,
      },
    });
  };

  const saveEditingItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingItem) {
      return;
    }

    if (editingItem.kind === "promotion") {
      setPromotions((current) => {
        const exists = current.some((promotion) => promotion.id === editingItem.value.id);
        return exists
          ? current.map((promotion) => promotion.id === editingItem.value.id ? editingItem.value : promotion)
          : [...current, editingItem.value];
      });
    } else {
      setPlans((current) => {
        const exists = current.some((plan) => plan.id === editingItem.value.id);
        return exists
          ? current.map((plan) => plan.id === editingItem.value.id ? editingItem.value : plan)
          : [...current, editingItem.value];
      });
    }

    setEditingItem(null);
  };

  const deletePromotion = (promotion: Promotion) => {
    if (window.confirm(`Eliminar la promocion "${promotion.name}"?`)) {
      setPromotions((current) => current.filter((item) => item.id !== promotion.id));
    }
  };

  const deletePlan = (plan: MembershipPlan) => {
    if (window.confirm(`Eliminar el plan "${plan.name}"?`)) {
      setPlans((current) => current.filter((item) => item.id !== plan.id));
    }
  };

  const updateEditingPromotion = (changes: Partial<Promotion>) => {
    setEditingItem((current) => current?.kind === "promotion"
      ? { kind: "promotion", value: { ...current.value, ...changes } }
      : current);
  };

  const updateEditingPlan = (changes: Partial<MembershipPlan>) => {
    setEditingItem((current) => current?.kind === "plan"
      ? { kind: "plan", value: { ...current.value, ...changes } }
      : current);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Promociones y Planes</h1>
        <p className="text-gray-500 mt-2">Gestionar promociones especiales y planes de membresia</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab("promociones")}
              className={`px-4 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "promociones"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Promociones
              </div>
            </button>
            <button
              onClick={() => setActiveTab("planes")}
              className={`px-4 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "planes"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Planes de Membresia
              </div>
            </button>
          </div>
        </div>

        {activeTab === "promociones" ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">Promociones activas</p>
                <p className="text-2xl font-bold text-blue-700">{promotionsState.filter((promotion) => promotion.status === "Activa").length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-600 mb-1">Total usos</p>
                <p className="text-2xl font-bold text-green-700">{totalPromotionUses}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-600 mb-1">Promociones cargadas</p>
                <p className="text-2xl font-bold text-purple-700">{promotionsState.length}</p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button
                onClick={openNewPromotion}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nueva Promocion
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Nombre</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Descuento</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Tipo</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Vigencia</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Estado</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Usos</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {promotionsState.map((promo) => (
                    <tr key={promo.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-900">{promo.name}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 text-green-600 font-bold">
                          <Percent className="w-4 h-4" />
                          {promo.discount}{promo.type === "Porcentaje" ? "%" : "$"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{promo.type}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {promo.startDate} - {promo.endDate}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                          promo.status === "Activa" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}>
                          {promo.status === "Activa" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {promo.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{promo.uses}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingItem({ kind: "promotion", value: promo })}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            aria-label={`Editar ${promo.name}`}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deletePromotion(promo)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label={`Eliminar ${promo.name}`}
                          >
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
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">Planes activos</p>
                <p className="text-2xl font-bold text-blue-700">{plans.filter((plan) => plan.active).length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-600 mb-1">Total suscriptores</p>
                <p className="text-2xl font-bold text-green-700">{plans.reduce((sum, plan) => sum + plan.subscribers, 0)}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-600 mb-1">Ingreso mensual</p>
                <p className="text-2xl font-bold text-purple-700">${monthlyPlanIncome.toLocaleString("es-AR")}</p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button
                onClick={openNewPlan}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nuevo Plan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div key={plan.id} className={`border-2 rounded-xl p-6 ${
                  plan.active ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      plan.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {plan.active ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-blue-600">${plan.price}</p>
                    <p className="text-sm text-gray-600">{plan.duration}</p>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">{plan.benefits}</p>
                  <div className="pt-4 border-t border-gray-200 mb-4">
                    <p className="text-sm text-gray-500">Suscriptores</p>
                    <p className="text-2xl font-bold text-gray-900">{plan.subscribers}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingItem({ kind: "plan", value: plan })}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => deletePlan(plan)}
                      className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                      aria-label={`Eliminar ${plan.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <form onSubmit={saveEditingItem} className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingItem.kind === "promotion" ? "Editar promocion" : "Editar plan"}
              </h2>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {editingItem.kind === "promotion" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2 text-sm font-medium text-gray-700">
                  Nombre
                  <input
                    required
                    value={editingItem.value.name}
                    onChange={(event) => updateEditingPromotion({ name: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Descuento
                  <input
                    required
                    min="0"
                    type="number"
                    value={editingItem.value.discount}
                    onChange={(event) => updateEditingPromotion({ discount: Number(event.target.value) })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Tipo
                  <select
                    value={editingItem.value.type}
                    onChange={(event) => updateEditingPromotion({ type: event.target.value as Promotion["type"] })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Porcentaje">Porcentaje</option>
                    <option value="Monto fijo">Monto fijo</option>
                  </select>
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Desde
                  <input
                    required
                    value={editingItem.value.startDate}
                    onChange={(event) => updateEditingPromotion({ startDate: event.target.value })}
                    placeholder="dd/mm/aaaa"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Hasta
                  <input
                    required
                    value={editingItem.value.endDate}
                    onChange={(event) => updateEditingPromotion({ endDate: event.target.value })}
                    placeholder="dd/mm/aaaa"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Estado
                  <select
                    value={editingItem.value.status}
                    onChange={(event) => updateEditingPromotion({ status: event.target.value as Promotion["status"] })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Activa">Activa</option>
                    <option value="Expirada">Expirada</option>
                  </select>
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Usos
                  <input
                    min="0"
                    type="number"
                    value={editingItem.value.uses}
                    onChange={(event) => updateEditingPromotion({ uses: Number(event.target.value) })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2 text-sm font-medium text-gray-700">
                  Nombre
                  <input
                    required
                    value={editingItem.value.name}
                    onChange={(event) => updateEditingPlan({ name: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Precio
                  <input
                    required
                    min="0"
                    type="number"
                    value={editingItem.value.price}
                    onChange={(event) => updateEditingPlan({ price: Number(event.target.value) })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Duracion
                  <input
                    required
                    value={editingItem.value.duration}
                    onChange={(event) => updateEditingPlan({ duration: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="sm:col-span-2 text-sm font-medium text-gray-700">
                  Beneficios
                  <textarea
                    required
                    value={editingItem.value.benefits}
                    onChange={(event) => updateEditingPlan({ benefits: event.target.value })}
                    className="mt-1 min-h-24 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Suscriptores
                  <input
                    min="0"
                    type="number"
                    value={editingItem.value.subscribers}
                    onChange={(event) => updateEditingPlan({ subscribers: Number(event.target.value) })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Estado
                  <select
                    value={editingItem.value.active ? "active" : "inactive"}
                    onChange={(event) => updateEditingPlan({ active: event.target.value === "active" })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </label>
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
