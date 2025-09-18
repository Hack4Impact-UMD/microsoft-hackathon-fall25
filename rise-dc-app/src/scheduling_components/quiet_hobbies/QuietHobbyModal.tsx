import { useEffect, useRef, useState } from "react";
type Hobby = { id: string; name: string; iconURL?: string };
export default function QuietHobbyModal({
    isOpen,
    onClose,
    timeRange = "09:00AM - 09:15AM",
    hobbies,
    onChooseActivity,
    onTakePhoto,
    initialHobbyId = "",
}: {
    isOpen: boolean;
    onClose: () => void;
    timeRange?: string;
    hobbies: Hobby[];
    onChooseActivity: (hobbyId: string) => void;
    onTakePhoto: () => void;
    initialHobbyId?: string;
}) {
    const [selectedId, setSelectedId] = useState(initialHobbyId);
    const dialogRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (isOpen) {
        setSelectedId(initialHobbyId);
        setTimeout(() => dialogRef.current?.querySelector("select")?.focus(), 0);
        }
}, [isOpen, initialHobbyId]);
if (!isOpen) return null;
return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qh-title"
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        ref={dialogRef}
        className="w-[360px] rounded-3xl bg-white shadow-2xl p-5"
      >
        {/* header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              :broom:
            </span>
            <h2 id="qh-title" className="text-[22px] font-semibold">
              Quiet Time
            </h2>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="ml-3 h-8 w-8 grid place-items-center rounded-full bg-pink-500 text-white text-lg hover:brightness-95"
          >
            ×
          </button>
        </div>
        {/* subheader */}
        <p className="mt-2 text-[15px] text-gray-700">
          Choose a quiet activity to enjoy.
        </p>
        <p className="mt-1 text-[13px] text-gray-500">
          <span className="font-medium">Time:</span> {timeRange}
        </p>
        {/* form */}
        <div className="mt-5">
          <label
            htmlFor="qh-select"
            className="block text-[15px] font-medium text-gray-800 mb-2"
          >
            Choose an activity:
          </label>
          <div className="relative">
            <select
              id="qh-select"
              className="w-full appearance-none rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 pr-10 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="" disabled>
                Select…
              </option>
              {hobbies.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
            {/* chevron */}
            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              aria-hidden
            >
              ▼
            </span>
          </div>
        </div>
        {/* actions */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => selectedId && onChooseActivity(selectedId)}
            disabled={!selectedId}
            className="w-full rounded-xl bg-green-600 px-4 py-3 text-white text-[16px] font-semibold enabled:hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="mr-2">✓</span> Choose Activity
          </button>
          <button
            onClick={onTakePhoto}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white text-[16px] font-semibold hover:brightness-95"
          >
            <span className="mr-2" aria-hidden>
            </span>
            Take Photo
          </button>
        </div>
      </div>
    </div>
  );
}