import { useState } from "react";

type ListScrollProps<T extends { name: string; id: string }> = {
  items: T[];
};

export default function ListScroll<T extends { name: string; id: string }>({
  items,
}: ListScrollProps<T>) {
  const [selected, setSelected] = useState<T>(items[0]);

  return (
    <div className="flex flex-col gap-2">
      <div className="border-gray-200 border-[1px] rounded-lg max-w-[230px] max-h-[282px] overflow-y-auto shadow-lg">
        {items.map((item) => (
          <div
            key={item.name}
            onClick={() => setSelected(item)}
            className={`border-gray-200 border-t border-b p-3 cursor-pointer font-medium ${
              selected.id == item.id ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
