import { useState } from "react";
import { PhotoViewer } from "./PhotoViewerOnDone"; // You'll need to create this component
import {
  SentimentSatisfiedAlt,
  SentimentNeutral,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";

interface CompletionData {
  enjoyment: "YES" | "MAYBE" | "NO";
  photoFile?: File; // URL or base64 string of the uploaded photo
}

const EventCompletionPopupView = ({
  event,
  onClose,
  completionData,
}: {
  event: string;
  onClose: () => void;
  completionData: CompletionData;
}) => {
  const renderEnjoymentButton = (type: "YES" | "MAYBE" | "NO") => {
    const isSelected = completionData.enjoyment === type;
    
    const configs = {
      YES: {
        icon: SentimentSatisfiedAlt,
        text: "Yes",
        bgColor: "bg-[#1BBB57]/50",
        textColor: "text-[#17773B]"
      },
      MAYBE: {
        icon: SentimentNeutral,
        text: "Maybe",
        bgColor: "bg-yellow-100",
        textColor: "text-[#C8A225]"
      },
      NO: {
        icon: SentimentVeryDissatisfied,
        text: "No",
        bgColor: "bg-red-200",
        textColor: "text-[#A62222]"
      }
    };

    const config = configs[type];
    const IconComponent = config.icon;

    return (
      <div
        className={`flex-1 flex flex-col items-center py-2 md:py-3 rounded-lg ${config.bgColor} ${
          isSelected ? "shadow-lg ring-2 ring-blue-300" : "opacity-50"
        }`}
      >
        <IconComponent className={`${config.textColor} text-2xl md:text-4xl`} />
        <span className={`${config.textColor} text-xs md:text-base`}>
          {config.text}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/20 pt-10">
      <div className="bg-white shadow-2xl rounded-2xl p-4 md:p-6 w-150 max-w-[95%] md:max-w-2xl lg:max-w-3xl shadow-lg relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white bg-[#f1617b] rounded-full cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-center text-lg md:text-xl font-bold mt-2 mb-1">
          Event Completed! ✅
        </h2>
        <p className="text-center text-gray-700 mt-3 mb-4 text-sm md:text-base">
          Your experience with {event}:
        </p>

        <div className="flex gap-2 mb-4">
          {renderEnjoymentButton("YES")}
          {renderEnjoymentButton("MAYBE")}
          {renderEnjoymentButton("NO")}
        </div>

        <div className="w-full flex justify-center mb-2">
          {completionData.photoFile ? (
            <PhotoViewer photoFile={completionData.photoFile} />
          ) : (
            <p className="text-gray-500 text-sm">No photo uploaded</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="w-full md:w-1/2 py-2 rounded-lg text-sm md:text-base bg-gray-500 text-white cursor-pointer hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCompletionPopupView;