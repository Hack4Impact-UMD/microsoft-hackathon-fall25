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

  const handleTakePhoto = () => {
    console.log("Take photo flow initiated");
    onPhotoTaken?.();
    // In a real app, this would open camera or photo picker
    alert("Photo capture functionality will be implemented");
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Quiet Time Activities
        </h1>
        <p className="text-gray-600 mb-4">
          Choose from available quiet activities for your scheduled quiet time.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadHobbies}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}

      <button
        className="rounded-xl bg-gray-900 text-white px-6 py-3 text-lg font-medium hover:bg-gray-800 transition-colors"
        onClick={() => setOpen(true)}
        disabled={loading || hobbies.length === 0}
      >
        {loading ? "Loading Activities..." : "Open Quiet Time"}
      </button>

      {hobbies.length === 0 && !loading && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
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