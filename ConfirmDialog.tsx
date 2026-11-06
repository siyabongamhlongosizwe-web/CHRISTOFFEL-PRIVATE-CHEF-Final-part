interface Props {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ title, message, confirmLabel, onConfirm, onCancel }: Props) {
  return (
    <div className="anim-fade absolute inset-0 z-40 flex items-center justify-center bg-black/70 px-6" role="dialog" aria-modal="true">
      <div className="w-full rounded-2xl border border-ink-line bg-ink-panel p-5">
        <h2 className="text-[14px] font-semibold text-cream">{title}</h2>
        <p className="mt-1.5 text-[12px] text-muted">{message}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={onCancel} className="rounded-lg border border-ink-line py-2.5 text-[12px] font-semibold text-cream hover:border-gold/60">Cancel</button>
          <button onClick={onConfirm} className="rounded-lg bg-danger py-2.5 text-[12px] font-semibold text-white hover:opacity-90">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
