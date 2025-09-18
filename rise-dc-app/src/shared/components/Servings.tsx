import { useState } from "react";

// Props for Servings component
export interface ServingsProps {
  count?: number;
  onChange?: (nextValue: number) => void;
  className?: string;
}

// Servings component
export default function Servings({ count = 4, onChange, className = "" }: ServingsProps) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleSelect = (n: number) => {
    setSelected(n);
    onChange?.(n);
  };

  
  return (
    <div className={`flex flex-wrap gap-3 ${className}`} aria-label="Servings selector">
      {Array.from({ length: Math.max(0, count) }, (_, idx) => {
        const n = idx + 1;
        const filled = selected >= n;
        const showHover = hovered === n && !filled;

        const base =
          "relative w-10 aspect-square rounded-full border flex items-center justify-center select-none cursor-pointer transition-colors";
        const colors = filled
          ? "bg-[#0E4775] border-[#0E4775] text-white"
          : showHover
          ? "bg-[#0C77D9] border-[#0C77D9] text-white"
          : "bg-white border-black text-black";

        return (
          <div
            key={n}
            className={`${base} ${colors}`}
            role="button"
            tabIndex={0}
            aria-label={`${n} serving${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleSelect(n)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(n);
              }
            }}
          >
            <span className="font-semibold">{n}</span>
          </div>
        );
      })}
    </div>
  );
}


// Demo: for 5 bubbles
// export default function Example() {
//   const [servings, setServings] = useState<number>(0)
//   return (
//     <>
//       <Servings count={6} onChange={setServings} />
//       <div>Selected servings: {servings}</div>
//     </>
//   )
// }