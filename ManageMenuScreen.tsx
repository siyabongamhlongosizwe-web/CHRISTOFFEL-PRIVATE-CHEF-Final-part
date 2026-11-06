import { Pencil, SearchX, Trash2, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";
import FilterControls from "../components/FilterControls";
import MenuCard from "../components/MenuCard";
import { useMenu } from "../context/MenuContext";
import { useMenuFilter } from "../hooks/useMenuFilter";
import type { MenuItem } from "../types";

export default function ManageMenuScreen({ onEdit }: { onEdit: (id: string) => void }) {
  const { items, deleteItem, showToast } = useMenu();
  const filter = useMenuFilter(items);
  const [pendingDelete, setPendingDelete] = useState<MenuItem | null>(null);

  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteItem(pendingDelete.id);
    showToast("success", `"${pendingDelete.name}" was removed from the menu.`);
    setPendingDelete(null);
  };

  return (
    <div className="px-5 pb-4">
      <FilterControls
        query={filter.query} onQuery={filter.setQuery}
        course={filter.course} onCourse={filter.setCourse}
        isActive={filter.isActive} onClear={filter.clear} resultCount={filter.filtered.length}
      />

      <div className="mt-4 flex flex-col gap-2">
        {filter.filtered.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            subtitle="course"
            actions={
              <>
                <button onClick={() => onEdit(item.id)} aria-label={`Edit ${item.name}`} className="rounded-md p-2 text-gold hover:bg-gold/10"><Pencil size={16} /></button>
                <button onClick={() => setPendingDelete(item)} aria-label={`Delete ${item.name}`} className="rounded-md p-2 text-danger hover:bg-danger/10"><Trash2 size={16} /></button>
              </>
            }
          />
        ))}
      </div>

      {items.length === 0 && <EmptyState icon={<UtensilsCrossed size={28} />} title="No menu items yet" hint="Use the Add tab to create your first dish." />}
      {items.length > 0 && filter.filtered.length === 0 && (
        <EmptyState icon={<SearchX size={28} />} title="No dishes match" hint="Try a different name or clear the filter." />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete this dish?"
          message={`"${pendingDelete.name}" will be removed from the menu. This can't be undone.`}
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
