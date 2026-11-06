import type { ReactNode } from "react";

export default function EmptyState({ icon, title, hint }: { icon: ReactNode; title: string; hint?: string }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-2 text-center text-muted">
      <div className="text-gold/70">{icon}</div>
      <p className="text-[13px] font-medium text-cream">{title}</p>
      {hint && <p className="max-w-[220px] text-[11px]">{hint}</p>}
    </div>
  );
}
