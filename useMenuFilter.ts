import { useMemo, useState } from "react";
import type { CourseFilter, MenuItem } from "../types";
import { searchAndFilter } from "../utils/menu";

/** Shared search + course filter logic used by the Manage and Filter screens. */
export function useMenuFilter(items: MenuItem[]) {
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState<CourseFilter>("All");
  const filtered = useMemo(() => searchAndFilter(items, query, course), [items, query, course]);
  const isActive = query.trim() !== "" || course !== "All";
  const clear = () => {
    setQuery("");
    setCourse("All");
  };
  return { query, setQuery, course, setCourse, filtered, isActive, clear };
}
