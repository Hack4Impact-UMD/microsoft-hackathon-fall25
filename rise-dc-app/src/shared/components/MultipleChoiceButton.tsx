import { useState } from "react";
import OptionButton from "./OptionButton";
import { twMerge } from "tailwind-merge";
import { SelectableItem } from "../types";

interface ChoiceGroupProps {
  question: string;
  isRequired?: boolean;
  label?: string;
  value?: SelectableItem;
  items: SelectableItem[];
  errorMessage?: string;
  onOptionSelect: (selected: SelectableItem | null) => void;
  className?: string;
  disabled?: boolean;
}

const ChoiceGroup: React.FC<ChoiceGroupProps> = ({
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
  const [selectedOption, setSelectedOption] = useState<SelectableItem | null>(value || null);

  const handleSelectClick = (item: SelectableItem) => {
    setSelectedOption(item);
    onOptionSelect(item);
  };

  return (
    <main className={twMerge("flex flex-col min-w-52", className)}>
      <span className="text-xl font-normal">
        {question}
        {isRequired && <span className="text-red-600 ml-px">*</span>}
        {!isRequired && <span className="font-light text-xs"> (Optional)</span>}
      </span>
      {label && (
        <div className="mb-2 text-sm text-gray-600">{label}</div>
      )}
      <div className="flex flex-wrap gap-4 mt-2">
        {items.map((item, index) => (
          <OptionButton
            key={item.id}
            item={item}
            buttonType="choice"
            isSelected={selectedOption?.id === item.id}
            onClick={() => handleSelectClick(item)}
            disabled={disabled}
            itemIndex={index}
          />
        ))}
      </div>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </main>
  );
};

export default ChoiceGroup;
