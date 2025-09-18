import React from 'react';

// Define the props for our reusable modal
type ConfirmationModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    itemName: string;
};

export default function ConfirmationModal({
    isOpen,
    onConfirm,
    onCancel,
    title,
    itemName,
}: ConfirmationModalProps) {
    // If the modal isn't open, we don't render anything
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
                <div className="mb-6">
                    <p className="text-xl font-semibold text-gray-800">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{itemName}</p>
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="w-28 py-2 text-lg font-bold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-28 py-2 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}