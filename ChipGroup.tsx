interface Props<T extends string> {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  label?: (v: T) => string;
  columns?: number;
}

/** Segmented chips (Starter | Main | Dessert, or All | Starters | Mains | Desserts). */
export default function ChipGroup<T extends string>({ options, value, onChange, label = (v) => v, columns }: Props<T>) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns ?? options.length}, minmax(0, 1fr))` }}>
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={active}
            className={`rounded-lg border py-2 text-[12px] font-semibold transition-colors ${
              active ? "border-gold bg-gold text-gold-dark" : "border-ink-line bg-ink-raised text-cream/80 hover:border-gold/60"
            }`}
          >
            {label(o)}
          </button>
        );
      })}
    </div>
  );
}
