import { useState } from "react";

interface MultipleSelectOptionProps<
  T extends { image_id: string; name: string }
> {
  src: string;
  item: T;
  height?: number;
  width?: number;
  alt?: string;
  className?: string;
  onToggle?: (item: T, hasItem: boolean) => void;
  quantity: number;
  checked?: boolean;
}

function MultipleSelectOption<T extends { image_id: string; name: string }>({
  src,
  item,
  height,
  width,
  alt,
  className,
  onToggle,
  quantity,
  checked,
}: MultipleSelectOptionProps<T>) {
  const handleToggle = () => {
    const currState = !checked;
    onToggle?.(item, currState);
  };

  return (
    <div
      className={`flex flex-col border-2 rounded-lg items-center w-fit relative ${className}`}
    >
      <div
        onClick={handleToggle}
        className={`absolute top-1 right-1 w-6 h-6 sm:w-8 sm:h-8 rounded border border-gray-800 flex items-center justify-center transition-colors duration-200 z-10 ${
          checked
            ? "bg-gray-800 text-white"
            : "bg-white text-transparent hover:bg-gray-100"
        }`}
        aria-label={`Toggle ${item} availability`}
      >
        {checked && (
          <svg
            className="w-3 h-3 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>

      <img
        src={src}
        alt={alt || `${item} ingredient`}
        style={height || width ? { height, width } : undefined}
        className={`object-cover rounded-t-lg ${
          height || width ? "" : "w-full"
        }`}
      />
      <div className="w-full text-lg text-center py-5 font-bold rounded-b-lg">
        {quantity} {item.name}
      </div>
    </div>
  );
}

export default MultipleSelectOption;
