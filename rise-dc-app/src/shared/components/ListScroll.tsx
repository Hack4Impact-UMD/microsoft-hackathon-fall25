import { useState } from "react";

type ListScrollProps<T extends { name: string, id: string }> = {
  items: T[];
};

export default function ListScroll<T extends { name: string, id: string }>({ items }: ListScrollProps<T>) {
  const [selected, setSelected] = useState<string>(items[0].id);

  return (
    <div className="flex flex-col gap-2">
      <div className="border-gray-200 border-[1px] rounded-lg w-[230px] h-[282px] overflow-y-auto shadow-lg">
        {items.map((item) => (
          <div
            key={item.name}
            onClick={() => setSelected(item.id)}
            className={`border-gray-200 border-t border-b p-3 cursor-pointer font-medium ${
              selected.includes(item.name)
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
