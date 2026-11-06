import { BarChart3, Filter, Home, ListChecks, Plus } from "lucide-react";
import type { ReactNode } from "react";
import type { Screen } from "../types";

const TABS: { key: Screen; label: string; icon: ReactNode }[] = [
  { key: "home", label: "Home", icon: <Home size={19} /> },
  { key: "add", label: "Add", icon: <Plus size={19} /> },
  { key: "manage", label: "Manage", icon: <ListChecks size={19} /> },
  { key: "filter", label: "Filter", icon: <Filter size={19} /> },
  { key: "stats", label: "Stats", icon: <BarChart3 size={19} /> },
];

export default function TabBar({ active, onChange }: { active: Screen; onChange: (s: Screen) => void }) {
  return (
    <nav className="flex border-t border-ink-line bg-[#0F0F0F] px-1 pb-3 pt-2" aria-label="Main navigation">
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-1 flex-col items-center gap-1 py-1 text-[10px] font-medium transition-colors ${
              isActive ? "text-gold" : "text-[#7C7C7C] hover:text-cream"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            <span className={`h-[2px] w-5 rounded-full ${isActive ? "bg-gold" : "bg-transparent"}`} />
          </button>
        );
      })}
    </nav>
  );
}
