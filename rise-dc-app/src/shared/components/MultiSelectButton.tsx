import { useEffect, useState } from "react";
import OptionButton from "./OptionButton";
import { twMerge } from "tailwind-merge";
import { SelectableItem } from "../types";

interface MultiSelectGroupProps {
  question: string;
  isRequired?: boolean;
  label?: string;
  value?: SelectableItem[];
  items: SelectableItem[];
  onOptionSelect: (selected: SelectableItem[]) => void;
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
}

const MultiSelectGroup: React.FC<MultiSelectGroupProps> = ({
  question,
  isRequired,
  label,
  value,
  items,
  onOptionSelect,
  className = "",
  disabled,
  errorMessage,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectableItem[]>(value || []);

  useEffect(() => {
    setSelectedOptions(value || []);
  }, [value]);

  const handleSelectClick = (item: SelectableItem) => {
    const updatedSelections = selectedOptions.some(selected => selected.id === item.id)
      ? selectedOptions.filter((selected) => selected.id !== item.id)
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
            key={item.id}
            item={item}
            buttonType="multiSelect"
            isSelected={selectedOptions.some(selected => selected.id === item.id)}
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
