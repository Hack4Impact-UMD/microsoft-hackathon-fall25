import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ModalHeader from "./ModalHeader";

interface CreateTaskNameStepProps {
  onBack: () => void;
  onNext: () => void;
  onClose: () => void;
  taskName: string;
  onTaskNameChange: (name: string) => void;
}

const CreateTaskNameStep: React.FC<CreateTaskNameStepProps> = ({
  onBack,
  onNext,
  onClose,
  taskName,
  onTaskNameChange,
}) => {
  const [inputValue, setInputValue] = useState(taskName);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onTaskNameChange(value);
  };

  const handleAddTime = () => {
    if (inputValue.trim()) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
      <ModalHeader
        onBack={onBack}
        onClose={onClose}
        title="Creating custom task"
        iconType="edit"
      />
      <div className="mb-8">
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full px-4 py-3 border border-orange-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500"
            placeholder="Water Plant"
            value={inputValue}
            onChange={handleInputChange}
          />
          {inputValue.trim() && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setInputValue("");
                onTaskNameChange("");
              }}
            >
              <CloseIcon
                className="text-gray-800"
                style={{ fontSize: "30px" }}
              />
            </button>
          )}
        </div>
        {inputValue.trim() && (
          <div className="mb-6">
            <div className="bg-orange-500 text-white px-4 py-3 rounded-lg font-medium">
              {inputValue}
            </div>
          </div>
        )}
      </div>
      <button
        className={`w-full py-3 rounded-full font-medium transition-colors ${
          !inputValue.trim()
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={handleAddTime}
        disabled={!inputValue.trim()}
      >
        Add Time
      </button>
    </div>
  );
};

export default CreateTaskNameStep;
