import { Link, useLocation, useParams } from "react-router";
import { CheckCircle, Printer, ShoppingCart } from "lucide-react";
import PaymentReceipt from "../PaymentReceipt";
import { useUser } from "../../context/UserContext";
import { hasPermission } from "../../permissions";
<<<<<<< HEAD
import { kioskProducts } from "../../data/catalog";
=======
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a

export default function DetalleVenta() {
  const { user } = useUser();
  const { id } = useParams();
  const location = useLocation();
  const canRegisterSale = hasPermission(user?.role, "kiosk.registerSale");
  const saleState = location.state as
    | {
        items?: Array<{ id: number; name: string; price: number; quantity: number }>;
        total?: number;
        paymentMethod?: string;
      }
    | undefined;
  const fallbackItems = [
<<<<<<< HEAD
    { id: kioskProducts[0].id, name: kioskProducts[0].name, quantity: 2, price: kioskProducts[0].price },
    { id: kioskProducts[1].id, name: kioskProducts[1].name, quantity: 1, price: kioskProducts[1].price },
    { id: kioskProducts[2].id, name: kioskProducts[2].name, quantity: 3, price: kioskProducts[2].price },
=======
    { id: 1, name: "Bebida Isotonica", quantity: 2, price: 60 },
    { id: 2, name: "Barrita Proteica", quantity: 1, price: 70 },
    { id: 3, name: "Agua Mineral", quantity: 3, price: 30 },
>>>>>>> 32e609cb88a310c31f7697a1311adf161a87661a
  ];
  const items = saleState?.items?.length ? saleState.items : fallbackItems;
  const total = saleState?.total ?? items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const sale = {
    id,
    number: `VENTA-${id?.slice(-6)}`,
    date: new Date().toLocaleDateString("es-AR"),
    time: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
    items,
    total,
    paymentMethod: saleState?.paymentMethod || "Efectivo",
    attendedBy: "Secretaria: Malena Trangoni",
  };

  return (
    <div className="app-page">
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-success-medium bg-success-light p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70">
          <CheckCircle className="h-6 w-6 text-success-dark" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-success-dark">Venta registrada exitosamente</h2>
          <p className="text-success-dark">El stock se actualizo automaticamente.</p>
        </div>
      </div>

      <div className={`mb-6 grid grid-cols-1 gap-4 ${canRegisterSale ? "md:grid-cols-2" : ""}`}>
        <button className="flex items-center justify-center gap-3 rounded-lg bg-indigo-primary p-4 text-white transition-colors hover:opacity-90">
          <Printer className="h-5 w-5" />
          <span className="font-medium">Imprimir ticket</span>
        </button>
        {canRegisterSale && (
          <Link
            to="/kiosco/nueva-venta"
            className="flex items-center justify-center gap-3 rounded-lg bg-indigo-primary p-4 text-white transition-colors hover:opacity-90"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="font-medium">Nueva venta</span>
          </Link>
        )}
      </div>

      <PaymentReceipt
        variant="kiosk"
        number={sale.number}
        date={sale.date}
        time={sale.time}
        title="Comprobante de Kiosco"
        subtitle="Venta de productos"
        items={sale.items.map((item) => ({
          label: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          amount: item.price * item.quantity,
        }))}
        subtotal={sale.total}
        total={sale.total}
        paymentMethod={sale.paymentMethod}
        attendedBy={sale.attendedBy}
        note="Este comprobante certifica la venta realizada en kiosco."
      />
    </div>
  );
}
