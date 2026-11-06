import type { MenuItem } from "../types";

// Starting menu (matches the design: 6 items, averages R105 / R225 / R95).
export const SEED_MENU: MenuItem[] = [
  { id: "1", name: "Grilled Prawns", description: "Garlic & lemon prawns", course: "Starter", price: 120, image: "/images/prawns.jpg" },
  { id: "2", name: "Tomato Soup", description: "Fresh herbs", course: "Starter", price: 90, image: "/images/soup.jpg" },
  { id: "3", name: "Fillet Steak", description: "Served with chips", course: "Main", price: 250, image: "/images/steak.jpg" },
  { id: "4", name: "Pan-Seared Fish", description: "Seasonal vegetables", course: "Main", price: 200, image: "/images/fish.jpg" },
  { id: "5", name: "Chocolate Cake", description: "Dark chocolate", course: "Dessert", price: 100, image: "/images/cake.jpg" },
  { id: "6", name: "Malva Pudding", description: "Warm custard", course: "Dessert", price: 90 },
];
