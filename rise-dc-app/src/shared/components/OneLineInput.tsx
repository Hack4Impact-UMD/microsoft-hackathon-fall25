interface OneLineInputProps {
  title: string;
  isRequired?: boolean;
  value: string;
  onChange: (value: string) => void;
  minWords?: number;
  maxWords?: number;
  placeholderText?: string;
}

const OneLineInput: React.FC<OneLineInputProps> = ({
  title,
  isRequired,
  onChange,
  placeholderText = "",
}) => {
  return (
    <div>
      <h1 className="text-2xl mb-2">{title}</h1>
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
