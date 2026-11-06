import { ChefHat, UtensilsCrossed } from "lucide-react";
import MenuSections from "../components/MenuSections";
import EmptyState from "../components/EmptyState";
import { useMenu } from "../context/MenuContext";
import { COURSES, COURSE_PLURAL, averageForCourse, formatPrice } from "../utils/menu";

export default function HomeScreen() {
  const { items } = useMenu();
  return (
    <div className="px-5 pb-4">
      <h2 className="mb-3 text-center text-[17px] font-semibold uppercase tracking-wide text-cream">Complete Menu</h2>

      <div className="flex flex-col items-center border-b border-ink-line pb-3">
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <ChefHat size={14} className="text-gold" /> Total Items
        </span>
        <span className="text-[30px] font-bold leading-tight text-cream">{items.length}</span>
      </div>

      <h3 className="mb-2 mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">Average Prices</h3>
      <div className="grid grid-cols-3 gap-2">
        {COURSES.map((course) => (
          <div key={course} className="rounded-lg border border-ink-line bg-ink-panel py-2 text-center">
            <p className="text-[9px] font-semibold tracking-wider text-muted">{COURSE_PLURAL[course].toUpperCase()}</p>
            <p className="text-[15px] font-bold text-gold-bright">{formatPrice(averageForCourse(items, course))}</p>
          </div>
        ))}
      </div>

      {items.length === 0 ? (
        <EmptyState icon={<UtensilsCrossed size={28} />} title="The menu is empty" hint="Tap Add to create the first dish." />
      ) : (
        <MenuSections items={items} />
      )}
    </div>
  );
}
