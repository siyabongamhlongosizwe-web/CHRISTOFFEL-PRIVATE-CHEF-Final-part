import { FilterX } from "lucide-react";
import type { CourseFilter } from "../types";
import { FILTER_OPTIONS, filterLabel } from "../utils/menu";
import ChipGroup from "./ChipGroup";
import SearchBar from "./SearchBar";

interface Props {
  query: string;
  onQuery: (v: string) => void;
  course: CourseFilter;
  onCourse: (c: CourseFilter) => void;
  isActive: boolean;
  onClear: () => void;
  resultCount: number;
}

/** Search box + course chips + "Clear" – reused on the Manage and Filter screens. */
export default function FilterControls({ query, onQuery, course, onCourse, isActive, onClear, resultCount }: Props) {
  return (
    <div className="space-y-3">
      <SearchBar value={query} onChange={onQuery} />
      <div>
        <p className="mb-2 text-[11px] font-medium text-cream/90">Show</p>
        <ChipGroup options={FILTER_OPTIONS} value={course} onChange={onCourse} label={filterLabel} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-muted" aria-live="polite">
          {resultCount} {resultCount === 1 ? "item" : "items"} shown
        </p>
        {isActive && (
          <button onClick={onClear} className="flex items-center gap-1 text-[11px] font-semibold text-gold hover:text-gold-bright">
            <FilterX size={13} /> Clear search &amp; filter
          </button>
        )}
      </div>
    </div>
  );
}
