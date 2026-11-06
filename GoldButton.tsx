import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
}

export default function GoldButton({ variant = "solid", className = "", ...rest }: Props) {
  const style =
    variant === "solid"
      ? "bg-gold text-gold-dark hover:bg-gold-bright"
      : "border border-ink-line bg-transparent text-cream hover:border-gold/60";
  return <button className={`w-full rounded-lg py-3 text-[13px] font-bold uppercase tracking-wider transition-colors ${style} ${className}`} {...rest} />;
}
