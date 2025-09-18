interface OneLineInputProps {
  isRequired?: boolean;
  value: string;
  onChange: (value: string) => void;
  minWords?: number;
  maxWords?: number;
  placeholderText?: string;
}

const OneLineInput: React.FC<OneLineInputProps> = ({
  isRequired,
  onChange,
  placeholderText = "",
}) => {
  return (
    <div>
      <input
        className="max-w-96 mt-auto p-2 w-full rounded-md border"
        style={{ borderColor: "#727272" }}
        required={isRequired}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholderText || "Enter your response..."}
      />
    </div>
  );
};

export default OneLineInput;
