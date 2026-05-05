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
  AlertCircle,
} from "lucide-react";
import { membershipPlans, promotions, type MembershipPlan, type Promotion } from "../../data/catalog";

type EditingItem =
  | { kind: "promotion"; value: Promotion }
  | { kind: "plan"; value: MembershipPlan }
  | null;

// Duration options: 1 week to 3 months in week increments
const DURATION_OPTIONS: { label: string; value: string }[] = [
  { label: "1 semana", value: "1 semana" },
  { label: "2 semanas", value: "2 semanas" },
  { label: "3 semanas", value: "3 semanas" },
  { label: "1 mes", value: "Mensual" },
  { label: "5 semanas", value: "5 semanas" },
  { label: "6 semanas", value: "6 semanas" },
  { label: "7 semanas", value: "7 semanas" },
  { label: "2 meses", value: "2 meses" },
  { label: "9 semanas", value: "9 semanas" },
  { label: "10 semanas", value: "10 semanas" },
  { label: "11 semanas", value: "11 semanas" },
  { label: "3 meses", value: "3 meses" },
  { label: "Anual", value: "Anual" },
];

function parseDate(str: string): Date | null {
  const parts = str.split("/");
  if (parts.length !== 3) return null;
  const [dd, mm, yyyy] = parts.map(Number);
  if (!dd || !mm || !yyyy) return null;
  return new Date(yyyy, mm - 1, dd);
}

function isValidDate(str: string): boolean {
  if (!str.match(/^\d{2}\/\d{2}\/\d{4}$/)) return false;
  const d = parseDate(str);
  return d !== null && !isNaN(d.getTime());
}

export default function GestionPromociones() {
  const [activeTab, setActiveTab] = useState("promociones");
  const [promotionsState, setPromotions] = useState<Promotion[]>(promotions);
  const [plans, setPlans] = useState<MembershipPlan[]>(membershipPlans);
  const [editingItem, setEditingItem] = useState<EditingItem>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const monthlyPlanIncome = useMemo(
    () => plans.reduce((sum, plan) => sum + (plan.active ? plan.price * plan.subscribers : 0), 0),
    [plans],
  );

  const totalPromotionUses = useMemo(
    () => promotionsState.reduce((sum, promotion) => sum + promotion.uses, 0),
    [promotionsState],
  );

  const openNewPromotion = () => {
    setFormErrors({});
    setEditingItem({
      kind: "promotion",
      value: { id: Date.now(), name: "", discount: 0, type: "Porcentaje", startDate: "", endDate: "", status: "Activa", uses: 0 },
    });
  };

  const openNewPlan = () => {
    setFormErrors({});
    setEditingItem({
      kind: "plan",
      value: { id: Date.now(), name: "", price: 0, duration: "Mensual", benefits: "", active: true, subscribers: 0 },
    });
  };

  const validatePromotion = (promo: Promotion): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!promo.name.trim()) errors.name = "El nombre es obligatorio";
    if (promo.discount <= 0) errors.discount = "El descuento debe ser mayor a 0";
    if (promo.type === "Porcentaje" && promo.discount > 100)
      errors.discount = "El porcentaje no puede superar 100%";
    if (!isValidDate(promo.startDate)) errors.startDate = "Fecha inválida (dd/mm/aaaa)";
    if (!isValidDate(promo.endDate)) errors.endDate = "Fecha inválida (dd/mm/aaaa)";
    if (isValidDate(promo.startDate) && isValidDate(promo.endDate)) {
      const start = parseDate(promo.startDate)!;
      const end = parseDate(promo.endDate)!;
      if (end <= start) errors.endDate = "La fecha de fin debe ser posterior a la fecha de inicio";
    }
    return errors;
  };

  const validatePlan = (plan: MembershipPlan): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!plan.name.trim()) errors.name = "El nombre es obligatorio";
    if (plan.price <= 0) errors.price = "El precio debe ser mayor a 0";
    if (!plan.benefits.trim()) errors.benefits = "Los beneficios son obligatorios";
    return errors;
  };

  const saveEditingItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingItem) return;

    const errors =
      editingItem.kind === "promotion"
        ? validatePromotion(editingItem.value)
        : validatePlan(editingItem.value);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingItem.kind === "promotion") {
      setPromotions((current) => {
        const exists = current.some((p) => p.id === editingItem.value.id);
        return exists
          ? current.map((p) => (p.id === editingItem.value.id ? editingItem.value : p))
          : [...current, editingItem.value];
      });
    } else {
      setPlans((current) => {
        const exists = current.some((p) => p.id === editingItem.value.id);
        return exists
          ? current.map((p) => (p.id === editingItem.value.id ? editingItem.value : p))
          : [...current, editingItem.value];
      });
    }

    setEditingItem(null);
    setFormErrors({});
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
    setEditingItem((current) =>
      current?.kind === "promotion"
        ? { kind: "promotion", value: { ...current.value, ...changes } }
        : current
    );
    // Clear related errors
    const changedKeys = Object.keys(changes);
    setFormErrors((prev) => {
      const next = { ...prev };
      changedKeys.forEach((k) => delete next[k]);
      // If startDate or endDate changes, also clear endDate error
      if (changedKeys.includes("startDate") || changedKeys.includes("endDate")) {
        delete next.endDate;
      }
      return next;
    });
  };

  const updateEditingPlan = (changes: Partial<MembershipPlan>) => {
    setEditingItem((current) =>
      current?.kind === "plan"
        ? { kind: "plan", value: { ...current.value, ...changes } }
        : current
    );
    const changedKeys = Object.keys(changes);
    setFormErrors((prev) => {
      const next = { ...prev };
      changedKeys.forEach((k) => delete next[k]);
      return next;
    });
  };

  const FieldError = ({ field }: { field: string }) =>
    formErrors[field] ? (
      <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
        <AlertCircle className="h-3 w-3" /> {formErrors[field]}
      </p>
    ) : null;

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
                activeTab === "promociones" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2"><Tag className="w-4 h-4" />Promociones</div>
            </button>
            <button
              onClick={() => setActiveTab("planes")}
              className={`px-4 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "planes" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" />Planes de Membresia</div>
            </button>
          </div>
        </div>

        {activeTab === "promociones" ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">Promociones activas</p>
                <p className="text-2xl font-bold text-blue-700">{promotionsState.filter((p) => p.status === "Activa").length}</p>
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
              <button onClick={openNewPromotion} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4" />Nueva Promocion
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
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${promo.status === "Activa" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                          {promo.status === "Activa" ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {promo.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{promo.uses}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => { setFormErrors({}); setEditingItem({ kind: "promotion", value: promo }); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" aria-label={`Editar ${promo.name}`}>
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => deletePromotion(promo)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" aria-label={`Eliminar ${promo.name}`}>
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
                <p className="text-2xl font-bold text-blue-700">{plans.filter((p) => p.active).length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-600 mb-1">Total suscriptores</p>
                <p className="text-2xl font-bold text-green-700">{plans.reduce((sum, p) => sum + p.subscribers, 0)}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-600 mb-1">Ingreso mensual</p>
                <p className="text-2xl font-bold text-purple-700">${monthlyPlanIncome.toLocaleString("es-AR")}</p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button onClick={openNewPlan} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4" />Nuevo Plan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div key={plan.id} className={`border-2 rounded-xl p-6 ${plan.active ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"}`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${plan.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
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
                    <button onClick={() => { setFormErrors({}); setEditingItem({ kind: "plan", value: plan }); }} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Edit className="w-4 h-4" />Editar
                    </button>
                    <button onClick={() => deletePlan(plan)} className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors" aria-label={`Eliminar ${plan.name}`}>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 overflow-y-auto">
          <form onSubmit={saveEditingItem} noValidate className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl my-4">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingItem.kind === "promotion" ? "Editar promocion" : "Editar plan"}
              </h2>
              <button type="button" onClick={() => { setEditingItem(null); setFormErrors({}); }} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" aria-label="Cerrar">
                <X className="h-5 w-5" />
              </button>
            </div>

            {editingItem.kind === "promotion" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Nombre <span className="text-red-500">*</span>
                    <input
                      required
                      value={editingItem.value.name}
                      onChange={(e) => updateEditingPromotion({ name: e.target.value })}
                      className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.name ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                    />
                  </label>
                  <FieldError field="name" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Descuento <span className="text-red-500">*</span>
                    <input
                      required
                      min="0"
                      max={editingItem.value.type === "Porcentaje" ? "100" : undefined}
                      type="number"
                      value={editingItem.value.discount || ""}
                      onChange={(e) => updateEditingPromotion({ discount: Number(e.target.value) })}
                      className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.discount ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                    />
                  </label>
                  <FieldError field="discount" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Tipo
                    <select
                      value={editingItem.value.type}
                      onChange={(e) => updateEditingPromotion({ type: e.target.value as Promotion["type"] })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Porcentaje">Porcentaje</option>
                      <option value="Monto fijo">Monto fijo</option>
                    </select>
                  </label>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Desde <span className="text-red-500">*</span>
                    <input
                      required
                      type="date"
                      value={editingItem.value.startDate
                        ? (() => { const [d,m,y] = editingItem.value.startDate.split("/"); return y && m && d ? `${y}-${m}-${d}` : ""; })()
                        : ""}
                      onChange={(e) => {
                        if (!e.target.value) { updateEditingPromotion({ startDate: "" }); return; }
                        const [y, m, d] = e.target.value.split("-");
                        updateEditingPromotion({ startDate: `${d}/${m}/${y}` });
                      }}
                      className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.startDate ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                    />
                  </label>
                  <FieldError field="startDate" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Hasta <span className="text-red-500">*</span>
                    <input
                      required
                      type="date"
                      min={editingItem.value.startDate
                        ? (() => { const [d,m,y] = editingItem.value.startDate.split("/"); return y && m && d ? `${y}-${m}-${d}` : ""; })()
                        : ""}
                      value={editingItem.value.endDate
                        ? (() => { const [d,m,y] = editingItem.value.endDate.split("/"); return y && m && d ? `${y}-${m}-${d}` : ""; })()
                        : ""}
                      onChange={(e) => {
                        if (!e.target.value) { updateEditingPromotion({ endDate: "" }); return; }
                        const [y, m, d] = e.target.value.split("-");
                        updateEditingPromotion({ endDate: `${d}/${m}/${y}` });
                      }}
                      className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.endDate ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                    />
                  </label>
                  <FieldError field="endDate" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Estado
                    <select
                      value={editingItem.value.status}
                      onChange={(e) => updateEditingPromotion({ status: e.target.value as Promotion["status"] })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Activa">Activa</option>
                      <option value="Expirada">Expirada</option>
                    </select>
                  </label>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Usos
                    <input
                      min="0"
                      type="number"
                      value={editingItem.value.uses}
                      onChange={(e) => updateEditingPromotion({ uses: Number(e.target.value) })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Nombre <span className="text-red-500">*</span>
                    <input
                      required
                      value={editingItem.value.name}
                      onChange={(e) => updateEditingPlan({ name: e.target.value })}
                      className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.name ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                    />
                  </label>
                  <FieldError field="name" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Precio <span className="text-red-500">*</span>
                    <input
                      required
                      min="1"
                      type="number"
                      value={editingItem.value.price || ""}
                      onChange={(e) => updateEditingPlan({ price: Number(e.target.value) })}
                      className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.price ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                    />
                  </label>
                  <FieldError field="price" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Duración
                    <select
                      value={editingItem.value.duration}
                      onChange={(e) => updateEditingPlan({ duration: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {DURATION_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Beneficios <span className="text-red-500">*</span>
                    <textarea
                      required
                      value={editingItem.value.benefits}
                      onChange={(e) => updateEditingPlan({ benefits: e.target.value })}
                      className={`mt-1 min-h-24 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.benefits ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                    />
                  </label>
                  <FieldError field="benefits" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Suscriptores
                    <input
                      min="0"
                      type="number"
                      value={editingItem.value.subscribers}
                      onChange={(e) => updateEditingPlan({ subscribers: Number(e.target.value) })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Estado
                    <select
                      value={editingItem.value.active ? "active" : "inactive"}
                      onChange={(e) => updateEditingPlan({ active: e.target.value === "active" })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                    </select>
                  </label>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => { setEditingItem(null); setFormErrors({}); }} className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">
                Cancelar
              </button>
              <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
