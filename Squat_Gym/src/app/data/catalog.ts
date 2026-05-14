export type ProductStatus = "ok" | "warning" | "critical";

export type KioskProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  supplier: string;
  barcode: string;
  status: ProductStatus;
};

export type Promotion = {
  id: number;
  name: string;
  discount: number;
  type: "Porcentaje" | "Monto fijo";
  startDate: string;
  endDate: string;
  status: "Activa" | "Expirada";
  uses: number;
};

export type MembershipPlan = {
  id: number;
  name: string;
  price: number;
  duration: string;
  benefits: string;
  active: boolean;
  subscribers: number;
};

export const kioskProducts: KioskProduct[] = [
  { id: 1, name: "Bebida Isotonica", category: "Bebidas", price: 60, cost: 35, stock: 15, minStock: 10, supplier: "Distribuidora Deportiva SA", barcode: "7790123456789", status: "ok" },
  { id: 2, name: "Barrita Proteica", category: "Suplementos", price: 70, cost: 42, stock: 22, minStock: 15, supplier: "NutriFit Mayorista", barcode: "7790123456790", status: "ok" },
  { id: 3, name: "Agua Mineral", category: "Bebidas", price: 30, cost: 18, stock: 35, minStock: 20, supplier: "Distribuidora Deportiva SA", barcode: "7790123456791", status: "ok" },
  { id: 4, name: "Batido de Proteina", category: "Suplementos", price: 80, cost: 48, stock: 18, minStock: 12, supplier: "NutriFit Mayorista", barcode: "7790123456792", status: "ok" },
  { id: 5, name: "Snack Saludable", category: "Alimentos", price: 40, cost: 24, stock: 28, minStock: 15, supplier: "Healthy Snacks SRL", barcode: "7790123456793", status: "ok" },
  { id: 6, name: "Bebida Energetica", category: "Bebidas", price: 65, cost: 39, stock: 3, minStock: 10, supplier: "Distribuidora Deportiva SA", barcode: "7790123456794", status: "critical" },
  { id: 7, name: "Toalla Deportiva", category: "Accesorios", price: 150, cost: 90, stock: 2, minStock: 5, supplier: "Accesorios Gym Pro", barcode: "7790123456795", status: "critical" },
  { id: 8, name: "Guantes de Entrenamiento", category: "Accesorios", price: 250, cost: 150, stock: 6, minStock: 8, supplier: "Accesorios Gym Pro", barcode: "7790123456796", status: "warning" },
  { id: 9, name: "Shaker", category: "Accesorios", price: 120, cost: 72, stock: 15, minStock: 8, supplier: "Accesorios Gym Pro", barcode: "7790123456797", status: "ok" },
  { id: 10, name: "Creatina", category: "Suplementos", price: 180, cost: 108, stock: 12, minStock: 8, supplier: "NutriFit Mayorista", barcode: "7790123456798", status: "ok" },
];

export const promotions: Promotion[] = [
  { id: 1, name: "2x1 Verano", discount: 50, type: "Porcentaje", startDate: "01/12/2025", endDate: "28/02/2026", status: "Activa", uses: 45 },
  { id: 2, name: "Pago Anual", discount: 15, type: "Porcentaje", startDate: "01/01/2026", endDate: "31/12/2026", status: "Activa", uses: 23 },
  { id: 3, name: "Referido Amigo", discount: 150, type: "Monto fijo", startDate: "01/01/2026", endDate: "31/12/2026", status: "Activa", uses: 67 },
  { id: 4, name: "Black Friday", discount: 30, type: "Porcentaje", startDate: "20/11/2025", endDate: "30/11/2025", status: "Expirada", uses: 89 },
  { id: 5, name: "Estudiantes", discount: 10, type: "Porcentaje", startDate: "01/03/2026", endDate: "31/12/2026", status: "Activa", uses: 34 },
];

export const membershipPlans: MembershipPlan[] = [
  { id: 1, name: "Musculacion", price: 850, duration: "Mensual", benefits: "Acceso a sala de musculacion", active: true, subscribers: 165 },
  { id: 2, name: "Full Access", price: 1200, duration: "Mensual", benefits: "Acceso completo + clases", active: true, subscribers: 142 },
  { id: 3, name: "CrossFit", price: 1500, duration: "Mensual", benefits: "Box CrossFit + entrenador", active: true, subscribers: 78 },
  { id: 4, name: "Natacion", price: 950, duration: "Mensual", benefits: "Pileta + clases de natacion", active: true, subscribers: 56 },
  { id: 5, name: "Plan Anual", price: 8500, duration: "Anual", benefits: "Full Access - 15% descuento", active: true, subscribers: 23 },
  { id: 6, name: "Plan Corporativo", price: 750, duration: "Mensual", benefits: "Full Access empresas", active: false, subscribers: 12 },
];

export function getProductById(id: string | number) {
  const numericId = typeof id === "string" ? Number(id) : id;
  return kioskProducts.find((product) => product.id === numericId);
}

export function getPlanByName(name: string) {
  return membershipPlans.find((plan) => plan.name === name);
}

export function getPlanPrice(name: string) {
  return getPlanByName(name)?.price ?? 0;
}

export function getSuggestedRestockQuantity(product: Pick<KioskProduct, "minStock">) {
  return product.minStock * 2;
}
