export type PaymentClaim = {
  id: number;
  alumno: string;
  dni: string;
  reportedDate: string;
  amount: number;
  method: string;
  operationNumber: string;
  description: string;
};

export const claims: PaymentClaim[] = [
  {
    id: 1,
    alumno: "Laura Fernandez",
    dni: "78901234",
    reportedDate: "22/04/2026",
    amount: 850,
    method: "Transferencia",
    operationNumber: "OP-739184",
    description: "La alumna informa que la transferencia fue enviada, pero el pago todavia no aparece acreditado en caja.",
  },
  {
    id: 2,
    alumno: "Diego Lopez",
    dni: "89012345",
    reportedDate: "20/04/2026",
    amount: 1200,
    method: "QR",
    operationNumber: "OP-80913",
    description: "El comprobante indica pago por QR, pero falta confirmar la acreditacion en la cuenta bancaria.",
  },
];

export function getClaimById(id: string | number) {
  const numericId = typeof id === "string" ? Number(id) : id;
  return claims.find((claim) => claim.id === numericId);
}
