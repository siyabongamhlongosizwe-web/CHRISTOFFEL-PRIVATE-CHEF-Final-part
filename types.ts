export type Course = "Starter" | "Main" | "Dessert";
export type CourseFilter = "All" | Course;
export type Screen = "home" | "add" | "manage" | "filter" | "stats";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
  image?: string; // URL, /public path or data URL
}

export type MenuItemDraft = Omit<MenuItem, "id">;

export interface ToastMessage {
  id: number;
  type: "success" | "error" | "info";
  text: string;
}
