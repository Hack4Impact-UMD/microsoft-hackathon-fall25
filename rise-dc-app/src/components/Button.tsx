import React from "react";

// Reusable Tailwind button component
type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
      <button
        onClick={onClick}
        className={`px-8 py-3 rounded-xl bg-gray-700 text-white font-semibold shadow-md hover:bg-gray-800 transition duration-200 ${className}`}
        >
        {text}
      </button>
  );
};

export default Button;