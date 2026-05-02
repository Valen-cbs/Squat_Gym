type ReceiptItem = {
  label: string;
  quantity?: number;
  unitPrice?: number;
  amount: number;
};

type ReceiptParty = {
  title: string;
  lines: string[];
};

type PaymentReceiptProps = {
  variant: "membership" | "kiosk";
  number: string;
  date: string;
  time: string;
  title: string;
  subtitle: string;
  party?: ReceiptParty;
  items: ReceiptItem[];
  subtotal: number;
  discount?: number;
  total: number;
  paymentMethod: string;
  attendedBy: string;
  note: string;
};

export default function PaymentReceipt({
  variant,
  number,
  date,
  time,
  title,
  subtitle,
  party,
  items,
  subtotal,
  discount = 0,
  total,
  paymentMethod,
  attendedBy,
  note,
}: PaymentReceiptProps) {
  const documentLabel = variant === "membership" ? "Recibo Nro" : "Ticket Nro";

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border-2 border-indigo-light bg-white p-6 shadow-lg shadow-indigo-light/50 sm:p-8">
      <div className="border-b-2 border-indigo-light pb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-primary">SquatGym</p>
        <h1 className="mt-2 text-3xl font-bold text-indigo-darkest">{title}</h1>
        <p className="mt-1 text-sm text-indigo-dark">{subtitle}</p>
        <p className="mt-2 text-xs text-indigo-dark">Sede Norte</p>
      </div>

      <div className="my-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-indigo-dark">{documentLabel}</p>
          <p className="text-xl font-bold text-indigo-darkest">{number}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-indigo-dark">Fecha y hora</p>
          <p className="font-medium text-indigo-darkest">{date}</p>
          <p className="text-sm text-indigo-dark">{time}</p>
        </div>
      </div>

      {party && (
        <div className="mb-6 rounded-xl border border-indigo-light bg-indigo-lightest p-4">
          <p className="mb-2 text-sm font-medium text-indigo-dark">{party.title}</p>
          {party.lines.map((line) => (
            <p key={line} className="text-sm text-indigo-darkest first:font-bold">
              {line}
            </p>
          ))}
        </div>
      )}

      <div className="mb-6 overflow-x-auto">
        <table className="w-full min-w-[460px]">
          <thead>
            <tr className="border-b-2 border-indigo-light">
              <th className="py-3 text-left text-sm font-medium text-indigo-dark">Concepto</th>
              <th className="py-3 text-center text-sm font-medium text-indigo-dark">Cant.</th>
              <th className="py-3 text-right text-sm font-medium text-indigo-dark">Unitario</th>
              <th className="py-3 text-right text-sm font-medium text-indigo-dark">Monto</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.label} className="border-b border-indigo-light odd:bg-indigo-lightest/60">
                <td className="py-3 text-sm text-indigo-darkest">{item.label}</td>
                <td className="py-3 text-center text-sm text-indigo-dark">{item.quantity ?? 1}</td>
                <td className="py-3 text-right text-sm text-indigo-dark">
                  ${item.unitPrice ?? item.amount}
                </td>
                <td className="py-3 text-right text-sm font-medium text-indigo-darkest">
                  ${item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6 rounded-xl border-2 border-indigo-light bg-indigo-lightest p-4">
        <div className="space-y-2 border-b border-indigo-light pb-3 text-sm">
          <div className="flex justify-between">
            <span className="text-indigo-dark">Subtotal</span>
            <span className="font-medium text-indigo-darkest">${subtotal}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span className="text-success-dark">Descuento aplicado</span>
              <span className="font-medium text-success-dark">-${discount}</span>
            </div>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-darkest">Total pagado</span>
          <span className="text-2xl font-bold text-indigo-primary">${total}</span>
        </div>
        <p className="mt-2 text-sm text-indigo-dark">Metodo de pago: {paymentMethod}</p>
      </div>

      <div className="border-t-2 border-indigo-light pt-5 text-center">
        <p className="text-sm text-indigo-dark">Atendido por: {attendedBy}</p>
        <p className="mt-2 text-xs text-indigo-dark">{note}</p>
        <p className="mt-4 text-xs font-semibold text-indigo-primary">
          SquatGym Sede Norte
        </p>
      </div>
    </div>
  );
}
