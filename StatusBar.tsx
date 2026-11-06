import { Battery, Signal, Wifi } from "lucide-react";

export default function StatusBar() {
  return (
    <div className="flex items-center justify-between px-7 pt-3 pb-1 text-[11px] font-semibold text-cream">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal size={12} />
        <Wifi size={12} />
        <Battery size={14} />
      </div>
    </div>
  );
}
