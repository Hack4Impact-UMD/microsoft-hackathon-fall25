import { useEffect, useRef, useState } from "react";
import { QuietHobbyModalProps } from "./types";

export default function QuietHobbyModal({
  isOpen,
  onClose,
  timeRange = "09:00AM - 09:15AM",
  hobbies,
  onChooseActivity,
  initialHobbyId = "",
}: QuietHobbyModalProps) {
  const [selectedId, setSelectedId] = useState(initialHobbyId);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedId(initialHobbyId);
    }
  }, [isOpen, initialHobbyId]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60"
        onClick={() => onClose()}
      />

      {/* Modal content */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="qh-title"
        className="fixed inset-0 z-50 grid place-items-center px-6 py-8 pointer-events-none"
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      >
        <div
          ref={dialogRef}
          className="w-full max-w-sm rounded-lg bg-white shadow-2xl p-6 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
              </div>
              <div>
                <h2 id="qh-title" className="text-2xl font-bold text-gray-800">
                  Quiet Time
                </h2>
              </div>
            </div>
            <button
              aria-label="Close"
              onClick={() => onClose?.()}
              className="ml-4 h-8 w-8 grid place-items-center rounded-full bg-pink-500 text-white text-lg hover:brightness-95 active:scale-95 transition-transform"
            >
              ×
            </button>
          </div>

          <p className="text-base text-gray-700 mb-4">
            Choose a quiet activity to enjoy!
          </p>

          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-800 mb-3">
              Choose an activity:
            </label>
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
              {hobbies.map((hobby) => (
                <button
                  key={hobby.id}
                  onClick={() => setSelectedId(hobby.id)}
                  className={`w-full text-left px-4 py-3 text-base text-gray-800 hover:bg-gray-50 transition-colors ${
                    selectedId === hobby.id ? "bg-gray-100" : ""
                  }`}
                >
                  {hobby.name}
                </button>
              ))}
            </div>
          </div>

          {/* actions */}
          <div className="space-y-3">
            <button
              onClick={() => selectedId && onChooseActivity(selectedId)}
              disabled={!selectedId}
              className="w-full rounded-lg bg-green-600 px-4 py-3 text-white text-base font-semibold enabled:hover:brightness-95 enabled:active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            >
              <span className="mr-2 text-lg">✓</span> Select Activity
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
