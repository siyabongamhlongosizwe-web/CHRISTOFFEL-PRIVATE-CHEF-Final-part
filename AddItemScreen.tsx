import { ImagePlus, X } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import ChipGroup from "../components/ChipGroup";
import FormField from "../components/FormField";
import GoldButton from "../components/GoldButton";
import FoodImage from "../components/FoodImage";
import { useMenu } from "../context/MenuContext";
import type { Course } from "../types";
import { COURSES, validateDraft, toMenuItemDraft, type DraftErrors, type RawDraft } from "../utils/menu";

const EMPTY: RawDraft = { name: "", description: "", course: "Starter", price: "", image: undefined };
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

interface Props {
  /** When set the screen edits that item instead of creating a new one. */
  editingId: string | null;
  onFinishedEditing: () => void;
}

export default function AddItemScreen({ editingId, onFinishedEditing }: Props) {
  const { items, addItem, updateItem, showToast } = useMenu();
  const editing = editingId ? items.find((i) => i.id === editingId) : undefined;

  const [draft, setDraft] = useState<RawDraft>(
    editing ? { name: editing.name, description: editing.description, course: editing.course, price: String(editing.price), image: editing.image } : EMPTY,
  );
  const [errors, setErrors] = useState<DraftErrors>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof RawDraft>(key: K, value: RawDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return showToast("error", "Please choose an image file.");
    if (file.size > MAX_IMAGE_BYTES) return showToast("error", "Image is too large (max 2 MB).");
    const reader = new FileReader();
    reader.onload = () => set("image", String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const found = validateDraft(draft, items, editingId);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      showToast("error", "Please fix the highlighted fields.");
      return;
    }
    const payload = toMenuItemDraft(draft);
    if (editing) {
      updateItem(editing.id, payload);
      showToast("success", `"${payload.name}" was updated.`);
      onFinishedEditing();
    } else {
      addItem(payload);
      showToast("success", `"${payload.name}" was added to the menu.`);
      setDraft(EMPTY);
    }
  };

  return (
    <div className="px-5 pb-4">
      <FormField label="Dish Name" placeholder="e.g. Grilled Prawns" value={draft.name} maxLength={40} error={errors.name} onChange={(e) => set("name", e.target.value)} />
      <FormField multiline label="Description" placeholder="e.g. Garlic & lemon prawns" value={draft.description} maxLength={80} error={errors.description} hint={`${draft.description.length}/80`} onChange={(e) => set("description", e.target.value)} />

      <div className="mb-3.5">
        <p className="mb-1.5 text-[11px] font-medium text-cream/90">Course</p>
        <ChipGroup<Course> options={COURSES} value={draft.course} onChange={(c) => set("course", c)} />
      </div>

      <FormField label="Price (R)" placeholder="120" inputMode="decimal" value={draft.price} error={errors.price} onChange={(e) => set("price", e.target.value)} />

      <div className="mb-5">
        <p className="mb-1.5 text-[11px] font-medium text-cream/90">Photo <span className="text-muted">(optional)</span></p>
        <div className="flex items-center gap-3">
          <FoodImage src={draft.image} course={draft.course} alt="Dish preview" size={52} />
          <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center gap-1.5 rounded-lg border border-ink-line px-3 py-2 text-[12px] text-cream hover:border-gold/60">
            <ImagePlus size={15} className="text-gold" /> {draft.image ? "Change photo" : "Upload photo"}
          </button>
          {draft.image && (
            <button type="button" onClick={() => set("image", undefined)} aria-label="Remove photo" className="text-muted hover:text-danger"><X size={16} /></button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
        </div>
      </div>

      <GoldButton onClick={handleSubmit}>{editing ? "Save Changes" : "Add Item"}</GoldButton>
      {editing && <GoldButton variant="outline" className="mt-2" onClick={onFinishedEditing}>Cancel</GoldButton>}
    </div>
  );
}
