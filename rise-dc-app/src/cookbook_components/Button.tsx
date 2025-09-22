import React, { ReactNode } from "react";

// Reusable Tailwind button component
type ButtonProps = {
  label: ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
      <button
        onClick={onClick}
        className={`px-20 py-3 rounded-xl bg-[#0F6CBD] cursor-pointer text-white font-semibold shadow-md hover:bg-[#0B4F8C] transition duration-200 ${className}`}
        >
        {label}
      </button>
  );
};

export default Button;