import { getPlanPrice } from "./catalog";

export type Alumno = {
  id: number;
  name: string;
  dni: string;
  email: string;
  phone: string;
  plan: string;
  monthlyFee: number;
  status: "Al dia" | "Deudor";
  debtAmount: number;
  overdueMonths: number;
  lastPayment: string;
};

export const alumnos: Alumno[] = [
  {
    id: 1,
    name: "Juan Perez",
    dni: "12345678",
    email: "juan.perez@email.com",
    phone: "+54 11 1234-5678",
    plan: "Musculacion",
    monthlyFee: getPlanPrice("Musculacion"),
    status: "Al dia",
    debtAmount: 0,
    overdueMonths: 0,
    lastPayment: "01/04/2026",
  },
  {
    id: 2,
    name: "Maria Gonzalez",
    dni: "23456789",
    email: "maria.gonzalez@email.com",
    phone: "+54 11 2233-4455",
    plan: "Full Access",
    monthlyFee: getPlanPrice("Full Access"),
    status: "Al dia",
    debtAmount: 0,
    overdueMonths: 0,
    lastPayment: "05/04/2026",
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    dni: "34567890",
    email: "carlos.rodriguez@email.com",
    phone: "+54 11 3344-5566",
    plan: "CrossFit",
    monthlyFee: getPlanPrice("CrossFit"),
    status: "Al dia",
    debtAmount: 0,
    overdueMonths: 0,
    lastPayment: "10/04/2026",
  },
  {
    id: 4,
    name: "Ana Martinez",
    dni: "45678901",
    email: "ana.martinez@email.com",
    phone: "+54 11 4455-6677",
    plan: "Natacion",
    monthlyFee: getPlanPrice("Natacion"),
    status: "Al dia",
    debtAmount: 0,
    overdueMonths: 0,
    lastPayment: "15/04/2026",
  },
  {
    id: 5,
    name: "Pedro Sanchez",
    dni: "56789012",
    email: "pedro.sanchez@email.com",
    phone: "+54 11 5566-7788",
    plan: "Musculacion",
    monthlyFee: getPlanPrice("Musculacion"),
    status: "Al dia",
    debtAmount: 0,
    overdueMonths: 0,
    lastPayment: "18/04/2026",
  },
  {
    id: 6,
    name: "Roberto Silva",
    dni: "67890123",
    email: "roberto.silva@email.com",
    phone: "+54 11 3344-6677",
    plan: "Full Access",
    monthlyFee: getPlanPrice("Full Access"),
    status: "Deudor",
    debtAmount: getPlanPrice("Full Access") * 2,
    overdueMonths: 2,
    lastPayment: "15/02/2026",
  },
  {
    id: 7,
    name: "Laura Fernandez",
    dni: "78901234",
    email: "laura.fernandez@email.com",
    phone: "+54 11 9988-7766",
    plan: "Musculacion",
    monthlyFee: getPlanPrice("Musculacion"),
    status: "Deudor",
    debtAmount: 850,
    overdueMonths: 1,
    lastPayment: "20/03/2026",
  },
  {
    id: 8,
    name: "Diego Lopez",
    dni: "89012345",
    email: "diego.lopez@email.com",
    phone: "+54 11 2211-4433",
    plan: "CrossFit",
    monthlyFee: getPlanPrice("CrossFit"),
    status: "Deudor",
    debtAmount: getPlanPrice("CrossFit") * 3,
    overdueMonths: 3,
    lastPayment: "10/01/2026",
  },
];

export function getAlumnoById(id: string | number) {
  const numericId = typeof id === "string" ? Number(id) : id;
  return alumnos.find((alumno) => alumno.id === numericId);
}

export function getAlumnosDeudores() {
  return alumnos.filter((alumno) => alumno.status === "Deudor");
}
