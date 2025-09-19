import React from "react";

interface LongFormProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const LongForm: React.FC<LongFormProps> = ({ label, error, className = "", ...props }) => (
    <div className="w-full">
        {label && (
            <label className="block mb-2 text-sm font-medium text-gray-700">
                {label}
            </label>
        )}
        <textarea
            className={`w-full min-h-[120px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y bg-white text-gray-900 border-gray-300 ${error ? "border-red-500" : ""} ${className}`}
            {...props}
        />
        {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
    </div>
);

export default LongForm;