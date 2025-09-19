import { useState, ChangeEvent } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const EventCompletionPopup = ({
  event,
  onClose,
}: {
  event: string;
  onClose: () => void;
}) => {
  const [selected, setSelected] = useState<"YES" | "MAYBE" | "NO" | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-10">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white bg-[#f1617b] rounded-full cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-center text-xl font-bold mb-1">Congrats! 🎉</h2>
        <p className="text-center text-gray-700 mb-4">Did you enjoy {event}?</p>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelected("YES")}
            className={`flex-1 flex flex-col items-center py-3 rounded-lg transition cursor-pointer bg-[#1BBB57]/50 ${
              selected === "YES" && "shadow-lg"
            }`}
          >
            <span className="text-2xl text-[#17773B]">
              <SentimentSatisfiedAltIcon fontSize="large" />
            </span>
            <span className="text-[#17773B]">Yes</span>
          </button>

          <button
            onClick={() => setSelected("MAYBE")}
            className={`flex-1 flex flex-col items-center py-3 rounded-lg transition cursor-pointer bg-yellow-100 ${
              selected === "MAYBE" && "shadow-lg"
            }`}
          >
            <span className="text-2xl text-[#C8A225]">
              <SentimentNeutralIcon fontSize="large" />
            </span>
            <span className="text-[#C8A225]">Maybe</span>
          </button>

          <button
            onClick={() => setSelected("NO")}
            className={`flex-1 flex flex-col items-center py-3 rounded-lg transition cursor-pointer bg-red-200 ${
              selected === "NO" && "shadow-lg"
            }`}
          >
            <span className="text-2xl text-[#A62222]">
              <SentimentVeryDissatisfiedIcon fontSize="large" />
            </span>
            <span className="text-[#A62222]">No</span>
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-80 h-64 border-2 border-dashed border-gray-300 rounded-2xl p-5 mb-4 relative flex flex-col items-center">
            {/* Label */}
            <label className="cursor-pointer flex flex-col items-center gap-4 w-full h-full">
              <div className="text-gray-600 text-base font-medium flex items-center">
                Add a photo?
                <span className="ml-2 inline-block bg-gray-300 text-gray-500 text-sm px-3 py-1 rounded-full shadow-sm">
                  Optional
                </span>
              </div>

              <div className="flex flex-1 items-center justify-center w-full">
                <CameraAltIcon className="text-gray-300 !w-16 !h-16" />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {photo && (
              <div className="mt-4">
                <img
                  src={photo}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-lg mx-auto"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            disabled={!selected}
            onClick={onClose}
            className={`w-50 py-2 rounded-lg ${
              selected
                ? "bg-[#17773B] text-white cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            ✓ Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCompletionPopup;
