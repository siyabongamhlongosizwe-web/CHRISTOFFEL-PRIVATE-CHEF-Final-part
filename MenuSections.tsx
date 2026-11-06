import type { MenuItem } from "../types";
import { COURSES, COURSE_PLURAL, itemsInCourse } from "../utils/menu";
import MenuCard from "./MenuCard";
import SectionTitle from "./SectionTitle";

/** Lists items grouped under STARTERS / MAINS / DESSERTS headings. */
export default function MenuSections({ items }: { items: MenuItem[] }) {
  return (
    <>
      {COURSES.map((course) => {
        const list = itemsInCourse(items, course);
        if (list.length === 0) return null;
        return (
          <section key={course}>
            <SectionTitle>{COURSE_PLURAL[course]}</SectionTitle>
            <div className="flex flex-col gap-2">
              {list.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
