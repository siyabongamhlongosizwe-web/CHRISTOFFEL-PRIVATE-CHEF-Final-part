import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  error?: string;
  hint?: string;
}

type InputProps = BaseProps & { multiline?: false } & InputHTMLAttributes<HTMLInputElement>;
type AreaProps = BaseProps & { multiline: true } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function FormField(props: InputProps | AreaProps) {
  const { label, error, hint, multiline, ...rest } = props;
  const cls = `w-full rounded-lg border bg-ink-panel px-3 py-2.5 text-[13px] text-cream outline-none transition-colors placeholder:text-[#5E5E5E] focus:border-gold ${
    error ? "border-danger" : "border-ink-line"
  }`;
  const id = `field-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className="mb-3.5">
      <label htmlFor={id} className="mb-1.5 block text-[11px] font-medium text-cream/90">{label}</label>
      {multiline ? (
        <textarea id={id} rows={3} className={`${cls} resize-none`} aria-invalid={!!error} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input id={id} className={cls} aria-invalid={!!error} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error ? <p className="mt-1 text-[11px] text-danger" role="alert">{error}</p> : hint ? <p className="mt-1 text-[10px] text-muted">{hint}</p> : null}
    </div>
  );
}
