import { Link, useParams } from "react-router";
import { Download, Home, Printer, Send } from "lucide-react";
import PaymentReceipt from "../PaymentReceipt";
import { getCobranzaById } from "../../data/cobranzas";

export default function ComprobanteCobranza() {
  const { id } = useParams();
  const cobranza = getCobranzaById(id ?? "") ?? getCobranzaById(1)!;
  const total = cobranza.amount - cobranza.discount;

  return (
    <div className="app-page">
      <div className="mb-6">
        <div>
          <h1 className="app-page-title">Comprobante de cobranza</h1>
        </div>
      </div>

      <PaymentReceipt
        variant="membership"
        number={cobranza.receipt}
        date={cobranza.date}
        time="10:30"
        title="Comprobante de Membresia"
        subtitle="Cobro de cuota mensual"
        party={{
          title: "Datos del alumno",
          lines: [cobranza.alumno, `Plan: ${cobranza.plan}`],
        }}
        items={[{ label: `Cuota mensual - ${cobranza.plan}`, amount: cobranza.amount }]}
        subtotal={cobranza.amount}
        discount={cobranza.discount}
        total={total}
        paymentMethod={cobranza.method}
      />

      <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-3">
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

      <div className="mx-auto mt-4 max-w-2xl">
        <Link
          to="/home"
          className="flex items-center justify-center gap-3 rounded-lg border border-indigo-light bg-white p-4 font-medium text-indigo-primary transition-colors hover:bg-indigo-lightest"
        >
          <Home className="h-5 w-5" />
          Volver al menu
        </Link>
      </div>
    </div>
  );
}
