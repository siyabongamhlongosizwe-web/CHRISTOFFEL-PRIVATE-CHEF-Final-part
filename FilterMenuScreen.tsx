import { SearchX } from "lucide-react";
import EmptyState from "../components/EmptyState";
import FilterControls from "../components/FilterControls";
import MenuSections from "../components/MenuSections";
import { useMenu } from "../context/MenuContext";
import { useMenuFilter } from "../hooks/useMenuFilter";

export default function FilterMenuScreen() {
  const { items } = useMenu();
  const filter = useMenuFilter(items);
  return (
    <div className="px-5 pb-4">
      <FilterControls
        query={filter.query} onQuery={filter.setQuery}
        course={filter.course} onCourse={filter.setCourse}
        isActive={filter.isActive} onClear={filter.clear} resultCount={filter.filtered.length}
      />
      {filter.filtered.length === 0 ? (
        <EmptyState icon={<SearchX size={28} />} title="No dishes match" hint="Try a different name or clear the filter to see everything again." />
      ) : (
        <MenuSections items={filter.filtered} />
      )}
    </div>
  );
}
