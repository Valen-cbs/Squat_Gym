import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Package, Plus, Search, Send, ShoppingCart, Trash2 } from "lucide-react";
import { getSuggestedRestockQuantity, kioskProducts, type KioskProduct } from "../../data/catalog";

type OrderItem = {
  id: number;
  name: string;
  stock: number;
  minStock: number;
  quantity: number;
};

type ProductWithSuggested = KioskProduct & {
  suggested: number;
};

function createOrderItem(product: ProductWithSuggested): OrderItem {
  return {
    id: product.id,
    name: product.name,
    stock: product.stock,
    minStock: product.minStock,
    quantity: product.suggested,
  };
}

export default function EncargadoReposicion() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const products: ProductWithSuggested[] = kioskProducts.map((product) => ({
    ...product,
    suggested: getSuggestedRestockQuantity(product),
  }));
  const lowStockProducts = products.filter((product) => product.stock <= product.minStock);
  const shouldGenerateAutomatically = searchParams.get("modo") === "automatico";

  const [orderSearchTerm, setOrderSearchTerm] = useState("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>(() =>
    shouldGenerateAutomatically ? lowStockProducts.map(createOrderItem) : []
  );
  const [confirmedOrder, setConfirmedOrder] = useState<OrderItem[] | null>(null);

  const orderSearch = orderSearchTerm.trim().toLowerCase();
  const orderProducts = [...products]
    .filter((product) => !orderSearch || product.name.toLowerCase().includes(orderSearch))
    .sort((firstProduct, secondProduct) =>
      firstProduct.stock - secondProduct.stock ||
      firstProduct.name.localeCompare(secondProduct.name)
    );
  const confirmedUnits = confirmedOrder?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const addToOrder = (product: ProductWithSuggested) => {
    if (orderItems.some((item) => item.id === product.id)) {
      return;
    }

    setOrderItems((current) => [...current, createOrderItem(product)]);
  };

  const removeFromOrder = (productId: number) => {
    setOrderItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(productId);
      return;
    }

    setOrderItems((current) =>
      current.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const submitOrder = () => {
    setConfirmedOrder(orderItems);
  };

  if (confirmedOrder) {
    return (
      <div className="app-page">
        <div className="mx-auto max-w-3xl rounded-2xl border border-green-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <ShoppingCart className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-gray-900">Pedido de reposicion generado</h1>
          <p className="mt-2 text-gray-600">
            Se registro la solicitud para {confirmedOrder.length} productos y {confirmedUnits} unidades.
          </p>
          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-left">
            <h2 className="font-bold text-gray-900">Resumen del pedido</h2>
            <div className="mt-3 space-y-2">
              {confirmedOrder.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 rounded-lg bg-white px-3 py-2 text-sm">
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="text-gray-600">{item.quantity} unidades</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 font-bold text-gray-900">
              <span>Total unidades</span>
              <span>{confirmedUnits}</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/encargado/stock")}
            className="mt-6 rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition-colors hover:bg-green-700"
          >
            Volver al stock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Generar reposicion</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Los productos aparecen ordenados de menor a mayor stock. Podes filtrar por nombre y ajustar las cantidades antes de enviar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar producto para agregar..."
              value={orderSearchTerm}
              onChange={(event) => setOrderSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-4 max-h-[32rem] space-y-3 overflow-y-auto pr-1">
            {orderProducts.map((product) => {
              const alreadyAdded = orderItems.some((item) => item.id === product.id);
              const needsRestock = product.stock <= product.minStock;

              return (
                <div key={product.id} className="flex flex-col gap-3 rounded-lg border border-gray-200 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.category} | Stock {product.stock} | Minimo {product.minStock}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToOrder(product)}
                    disabled={alreadyAdded}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      alreadyAdded
                        ? "cursor-not-allowed bg-gray-200 text-gray-500"
                        : needsRestock
                          ? "bg-orange-600 text-white hover:bg-orange-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    {alreadyAdded ? "Agregado" : "Agregar"}
                  </button>
                </div>
              );
            })}
            {orderSearch && orderProducts.length === 0 && (
              <p className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500">
                No se encontraron productos con ese nombre.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Resumen del pedido</h2>

          {orderItems.length === 0 ? (
            <div className="py-8 text-center">
              <Package className="mx-auto mb-2 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">No hay productos en el pedido</p>
            </div>
          ) : (
            <>
              <div className="mb-5 max-h-96 space-y-3 overflow-y-auto">
                {orderItems.map((item) => (
                  <div key={item.id} className="rounded-lg border border-gray-200 p-3">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <button
                        type="button"
                        onClick={() => removeFromOrder(item.id)}
                        className="text-red-600 hover:text-red-700"
                        aria-label={`Quitar ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mb-3 text-xs text-gray-500">Stock actual: {item.stock} | Minimo: {item.minStock}</p>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 rounded bg-gray-100 hover:bg-gray-200"
                          aria-label={`Restar una unidad de ${item.name}`}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={item.quantity}
                          onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                          className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 rounded bg-gray-100 hover:bg-gray-200"
                          aria-label={`Sumar una unidad de ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">unidades</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">Total productos:</span>
                  <span className="text-2xl font-bold text-gray-900">{orderItems.length}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-600">Total unidades:</span>
                  <span className="font-medium text-gray-900">
                    {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={submitOrder}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-medium text-white transition-colors hover:bg-green-700"
              >
                <Send className="h-5 w-5" />
                Enviar pedido
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
