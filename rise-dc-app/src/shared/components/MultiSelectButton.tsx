import { useEffect, useState } from "react";
import OptionButton from "./OptionButton";
import { twMerge } from "tailwind-merge";

interface MultiSelectGroupProps<T extends {name: string, image_id: string}> {
  question: string;
  isRequired?: boolean;
  label?: string;
  value?: T[];
  items: T[];
  onOptionSelect: (selected: T[]) => void;
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
}

const MultiSelectGroup = <T extends {name: string, image_id: string}>({
  question,
  isRequired,
  label,
  value,
  items,
  onOptionSelect,
  className = "",
  disabled,
  errorMessage,
}: MultiSelectGroupProps<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<T[]>(value || []);

  useEffect(() => {
    setSelectedOptions(value || []);
  }, [value]);

  const handleSelectClick = (item: T) => {
    const updatedSelections = selectedOptions.some(selected => (selected as any).id === (item as any).id)
      ? selectedOptions.filter((selected) => (selected as any).id !== (item as any).id)
      : [...selectedOptions, item];
    setSelectedOptions(updatedSelections);
    onOptionSelect(updatedSelections);
  };

  return (
    <main className={twMerge("flex flex-col min-w-60", className)}>
      <span className="text-xl font-normal mb-2">
        {question}
        {isRequired && <span className="text-red-600 ml-px">*</span>}
        {!isRequired && <span className="font-light text-xs"> (Optional)</span>}
      </span>

      {label && (
        <div className="mb-2 text-sm text-gray-600">{label}</div>
      )}

      <div className="flex flex-wrap gap-4 mt-2">
        {items.map((item) => (
          <OptionButton
            key={(item as any).id}
            item={item}
            buttonType="multiSelect"
            isSelected={selectedOptions.some(selected => (selected as any).id === (item as any).id)}
            onClick={() => handleSelectClick(item)}
            disabled={disabled}
          />
        ))}
      </div>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </main>
  );
};

export default MultiSelectGroup;
