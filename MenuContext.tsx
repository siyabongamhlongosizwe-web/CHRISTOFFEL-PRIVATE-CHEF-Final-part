import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { MenuItem, MenuItemDraft, ToastMessage } from "../types";
import { SEED_MENU } from "../data/seed";

interface MenuContextValue {
  items: MenuItem[];
  addItem: (draft: MenuItemDraft) => MenuItem;
  updateItem: (id: string, draft: MenuItemDraft) => void;
  deleteItem: (id: string) => void;
  toast: ToastMessage | null;
  showToast: (type: ToastMessage["type"], text: string) => void;
  dismissToast: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

/** Menu items live in an array and are shared with every screen through React Context. */
export function MenuProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>(SEED_MENU);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const nextId = useRef(100);

  const showToast = useCallback((type: ToastMessage["type"], text: string) => {
    setToast({ id: Date.now(), type, text });
  }, []);
  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const addItem = useCallback((draft: MenuItemDraft) => {
    const item: MenuItem = { ...draft, id: String(nextId.current++) };
    setItems((prev) => [...prev, item]);
    return item;
  }, []);

  const updateItem = useCallback((id: string, draft: MenuItemDraft) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...draft } : i)));
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const value = useMemo(
    () => ({ items, addItem, updateItem, deleteItem, toast, showToast, dismissToast }),
    [items, addItem, updateItem, deleteItem, toast, showToast, dismissToast],
  );
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used inside <MenuProvider>");
  return ctx;
}
