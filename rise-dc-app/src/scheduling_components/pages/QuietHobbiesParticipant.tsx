import { useState, useEffect } from "react";
import QuietHobbyModal from "../quiet_hobbies/QuietHobbyModal";
import { QuietHobby, QuietHobbiesParticipantProps } from "../quiet_hobbies/types";
import { quietHobbiesApi } from "../quiet_hobbies/api";

export default function QuietHobbiesParticipant({ 
  onActivityChosen, 
  onPhotoTaken 
}: QuietHobbiesParticipantProps) {
  const [open, setOpen] = useState(false);
  const [hobbies, setHobbies] = useState<QuietHobby[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load hobbies when component mounts
  useEffect(() => {
    loadHobbies();
  }, []);

  const loadHobbies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await quietHobbiesApi.getAll();
      setHobbies(data);
    } catch (err) {
      setError('Failed to load quiet hobbies');
      console.error('Error loading hobbies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChooseActivity = (hobbyId: string) => {
    const selectedHobby = hobbies.find(hobby => hobby.id === hobbyId);
    if (selectedHobby) {
      console.log("Chose activity:", selectedHobby);
      onActivityChosen?.(selectedHobby);
    }
    setOpen(false);
  };

  const handleTakePhoto = (photoDataUrl: string) => {
    console.log("Photo captured:", photoDataUrl);
    onPhotoTaken?.();
    // TODO: Save the photo to rea database
    alert("Photo captured successfully!");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Quiet Time Activities
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Choose from available quiet activities for your scheduled quiet time.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
          <p className="text-lg text-red-600 mb-3">{error}</p>
          <button
            onClick={loadHobbies}
            className="px-6 py-3 bg-red-600 text-white rounded-xl text-lg font-semibold hover:bg-red-700 active:scale-98 transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="text-center">
        <button
          className="rounded-2xl bg-gray-900 text-white px-12 py-6 text-2xl font-bold hover:bg-gray-800 active:scale-98 transition-all shadow-lg"
          onClick={() => setOpen(true)}
          disabled={loading || hobbies.length === 0}
        >
          {loading ? "Loading Activities..." : "Open Quiet Time"}
        </button>
      </div>

      {hobbies.length === 0 && !loading && (
        <div className="mt-8 p-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl text-center">
          <p className="text-xl text-yellow-800">
            No quiet activities are currently available. Please check back later or contact staff.
          </p>
        </div>
      )}

      <QuietHobbyModal
        isOpen={open}
        onClose={() => setOpen(false)}
        hobbies={hobbies}
        onChooseActivity={handleChooseActivity}
        onTakePhoto={handleTakePhoto}
      />
    </div>
  );
}