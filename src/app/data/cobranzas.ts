export type Cobranza = {
  id: number;
  date: string;
  alumno: string;
  amount: number;
  method: string;
  receipt: string;
  plan: string;
  discount: number;
};

export const cobranzas: Cobranza[] = [
  { id: 1, date: "21/04/2026", alumno: "Juan Perez", amount: 850, method: "Efectivo", receipt: "REC-001234", plan: "Musculacion", discount: 85 },
  { id: 2, date: "21/04/2026", alumno: "Maria Gonzalez", amount: 850, method: "Transferencia", receipt: "REC-001233", plan: "Musculacion", discount: 0 },
  { id: 3, date: "20/04/2026", alumno: "Carlos Rodriguez", amount: 1200, method: "Tarjeta", receipt: "REC-001232", plan: "Full Access", discount: 0 },
  { id: 4, date: "20/04/2026", alumno: "Ana Martinez", amount: 850, method: "Efectivo", receipt: "REC-001231", plan: "Musculacion", discount: 85 },
  { id: 5, date: "19/04/2026", alumno: "Pedro Sanchez", amount: 680, method: "Efectivo", receipt: "REC-001230", plan: "Plan Corporativo", discount: 68 },
  { id: 6, date: "18/04/2026", alumno: "Laura Gomez", amount: 850, method: "Transferencia", receipt: "REC-001229", plan: "Musculacion", discount: 0 },
  { id: 7, date: "17/04/2026", alumno: "Diego Fernandez", amount: 1200, method: "Tarjeta", receipt: "REC-001228", plan: "Full Access", discount: 0 },
  { id: 8, date: "16/04/2026", alumno: "Sofia Lopez", amount: 850, method: "Tarjeta", receipt: "REC-001227", plan: "Musculacion", discount: 0 },
  { id: 9, date: "15/04/2026", alumno: "Martin Silva", amount: 850, method: "Efectivo", receipt: "REC-001226", plan: "Musculacion", discount: 85 },
  { id: 10, date: "14/04/2026", alumno: "Valentina Torres", amount: 1200, method: "Transferencia", receipt: "REC-001225", plan: "Full Access", discount: 0 },
  { id: 11, date: "14/04/2026", alumno: "Camila Ruiz", amount: 1200, method: "Transferencia", receipt: "REC-001224", plan: "Full Access", discount: 0 },
];

export function getCobranzaById(id: string | number) {
  const numericId = typeof id === "string" ? Number(id) : id;
  return cobranzas.find((cobranza) => cobranza.id === numericId);
}
