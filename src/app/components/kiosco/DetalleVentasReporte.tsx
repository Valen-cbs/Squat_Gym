import { useMemo } from "react";
import { useLocation } from "react-router";

export type VentaDetalle = {
  id: number;
  turno: "Manana" | "Tarde" | "Noche";
  producto: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  fecha: string;
  sede?: string;
};

type ReportMode = "shift" | "day";
type VentasAgrupadas = Record<string, VentaDetalle[]>;

type ReportState = {
  branch?: string;
  reportMode?: ReportMode;
  reportDate?: string;
  dateFrom?: string;
  dateTo?: string;
};

const turnoOrden = ["Manana", "Tarde", "Noche"];

const ventasDemo: VentaDetalle[] = [
  { id: 101, sede: "Sede Norte", turno: "Manana", producto: "Bebida isotonica", descripcion: "Botella 750 ml sabor naranja", cantidad: 1, precio: 720, fecha: "2026-04-21" },
  { id: 102, sede: "Sede Norte", turno: "Manana", producto: "Barrita proteica", descripcion: "Chocolate con mani 60 g", cantidad: 2, precio: 540, fecha: "2026-04-21" },
  { id: 103, sede: "Sede Norte", turno: "Tarde", producto: "Batido de proteina", descripcion: "Vainilla preparado 350 ml", cantidad: 1, precio: 980, fecha: "2026-04-21" },
  { id: 104, sede: "Sede Norte", turno: "Tarde", producto: "Toalla deportiva", descripcion: "Microfibra compacta azul", cantidad: 1, precio: 1260, fecha: "2026-04-21" },
  { id: 105, sede: "Sede Norte", turno: "Noche", producto: "Guantes de entrenamiento", descripcion: "Par acolchado talle M", cantidad: 1, precio: 1510, fecha: "2026-04-21" },
  { id: 106, sede: "Sede Norte", turno: "Manana", producto: "Agua mineral", descripcion: "Botella sin gas 500 ml", cantidad: 3, precio: 380, fecha: "2026-04-20" },
  { id: 107, sede: "Sede Norte", turno: "Manana", producto: "Snack saludable", descripcion: "Mix de frutos secos 80 g", cantidad: 1, precio: 600, fecha: "2026-04-20" },
  { id: 108, sede: "Sede Norte", turno: "Tarde", producto: "Creatina monohidratada", descripcion: "Pote 300 g sabor neutro", cantidad: 1, precio: 1970, fecha: "2026-04-20" },
  { id: 109, sede: "Sede Norte", turno: "Noche", producto: "Bebida isotonica", descripcion: "Botella 750 ml sabor uva", cantidad: 2, precio: 1040, fecha: "2026-04-20" },
  { id: 110, sede: "Sede Norte", turno: "Manana", producto: "Barrita proteica", descripcion: "Vainilla crocante 60 g", cantidad: 1, precio: 620, fecha: "2026-04-19" },
  { id: 111, sede: "Sede Norte", turno: "Manana", producto: "Agua mineral", descripcion: "Botella sin gas 500 ml", cantidad: 2, precio: 860, fecha: "2026-04-19" },
  { id: 112, sede: "Sede Norte", turno: "Tarde", producto: "Batido de proteina", descripcion: "Chocolate preparado 350 ml", cantidad: 1, precio: 1160, fecha: "2026-04-19" },
  { id: 113, sede: "Sede Norte", turno: "Tarde", producto: "Bebida isotonica", descripcion: "Botella 750 ml sabor naranja", cantidad: 1, precio: 1000, fecha: "2026-04-19" },
  { id: 114, sede: "Sede Norte", turno: "Noche", producto: "Snack saludable", descripcion: "Cereal integral con miel", cantidad: 1, precio: 1180, fecha: "2026-04-19" },
  { id: 301, sede: "Sede Sur", turno: "Manana", producto: "Agua mineral", descripcion: "Botella sin gas 500 ml", cantidad: 2, precio: 420, fecha: "2026-04-21" },
  { id: 302, sede: "Sede Sur", turno: "Manana", producto: "Barrita proteica", descripcion: "Chocolate con mani 60 g", cantidad: 1, precio: 450, fecha: "2026-04-21" },
  { id: 303, sede: "Sede Sur", turno: "Tarde", producto: "Toalla deportiva", descripcion: "Microfibra compacta gris", cantidad: 1, precio: 980, fecha: "2026-04-21" },
  { id: 304, sede: "Sede Sur", turno: "Tarde", producto: "Bebida isotonica", descripcion: "Botella 750 ml sabor lima", cantidad: 1, precio: 700, fecha: "2026-04-21" },
  { id: 305, sede: "Sede Sur", turno: "Noche", producto: "Snack saludable", descripcion: "Mix de frutos secos 80 g", cantidad: 1, precio: 920, fecha: "2026-04-21" },
  { id: 306, sede: "Sede Sur", turno: "Manana", producto: "Agua mineral", descripcion: "Botella sin gas 500 ml", cantidad: 2, precio: 320, fecha: "2026-04-20" },
  { id: 307, sede: "Sede Sur", turno: "Manana", producto: "Barrita proteica", descripcion: "Vainilla crocante 60 g", cantidad: 1, precio: 420, fecha: "2026-04-20" },
  { id: 308, sede: "Sede Sur", turno: "Tarde", producto: "Batido de proteina", descripcion: "Frutilla preparado 350 ml", cantidad: 1, precio: 1420, fecha: "2026-04-20" },
  { id: 309, sede: "Sede Sur", turno: "Noche", producto: "Bebida isotonica", descripcion: "Botella 750 ml sabor uva", cantidad: 1, precio: 760, fecha: "2026-04-20" },
];

export function groupSalesByShift(ventas: VentaDetalle[]) {
  return ventas.reduce<VentasAgrupadas>((groups, venta) => {
    groups[venta.turno] = [...(groups[venta.turno] ?? []), venta];
    return groups;
  }, {});
}

export function groupSalesByDay(ventas: VentaDetalle[]) {
  return ventas.reduce<VentasAgrupadas>((groups, venta) => {
    groups[venta.fecha] = [...(groups[venta.fecha] ?? []), venta];
    return groups;
  }, {});
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString("es-AR")}`;
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("es-AR");
}

function getGroupTotal(ventas: VentaDetalle[]) {
  return ventas.reduce((total, venta) => total + (venta.cantidad * venta.precio), 0);
}

export default function DetalleVentasReporte({ ventas = ventasDemo }: { ventas?: VentaDetalle[] }) {
  const location = useLocation();
  const reportState = (location.state as ReportState | null) ?? {};
  const branch = reportState.branch ?? "Sede Norte";
  const reportMode = reportState.reportMode ?? "shift";
  const reportDate = reportState.reportDate ?? "2026-04-21";
  const dateFrom = reportState.dateFrom ?? "2026-04-19";
  const dateTo = reportState.dateTo ?? "2026-04-21";

  const filteredVentas = useMemo(() => {
    return ventas.filter((venta) => {
      const sameBranch = (venta.sede ?? branch) === branch;

      if (reportMode === "shift") {
        return sameBranch && venta.fecha === reportDate;
      }

      return sameBranch && venta.fecha >= dateFrom && venta.fecha <= dateTo;
    });
  }, [branch, dateFrom, dateTo, reportDate, reportMode, ventas]);

  const groupedVentas = useMemo(() => {
    return reportMode === "shift"
      ? groupSalesByShift(filteredVentas)
      : groupSalesByDay(filteredVentas);
  }, [filteredVentas, reportMode]);

  const groupKeys = reportMode === "shift"
    ? turnoOrden.filter((turno) => groupedVentas[turno]?.length)
    : Object.keys(groupedVentas).sort((dateA, dateB) => dateA.localeCompare(dateB));

  const totalGeneral = filteredVentas.reduce((total, venta) => total + venta.precio, 0);
  const reportLabel = reportMode === "shift"
    ? `Corte de control por turno del ${formatDate(reportDate)}`
    : `Detalle discriminado por dia del ${formatDate(dateFrom)} al ${formatDate(dateTo)}`;

  return (
    <div className="app-page">
      <div className="mb-6">
        <h1 className="app-page-title">Detalle de ventas</h1>
        <p className="app-page-copy">{reportLabel} para {branch}.</p>
      </div>

      <div className="space-y-6">
        {groupKeys.map((groupKey) => {
          const groupVentas = groupedVentas[groupKey];
          const totalParcial = getGroupTotal(groupVentas);
          const title = reportMode === "shift" ? `Turno ${groupKey}` : formatDate(groupKey);

          return (
            <section key={groupKey} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-slate-900 px-5 py-4 text-white">
                <h2 className="text-lg font-bold">{title}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-5 py-3 text-left text-sm font-semibold text-slate-700">Producto</th>
                      <th className="px-5 py-3 text-left text-sm font-semibold text-slate-700">Descripcion</th>
                      <th className="px-5 py-3 text-center text-sm font-semibold text-slate-700">Cantidad</th>
                      <th className="px-5 py-3 text-right text-sm font-semibold text-slate-700">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupVentas.map((venta, index) => (
                      <tr key={venta.id} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-5 py-3 text-sm font-medium text-slate-900">{venta.producto}</td>
                        <td className="px-5 py-3 text-sm text-slate-600">{venta.descripcion}</td>
                        <td className="px-5 py-3 text-center text-sm font-semibold text-slate-900">{venta.cantidad}</td>
                        <td className="px-5 py-3 text-right text-sm font-semibold text-slate-900">
                          {formatCurrency(venta.cantidad * venta.precio)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-slate-300 bg-slate-200">
                      <td colSpan={3} className="px-5 py-3 text-sm font-bold text-slate-950">
                        Total Parcial
                      </td>
                      <td className="px-5 py-3 text-right text-sm font-bold text-slate-950">
                        {formatCurrency(totalParcial)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>
          );
        })}

        {groupKeys.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-8 text-center text-sm text-slate-500">
            No hay ventas registradas para los filtros seleccionados.
          </div>
        )}
      </div>

      <div className="mt-6 rounded-xl bg-slate-950 px-5 py-5 text-white shadow-lg">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Cierre del reporte</p>
          <p className="text-2xl font-bold">Total General: {formatCurrency(totalGeneral)}</p>
        </div>
      </div>
    </div>
  );
}
