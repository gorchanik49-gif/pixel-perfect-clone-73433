import { Minus, Plus } from "lucide-react";

export function QuantityPicker({
  value,
  onChange,
  label = "Quantity",
}: {
  value: number;
  onChange: (next: number) => void;
  label?: string;
}) {
  return (
    <div className="border-border bg-surface inline-flex items-center rounded-full border">
      <button
        type="button"
        aria-label={`Decrease ${label.toLowerCase()}`}
        onClick={() => onChange(Math.max(1, value - 1))}
        className="hover:text-primary rounded-full p-2.5 text-foreground/70 transition-colors"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span aria-live="polite" className="w-10 text-center text-sm font-bold">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label.toLowerCase()}`}
        onClick={() => onChange(value + 1)}
        className="hover:text-primary rounded-full p-2.5 text-foreground/70 transition-colors"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
