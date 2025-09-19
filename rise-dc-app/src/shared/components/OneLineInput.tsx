import { twMerge } from "tailwind-merge";

interface OneLineInputProps {
  title?: string;
  isRequired?: boolean;
  value: string;
  onChange: (value: string) => void;
  minWords?: number;
  maxWords?: number;
  placeholderText?: string;
  className?: string;
}

const OneLineInput: React.FC<OneLineInputProps> = ({
  title,
  isRequired,
  value,
  onChange,
  placeholderText = "",
  className = ""
}) => {
  return (
    <div>
      <h1 className="text-2xl mb-2">{title}</h1>
      <input
        value={value}
        className={twMerge("max-w-96 mt-auto p-2 w-full rounded-md border border-[#727272]", className)}
        required={isRequired}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholderText || "Enter your response..."}
      />
    </div>
  );
};

export default OneLineInput;
