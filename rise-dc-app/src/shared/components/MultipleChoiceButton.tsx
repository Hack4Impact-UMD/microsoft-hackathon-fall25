import { useState } from "react";
import OptionButton from "./OptionButton";
import { twMerge } from "tailwind-merge";

interface ChoiceGroupProps<T extends { name: string; image_id: string }> {
  question: string;
  isRequired?: boolean;
  label?: string;
  value?: T;
  items: T[];
  errorMessage?: string;
  onOptionSelect: (selected: T | null) => void;
  className?: string;
  disabled?: boolean;
}

const ChoiceGroup = <T extends { name: string; image_id: string }>({
  question,
  isRequired,
  label,
  value,
  items,
  onOptionSelect,
  className = "",
  disabled,
  errorMessage,
}: ChoiceGroupProps<T>) => {
  const [selectedOption, setSelectedOption] = useState<T | null>(value || null);

  const handleSelectClick = (item: T) => {
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
      {label && <div className="mb-2 text-sm text-gray-600">{label}</div>}
      <div className="flex flex-wrap gap-4 mt-2">
        {items.map((item) => (
          <OptionButton
            key={(item as any).id}
            item={item}
            buttonType="choice"
            isSelected={(selectedOption as any)?.id === (item as any).id}
            onClick={() => handleSelectClick(item)}
            disabled={disabled}
          />
        ))}
      </div>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </main>
  );
};

export default ChoiceGroup;
