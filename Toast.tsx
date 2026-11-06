import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useMenu } from "../context/MenuContext";

const STYLES = {
  success: { icon: CheckCircle2, color: "text-success", border: "border-success/50" },
  error: { icon: AlertCircle, color: "text-danger", border: "border-danger/50" },
  info: { icon: Info, color: "text-gold", border: "border-gold/50" },
} as const;

/** Success / error feedback shown at the top of the phone screen. */
export default function Toast() {
  const { toast, dismissToast } = useMenu();
  if (!toast) return null;
  const { icon: Icon, color, border } = STYLES[toast.type];
  return (
    <div key={toast.id} role="status" className={`anim-toast absolute left-4 right-4 top-12 z-30 flex items-center gap-2 rounded-xl border ${border} bg-[#1C1C1C] px-3 py-2.5 shadow-xl`}>
      <Icon size={18} className={color} />
      <p className="flex-1 text-[12px] text-cream">{toast.text}</p>
      <button onClick={dismissToast} aria-label="Dismiss message" className="text-muted hover:text-cream"><X size={14} /></button>
    </div>
  );
}
