import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search by dish name" }: Props) {
  return (
    <div className="relative">
      <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search menu items by name"
        className="w-full rounded-lg border border-ink-line bg-ink-panel py-2.5 pl-9 pr-9 text-[13px] text-cream outline-none placeholder:text-[#5E5E5E] focus:border-gold"
      />
      {value && (
        <button onClick={() => onChange("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-cream">
          <X size={15} />
        </button>
      )}
    </div>
  );
}
