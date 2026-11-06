import { CakeSlice, Salad, UtensilsCrossed } from "lucide-react";
import { useMenu } from "../context/MenuContext";
import { COURSES, COURSE_PLURAL, averageForCourse, averagePrice, formatPrice, itemsInCourse } from "../utils/menu";

const ICONS = { Starter: Salad, Main: UtensilsCrossed, Dessert: CakeSlice } as const;

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-ink-line bg-ink-panel py-4 text-center">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="mt-1 text-[26px] font-bold leading-none text-cream">{value}</p>
    </div>
  );
}

export default function StatsScreen() {
  const { items } = useMenu();
  return (
    <div className="px-5 pb-4">
      <div className="grid grid-cols-2 gap-3">
        <StatTile label="Total Items" value={items.length} />
        <StatTile label="Average Price (All)" value={formatPrice(averagePrice(items))} />
      </div>

      <h3 className="mb-2 mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">Items per Course</h3>
      <div className="flex flex-col gap-2">
        {COURSES.map((course) => {
          const Icon = ICONS[course];
          const count = itemsInCourse(items, course).length;
          const share = items.length === 0 ? 0 : (count / items.length) * 100;
          return (
            <div key={course} className="rounded-xl border border-ink-line bg-ink-panel px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-3 text-[13px] text-cream"><Icon size={18} className="text-gold" strokeWidth={1.5} /> {COURSE_PLURAL[course]}</span>
                <span className="text-[13px] font-bold text-gold-bright">{count} {count === 1 ? "item" : "items"}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-line" role="img" aria-label={`${Math.round(share)}% of the menu`}>
                <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${share}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="mb-2 mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">Average Prices</h3>
      <div className="flex flex-col gap-2">
        {COURSES.map((course) => {
          const Icon = ICONS[course];
          return (
            <div key={course} className="flex items-center justify-between rounded-xl border border-ink-line bg-ink-panel px-4 py-3">
              <span className="flex items-center gap-3 text-[13px] text-cream"><Icon size={18} className="text-gold" strokeWidth={1.5} /> {COURSE_PLURAL[course]}</span>
              <span className="text-[14px] font-bold text-cream">{formatPrice(averageForCourse(items, course))}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
