import { Dumbbell, GlassWater, Package, Sandwich, Sparkles } from "lucide-react";
import type { KioskProduct } from "../../data/catalog";

const categoryStyles: Record<string, { bg: string; accent: string; Icon: typeof Package }> = {
  Bebidas: {
    bg: "from-cyan-100 via-blue-50 to-indigo-100",
    accent: "bg-cyan-500",
    Icon: GlassWater,
  },
  Suplementos: {
    bg: "from-lime-100 via-emerald-50 to-cyan-100",
    accent: "bg-emerald-500",
    Icon: Sparkles,
  },
  Alimentos: {
    bg: "from-amber-100 via-orange-50 to-rose-100",
    accent: "bg-amber-500",
    Icon: Sandwich,
  },
  Accesorios: {
    bg: "from-violet-100 via-slate-50 to-sky-100",
    accent: "bg-violet-500",
    Icon: Dumbbell,
  },
};

type ProductArtworkProps = {
  product: KioskProduct;
  size?: "sm" | "lg";
};

export default function ProductArtwork({ product, size = "sm" }: ProductArtworkProps) {
  const style = categoryStyles[product.category] ?? {
    bg: "from-slate-100 via-white to-slate-200",
    accent: "bg-slate-500",
    Icon: Package,
  };
  const Icon = style.Icon;
  const wrapperSize = size === "lg" ? "h-24 w-24" : "h-12 w-12";
  const iconSize = size === "lg" ? "h-9 w-9" : "h-5 w-5";

  return (
    <div className={`relative shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${style.bg} ${wrapperSize}`}>
      <div className={`absolute -right-3 -top-3 rounded-full ${style.accent}/20 ${size === "lg" ? "h-14 w-14" : "h-8 w-8"} animate-pulse`} />
      <div className={`absolute -bottom-2 -left-2 rounded-full ${style.accent}/25 ${size === "lg" ? "h-12 w-12" : "h-7 w-7"}`} />
      <div className={`absolute inset-0 flex items-center justify-center text-slate-800`}>
        <Icon className={iconSize} />
      </div>
      <div className={`absolute bottom-1 right-1 rounded-full ${style.accent} ${size === "lg" ? "h-3 w-3" : "h-2 w-2"}`} />
    </div>
  );
}
