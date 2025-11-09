import { useState } from "react";

// Props for Servings component
export interface ServingsProps {
  count?: number;
  onChange?: (nextValue: number) => void;
  className?: string;
}

// Servings component
export default function Servings({
  count = 4,
  onChange,
  className = "",
}: ServingsProps) {
  const [selected, setSelected] = useState(1);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleSelect = (n: number) => {
    // Commented out click functionality
    // setSelected(n);
    // onChange?.(n);
  };

  const intCount = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
  return (
    <div
      role="group"
      className={`flex flex-wrap gap-3 ${className}`}
      aria-label="Servings selector"
    >
      {Array.from({ length: intCount }, (_, idx) => {
        const n = idx + 1;
        const filled = selected >= n;
        const showHover = hovered === n && !filled;

        const base =
          "relative w-15 aspect-square rounded-full border flex items-center justify-center select-none cursor-pointer transition-colors hover:-2 hover:border-[#0C77D9]";
        const colors = filled
          ? "bg-[#0E4775] text-white"
          : showHover
            ? "bg-[#0C77D9] text-white"
            : "bg-white border-black text-black";

        return (
          <button
            key={n}
            type="button"
            className={`${base} ${colors}`}
            tabIndex={0}
            aria-label={`${n} serving${n > 1 ? "s" : ""}`}
            aria-pressed={filled}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleSelect(n)} // Click does nothing now
            onFocus={() => setHovered(n)}
            onBlur={() => setHovered(null)}
          >
            <span className="font-semibold">{n}</span>
          </button>
        );
      })}
    </div>
  );
}
