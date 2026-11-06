import type { Course, CourseFilter, MenuItem, MenuItemDraft } from "../types";

export const COURSES: Course[] = ["Starter", "Main", "Dessert"];
export const COURSE_PLURAL: Record<Course, string> = { Starter: "Starters", Main: "Mains", Dessert: "Desserts" };
export const FILTER_OPTIONS: CourseFilter[] = ["All", ...COURSES];

export const filterLabel = (f: CourseFilter): string => (f === "All" ? "All" : COURSE_PLURAL[f]);

export const formatPrice = (value: number): string =>
  `R${Number.isInteger(value) ? value : value.toFixed(2)}`;

export const averagePrice = (items: MenuItem[]): number =>
  items.length === 0 ? 0 : Math.round(items.reduce((sum, i) => sum + i.price, 0) / items.length);

export const itemsInCourse = (items: MenuItem[], course: Course): MenuItem[] =>
  items.filter((i) => i.course === course);

export const averageForCourse = (items: MenuItem[], course: Course): number =>
  averagePrice(itemsInCourse(items, course));

export const searchAndFilter = (items: MenuItem[], query: string, course: CourseFilter): MenuItem[] => {
  const q = query.trim().toLowerCase();
  return items.filter(
    (i) => (course === "All" || i.course === course) && (q === "" || i.name.toLowerCase().includes(q)),
  );
};

export type DraftErrors = Partial<Record<"name" | "description" | "price", string>>;

export interface RawDraft {
  name: string;
  description: string;
  course: Course;
  price: string;
  image?: string;
}

/** Returns a map of field errors (empty object = valid). */
export function validateDraft(draft: RawDraft, existing: MenuItem[], editingId?: string | null): DraftErrors {
  const errors: DraftErrors = {};
  const name = draft.name.trim();
  const description = draft.description.trim();

  if (!name) errors.name = "Dish name is required.";
  else if (name.length < 2) errors.name = "Dish name must be at least 2 characters.";
  else if (name.length > 40) errors.name = "Dish name must be 40 characters or fewer.";
  else if (existing.some((i) => i.id !== editingId && i.name.trim().toLowerCase() === name.toLowerCase()))
    errors.name = "A dish with this name is already on the menu.";

  if (!description) errors.description = "Please add a short description.";
  else if (description.length > 80) errors.description = "Description must be 80 characters or fewer.";

  const price = Number(draft.price);
  if (draft.price.trim() === "") errors.price = "Price is required.";
  else if (Number.isNaN(price)) errors.price = "Price must be a number.";
  else if (price <= 0) errors.price = "Price must be greater than R0.";
  else if (price > 10000) errors.price = "Price must be R10 000 or less.";
  else if (!/^\d+(\.\d{1,2})?$/.test(draft.price.trim())) errors.price = "Use at most 2 decimal places.";

  return errors;
}

export const toMenuItemDraft = (d: RawDraft): MenuItemDraft => ({
  name: d.name.trim(),
  description: d.description.trim(),
  course: d.course,
  price: Number(d.price),
  image: d.image,
});
