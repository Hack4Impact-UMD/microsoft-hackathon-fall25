import React from "react";

// Reusable Tailwind button component that centers horizontally on the page
type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <div className="flex justify-center items-center mt-6">
      <button
        onClick={onClick}
        className={`px-8 py-3 rounded-xl bg-gray-700 text-white font-semibold shadow-md hover:bg-gray-800 transition duration-200 ${className}`}
        >
        {text}
      </button>
    </div>
  );
};

export default Button;