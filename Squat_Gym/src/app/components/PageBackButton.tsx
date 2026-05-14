import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function PageBackButton({ pathname }: { pathname: string }) {
  const navigate = useNavigate();

  if (pathname === "/home") {
    return null;
  }

  const handleBack = () => {
    const historyIndex =
      typeof window !== "undefined" && typeof window.history.state?.idx === "number"
        ? window.history.state.idx
        : 0;

    if (historyIndex > 0) {
      navigate(-1);
      return;
    }

    navigate("/home");
  };

  return (
    <div className="sticky top-0 z-20 border-b border-white/70 bg-white/88 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver atras
        </button>
      </div>
    </div>
  );
}
