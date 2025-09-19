import { useState } from "react";
import { PhotoUploader } from "./PhotoUploader";
import {
  SentimentSatisfiedAlt,
  SentimentNeutral,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";

const EventCompletionPopup = ({
  event,
  onClose,
}: {
  event: string;
  onClose: () => void;
}) => {
  const [selected, setSelected] = useState<"YES" | "MAYBE" | "NO" | null>(null);

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-10">
      <div className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-[95%] md:max-w-2xl lg:max-w-3xl shadow-lg relative h-[90%] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white bg-[#f1617b] rounded-full cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-center text-lg md:text-xl font-bold mt-2 mb-1">
          Congrats! 🎉
        </h2>
        <p className="text-center text-gray-700 mt-3 mb-4 text-sm md:text-base">
          Did you enjoy {event}?
        </p>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelected("YES")}
            className={`flex-1 flex flex-col items-center py-2 md:py-3 rounded-lg transition cursor-pointer bg-[#1BBB57]/50 ${
              selected === "YES" && "shadow-lg"
            }`}
          >
            <SentimentSatisfiedAlt className="text-[#17773B] text-2xl md:text-4xl" />
            <span className="text-[#17773B] text-xs md:text-base">Yes</span>
          </button>

          <button
            onClick={() => setSelected("MAYBE")}
            className={`flex-1 flex flex-col items-center py-2 md:py-3 rounded-lg transition cursor-pointer bg-yellow-100 ${
              selected === "MAYBE" && "shadow-lg"
            }`}
          >
            <SentimentNeutral className="text-[#C8A225] text-2xl md:text-4xl" />
            <span className="text-[#C8A225] text-xs md:text-base">Maybe</span>
          </button>

          <button
            onClick={() => setSelected("NO")}
            className={`flex-1 flex flex-col items-center py-2 md:py-3 rounded-lg transition cursor-pointer bg-red-200 ${
              selected === "NO" && "shadow-lg"
            }`}
          >
            <SentimentVeryDissatisfied className="text-[#A62222] text-2xl md:text-4xl" />
            <span className="text-[#A62222] text-xs md:text-base">No</span>
          </button>
        </div>

        <div className="w-full flex justify-center mb-2">
          <PhotoUploader />
        </div>

        <div className="flex justify-center">
          <button
            disabled={!selected}
            onClick={onClose}
            className={`w-full md:w-1/2 py-2 rounded-lg text-sm md:text-base ${
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
