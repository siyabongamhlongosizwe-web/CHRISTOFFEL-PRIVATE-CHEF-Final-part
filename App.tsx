import { useState } from "react";
import AppHeader from "./components/AppHeader";
import StatusBar from "./components/StatusBar";
import TabBar from "./components/TabBar";
import Toast from "./components/Toast";
import { MenuProvider } from "./context/MenuContext";
import AddItemScreen from "./screens/AddItemScreen";
import FilterMenuScreen from "./screens/FilterMenuScreen";
import HomeScreen from "./screens/HomeScreen";
import ManageMenuScreen from "./screens/ManageMenuScreen";
import StatsScreen from "./screens/StatsScreen";
import type { Screen } from "./types";

const TITLES: Record<Exclude<Screen, "home">, string> = {
  add: "Add Menu Item",
  manage: "Manage Menu",
  filter: "Filter Menu",
  stats: "Menu Statistics",
};

function Shell() {
  const [screen, setScreen] = useState<Screen>("home");
  const [editingId, setEditingId] = useState<string | null>(null);

  const go = (next: Screen) => {
    if (next !== "add") setEditingId(null);
    setScreen(next);
  };
  const startEdit = (id: string) => {
    setEditingId(id);
    setScreen("add");
  };
  const finishEdit = () => {
    setEditingId(null);
    setScreen("manage");
  };

  const title = screen === "add" && editingId ? "Edit Menu Item" : screen === "home" ? undefined : TITLES[screen];

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070707] sm:py-8">
      <div className="relative w-full max-w-[390px] rounded-none bg-black p-0 sm:rounded-[2.75rem] sm:p-3 sm:shadow-[0_30px_80px_rgba(0,0,0,0.8)] sm:ring-1 sm:ring-[#2a2a2a]">
        <div className="relative flex h-screen flex-col overflow-hidden bg-ink font-sans sm:h-[780px] sm:rounded-[2.2rem]">
          <StatusBar />
          <AppHeader title={title} onBack={screen === "home" ? undefined : () => (editingId ? finishEdit() : go("home"))} onMenu={screen === "home" ? () => go("manage") : undefined} />

          <main className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
            {screen === "home" && <HomeScreen />}
            {screen === "add" && <AddItemScreen key={editingId ?? "new"} editingId={editingId} onFinishedEditing={finishEdit} />}
            {screen === "manage" && <ManageMenuScreen onEdit={startEdit} />}
            {screen === "filter" && <FilterMenuScreen />}
            {screen === "stats" && <StatsScreen />}
          </main>

          <TabBar active={screen} onChange={go} />
          <Toast />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MenuProvider>
      <Shell />
    </MenuProvider>
  );
}
