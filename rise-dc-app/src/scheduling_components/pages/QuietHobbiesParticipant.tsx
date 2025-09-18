import { useState } from "react";
import QuietHobbyModal from "../quiet_hobbies/QuietHobbyModal";
export default function QuietHobbiesParticipant() {
  const [open, setOpen] = useState(true);
  return (
    <div className="p-6">
      <button
        className="rounded-xl bg-gray-900 text-white px-4 py-2"
        onClick={() => setOpen(true)}
      >
        Open Quiet Time
      </button>
      <QuietHobbyModal
        isOpen={open}
        onClose={() => setOpen(false)}
        hobbies={[
          { id: "1", name: "Reading" },
          { id: "2", name: "Drawing" },
          { id: "3", name: "Meditation" }
        ]}
        onChooseActivity={(id) => {
          console.log("Chose:", id);
          setOpen(false);
        }}
        onTakePhoto={() => alert("Take photo flow")}
      />
    </div>
  );
}