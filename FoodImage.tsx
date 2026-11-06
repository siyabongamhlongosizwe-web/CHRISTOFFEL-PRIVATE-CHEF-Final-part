import { useState } from "react";
import { CakeSlice, Salad, UtensilsCrossed } from "lucide-react";
import type { Course } from "../types";

const ICONS = { Starter: Salad, Main: UtensilsCrossed, Dessert: CakeSlice } as const;

interface Props {
  src?: string;
  course: Course;
  alt: string;
  size?: number;
}

/** Shows the dish photo, or a styled placeholder icon when there is no (working) image. */
export default function FoodImage({ src, course, alt, size = 56 }: Props) {
  const [failed, setFailed] = useState(false);
  const Icon = ICONS[course];
  const box = { width: size, height: size };

  if (!src || failed) {
    return (
      <div className="flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#2A2210] to-[#15120A] text-gold" style={box}>
        <Icon size={size * 0.45} strokeWidth={1.5} />
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} className="shrink-0 rounded-lg object-cover" style={box} />;
}
