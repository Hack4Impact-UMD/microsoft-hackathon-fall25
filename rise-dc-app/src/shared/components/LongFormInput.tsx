import React, { useState } from "react";

interface LongFormProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;
  error?: string;
  onValueChange?: (value: string) => void;
}

const LongFormInput: React.FC<LongFormProps> = ({
  label,
  error,
  className = "",
  onValueChange,
  ...props
}) => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (onValueChange) {
      onValueChange(e.target.value);
    }
  };

  return (
    <div className="w-full p-20">
      {label && (
        <label className="block mb-2 text-sm font-medium text-black">
          {label}
        </label>
      )}
      <textarea
        className={`w-full min-h-[120px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y bg-white text-gray-900 border-gray-300 placeholder-[#BAB6B6] ${
          error ? "border-red-500" : ""
        } ${className}`}
        value={text}
        onChange={handleChange}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default LongFormInput;
