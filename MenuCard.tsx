import type { ReactNode } from "react";
import type { MenuItem } from "../types";
import { formatPrice } from "../utils/menu";
import FoodImage from "./FoodImage";

interface Props {
  item: MenuItem;
  /** "description" shows the dish description, "course" shows the course (used on Manage). */
  subtitle?: "description" | "course";
  actions?: ReactNode;
}

export default function MenuCard({ item, subtitle = "description", actions }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ink-line bg-ink-panel p-2.5">
      <FoodImage src={item.image} course={item.course} alt={item.name} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-cream">{item.name}</p>
        <p className="truncate text-[11px] text-muted">{subtitle === "course" ? item.course : item.description}</p>
        <p className="mt-0.5 text-[13px] font-bold text-gold-bright">{formatPrice(item.price)}</p>
      </div>
      {actions && <div className="flex items-center gap-1">{actions}</div>}
    </div>
  );
}
