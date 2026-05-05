export type ClaimStatus = "Pendiente" | "En revision" | "Resuelto";

export type PaymentClaim = {
  id: number;
  alumno: string;
  dni: string;
  reportedDate: string;
  amount: number;
  method: string;
  receipt: string;
  status: ClaimStatus;
};

export const claims: PaymentClaim[] = [
  {
    id: 1,
    alumno: "Laura Fernandez",
    dni: "78901234",
    reportedDate: "22/04/2026",
    amount: 850,
    method: "Transferencia",
    receipt: "Comprobante banco Macro",
    status: "Pendiente",
  },
  {
    id: 2,
    alumno: "Diego Lopez",
    dni: "89012345",
    reportedDate: "20/04/2026",
    amount: 1200,
    method: "QR",
    receipt: "Operacion 80913",
    status: "En revision",
  },
  {
    id: 3,
    alumno: "Roberto Silva",
    dni: "67890123",
    reportedDate: "18/04/2026",
    amount: 850,
    method: "Efectivo",
    receipt: "Ticket caja tarde",
    status: "Resuelto",
  },
];

export function getClaimById(id: string | number) {
  const numericId = typeof id === "string" ? Number(id) : id;
  return claims.find((claim) => claim.id === numericId);
}
