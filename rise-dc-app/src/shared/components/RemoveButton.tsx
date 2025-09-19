
import { twMerge } from "tailwind-merge";

interface RemoveButtonProps<T extends {name: string, image_id: string}> {
  items: T[];
  onRemove: (item: T) => void;
  className?: string;
  disabled?: boolean;
  question?: string;
  isRequired?: boolean;
  label?: string;
  errorMessage?: string;
}

const RemoveButton = <T extends {name: string, image_id: string}>({
  items,
  onRemove,
  className = "",
  disabled = false,
  question,
  isRequired,
  label,
  errorMessage,
}: RemoveButtonProps<T>) => {
  const handleRemove = (item: T) => {
    if (!disabled) {
      onRemove(item);
    }
  };

  const getItemDisplayText = (item: T) => {
    const itemAny = item as any;
    switch (itemAny.type) {
      case 'ingredient':
        return itemAny.quantity ? `${itemAny.quantity} ${item.name}` : item.name;
      case 'custom':
        return itemAny.caption || item.name;
      default:
        return item.name;
    }
  };

  const getItemImageSrc = (item: T) => {
    return `/images/${item.image_id}`;
  };

  return (
    <main className={twMerge("flex flex-col", className)}>
      {question && (
        <span className="text-xl font-normal mb-4">
          {question}
          {isRequired && <span className="text-red-600 ml-px">*</span>}
          {!isRequired && <span className="font-light text-xs"> (Optional)</span>}
        </span>
      )}
      
      {label && (
        <div className="mb-4 text-sm text-gray-600">{label}</div>
      )}
      
      <div className="flex flex-wrap gap-4">
        {items.map((item) => (
          <div
            key={(item as any).id}
            className={twMerge(
              "relative flex flex-col items-center p-4 border-2 border-orange-500 rounded-lg bg-orange-50 min-w-[120px]",
              disabled && "opacity-50"
            )}
          >
            <button
              onClick={() => handleRemove(item)}
              disabled={disabled}
              className={twMerge(
                "absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 z-10 shadow-md",
                disabled && "cursor-not-allowed hover:bg-red-600"
              )}
              aria-label={`Remove ${getItemDisplayText(item)}`}
            >
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
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>

            <div className="w-16 h-16 mb-3 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src={getItemImageSrc(item)}
                alt={item.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <span class="text-2xl font-bold text-gray-600">
                      ${item.name.charAt(0).toUpperCase()}
                    </span>
                  `;
                }}
              />
            </div>

            <span className="text-sm font-medium text-center text-gray-800 mt-1">
              {getItemDisplayText(item)}
            </span>
          </div>
        ))}
      </div>
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </main>
  );
};

export default RemoveButton;
