import { ArrowLeft, ChefHat, Menu } from "lucide-react";

interface Props {
  title?: string;
  onBack?: () => void;
  onMenu?: () => void;
}

/** Brand header for Home, back-arrow header for every other screen. */
export default function AppHeader({ title, onBack, onMenu }: Props) {
  if (!onBack) {
    return (
      <header className="relative flex flex-col items-center px-5 pb-3 pt-2">
        <ChefHat size={20} className="text-gold" strokeWidth={1.6} />
        <span className="font-bold tracking-[0.14em] text-gold-bright" style={{ fontSize: 17 }}>CHRISTOFFEL</span>
        <span className="text-[8px] tracking-[0.32em] text-gold/80">PRIVATE CHEF</span>
        {onMenu && (
          <button onClick={onMenu} aria-label="Open manage menu" className="absolute right-5 top-4 text-cream">
            <Menu size={20} />
          </button>
        )}
      </header>
    );
  }
  return (
    <header className="flex items-center gap-4 px-5 pb-4 pt-3">
      <button onClick={onBack} aria-label="Back to home" className="text-cream hover:text-gold">
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cream">{title}</h1>
    </header>
  );
}
