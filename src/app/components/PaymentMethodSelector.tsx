import { CreditCard, Banknote, QrCode, Smartphone } from "lucide-react";

export const paymentMethods = [
  { id: "efectivo", label: "Efectivo", icon: Banknote },
  { id: "qr", label: "QR", icon: QrCode },
  { id: "transferencia", label: "Transferencia", icon: Smartphone },
  { id: "tarjeta", label: "Tarjeta", icon: CreditCard },
] as const;

export const paymentMethodLabels = paymentMethods.reduce<Record<string, string>>((labels, method) => {
  labels[method.id] = method.label;
  return labels;
}, {});

type PaymentMethodSelectorProps = {
  title?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function PaymentMethodSelector({
  title = "Metodo de pago",
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-700">{title}</label>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id)}
            className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
              value === method.id
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <method.icon className="h-6 w-6" />
            <span className="text-sm font-medium">{method.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
