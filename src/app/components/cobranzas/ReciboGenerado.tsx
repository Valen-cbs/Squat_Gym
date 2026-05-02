import { Link, useLocation, useParams } from "react-router";
import { CheckCircle, Download, Printer, Send } from "lucide-react";
import PaymentReceipt from "../PaymentReceipt";

export default function ReciboGenerado() {
  const { id } = useParams();
  const location = useLocation();
  const paymentState = location.state as
    | {
        alumno?: { name: string; dni?: string; plan: string };
        payment?: { amount: number; method: string; discount: number; total: number };
      }
    | undefined;

  const receipt = {
    id,
    number: "REC-001234",
    date: new Date().toLocaleDateString("es-AR"),
    time: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
    alumno: {
      name: paymentState?.alumno?.name || "Juan Perez",
      dni: paymentState?.alumno?.dni || "12345678",
      plan: paymentState?.alumno?.plan || "Musculacion",
    },
    payment: {
      amount: paymentState?.payment?.amount ?? 850,
      method: paymentState?.payment?.method || "Efectivo",
      discount: paymentState?.payment?.discount ?? 85,
      total: paymentState?.payment?.total ?? 765,
    },
    attendedBy: "Secretaria: Malena Trangoni",
  };

  return (
    <div className="app-page">
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-success-medium bg-success-light p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70">
          <CheckCircle className="h-6 w-6 text-success-dark" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-success-dark">Pago registrado exitosamente</h2>
          <p className="text-success-dark">El comprobante esta listo para imprimir, descargar o enviar.</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <button className="flex items-center justify-center gap-3 rounded-lg bg-indigo-primary p-4 text-white transition-colors hover:opacity-90">
          <Printer className="h-5 w-5" />
          <span className="font-medium">Imprimir</span>
        </button>
        <button className="flex items-center justify-center gap-3 rounded-lg bg-indigo-primary p-4 text-white transition-colors hover:opacity-90">
          <Download className="h-5 w-5" />
          <span className="font-medium">Descargar PDF</span>
        </button>
        <button className="flex items-center justify-center gap-3 rounded-lg bg-indigo-primary p-4 text-white transition-colors hover:opacity-90">
          <Send className="h-5 w-5" />
          <span className="font-medium">Enviar por Email</span>
        </button>
      </div>

      <PaymentReceipt
        variant="membership"
        number={receipt.number}
        date={receipt.date}
        time={receipt.time}
        title="Comprobante de Membresia"
        subtitle="Cobro de cuota mensual"
        party={{
          title: "Datos del alumno",
          lines: [receipt.alumno.name, `DNI: ${receipt.alumno.dni}`, `Plan: ${receipt.alumno.plan}`],
        }}
        items={[{ label: `Cuota mensual - ${receipt.alumno.plan}`, amount: receipt.payment.amount }]}
        subtotal={receipt.payment.amount}
        discount={receipt.payment.discount}
        total={receipt.payment.total}
        paymentMethod={receipt.payment.method}
        attendedBy={receipt.attendedBy}
        note="Este comprobante certifica el pago de la cuota mensual del gimnasio."
      />

      <div className="mx-auto mt-6 flex max-w-2xl justify-center gap-4">
        <Link to="/cobranzas/buscar-alumno" className="font-medium text-indigo-primary hover:underline">
          Registrar otro pago
        </Link>
      </div>
    </div>
  );
}
