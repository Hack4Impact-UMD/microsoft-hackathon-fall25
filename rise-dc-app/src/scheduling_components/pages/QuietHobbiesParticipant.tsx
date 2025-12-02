import { useState, useEffect } from "react";
import QuietHobbyModal from "../quiet_hobbies/QuietHobbyModal";
import {
  QuietHobby,
  QuietHobbiesParticipantProps,
} from "../quiet_hobbies/types";
import { quietHobbiesApi } from "../quiet_hobbies/api";

export default function QuietHobbiesParticipant({
  onActivityChosen,
  onClose,
}: QuietHobbiesParticipantProps) {
  const [hobbies, setHobbies] = useState<QuietHobby[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Load hobbies when component mounts
  useEffect(() => {
    const loadHobbies = async () => {
      try {
        setError(null);
        const data = await quietHobbiesApi.getAll();
        setHobbies(data);

        // Open modal immediately after hobbies are loaded.
        setOpen(true);
      } catch (err) {
        setError("Failed to load quiet hobbies");
        console.error("Error loading hobbies:", err);
        setOpen(false);
      }
    };
    loadHobbies();
  }, []);

  const handleCloseModal = () => {
    console.log("Closing modal, current open state:", open);
    setOpen(false);
    // Properly calls the parent's onClose() which resets everything and removes all overlays.
    onClose?.();
  };

  const handleChooseActivity = (hobbyId: string) => {
    const selectedHobby = hobbies.find((hobby) => hobby.id === hobbyId);
    if (selectedHobby) {
      console.log("Chose activity:", selectedHobby);
      onActivityChosen?.(selectedHobby);
    }
    setOpen(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {error && (
        <div className="mb-6 p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
          <p className="text-lg text-red-600 mb-3">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setOpen(false);
              // Try to reload activities and re-open modal
              (async () => {
                try {
                  const data = await quietHobbiesApi.getAll();
                  setHobbies(data);
                  setOpen(true);
                } catch (err) {
                  setError("Failed to load quiet hobbies");
                  setOpen(false);
                }
              })();
            }}
            className="px-6 py-3 bg-red-600 text-white rounded-xl text-lg font-semibold hover:bg-red-700 active:scale-98 transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {/* {hobbies.length === 0 && !error && (
        <div className="mt-8 p-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl text-center">
          <p className="text-xl text-yellow-800">
            No quiet activities are currently available. Please check back later or contact staff.
          </p>
        </div>
      )} */}

      <QuietHobbyModal
        isOpen={open}
        onClose={handleCloseModal}
        hobbies={hobbies}
        onChooseActivity={handleChooseActivity}
      />
    </div>
  );
}
