import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface OptionButtonProps<T extends { name: string; image_id: string }> {
  item: T;
  buttonType: "choice" | "multiSelect";
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
}

const OptionButton = <T extends { name: string; image_id: string }>({
  item,
  buttonType,
  isSelected,
  onClick,
  className = "",
  disabled,
  errorMessage,
}: OptionButtonProps<T>) => {
  const [clicked, setClicked] = useState(isSelected);

  useEffect(() => {
    setClicked(isSelected);
  }, [isSelected]);

  const handleClick = () => {
    if (!disabled) {
      setClicked(!clicked);
      onClick();
    }
  };

  const getItemDisplayText = () => {
    const itemAny = item as any;
    switch (itemAny.type) {
      case "ingredient":
        return itemAny.quantity
          ? `${itemAny.quantity} ${item.name}`
          : item.name;
      case "custom":
        return itemAny.caption || item.name;
      default:
        return item.name;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={twMerge(
        "relative flex flex-col items-center p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer hover:shadow-md",
        clicked
          ? "border-orange-500 bg-orange-50"
          : "border-gray-300 bg-white hover:border-gray-400",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{ width: 300 }} // match ImageCard width
      disabled={disabled}
    >
      {buttonType === "choice" ? (
        clicked && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
            <svg
              className="w-4 h-4 text-white"
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
          </div>
        )
      ) : (
        <div
          className={twMerge(
            "absolute top-1 right-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors duration-200 z-10",
            clicked
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-400 bg-white text-transparent hover:bg-gray-100"
          )}
        >
          {clicked && (
            <svg
              className="w-4 h-4"
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
      )}

      <div className="w-full h-48 mb-3 rounded-lg flex items-center justify-center overflow-hidden">
        <img
          src={item.image_id}
          alt={item.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            target.parentElement!.innerHTML = `
              <span class="text-2xl font-bold text-white">
                ${item.name.charAt(0).toUpperCase()}
              </span>
            `;
          }}
        />
      </div>

      <span className="text-sm font-medium text-center text-gray-800 mt-1">
        {getItemDisplayText()}
      </span>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </button>
  );
};

export default OptionButton;
