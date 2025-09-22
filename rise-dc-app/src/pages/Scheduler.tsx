import moment from "moment";
import WhatsNextButton from "../shared/components/WhatsNextButton";
import styles from "./Page.module.css";
import MoreInfoButton from "../components/Scheduler/MoreInfoButton";
import ProgressBar from "../scheduling_components/TimerBarScheduler";
import { DayDisplay } from "../scheduling_components/DayDisplay";
import { PlanYourDayButton } from "../scheduling_components/PlanYourDayButton";
import { useState } from "react";
import { QuietHobby } from "../scheduling_components/quiet_hobbies/types";
import { Box } from "@mui/material";
import back from '../scheduling_components/icon_components/back.png';
import { useNavigate } from "react-router-dom";

export default function Scheduler() {
  const [viewMode, setViewMode] = useState<"staff" | "participant" | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<QuietHobby | null>(null);
  const navigate = useNavigate();

  const handleActivityChosen = (hobby: QuietHobby) => {
    setSelectedActivity(hobby);
    console.log("Activity chosen:", hobby);
  };

  const handlePhotoTaken = () => {
    console.log("Photo taken");
  };

  // Show selection buttons if no view mode is selected
  if (viewMode === null) {
    return (
      <div className={styles.container}>
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
          <h1 className="text-2xl font-bold mb-8">Choose Your Role</h1>
          
          <button
            onClick={() => setViewMode("staff")}
            className="w-80 h-24 bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold rounded-lg shadow-lg transition-colors"
          >
            Staff
          </button>
          
          <button
            onClick={() => setViewMode("participant")}
            className="w-80 h-24 bg-green-500 hover:bg-green-600 text-white text-xl font-semibold rounded-lg shadow-lg transition-colors"
          >
            Participant
          </button>
        </div>
      </div>
    );
  }

  // Staff view - blank screen for now
  if (viewMode === "staff") {
    return (
      <div className={styles.container}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <button
            onClick={() => setViewMode(null)}
            className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <Box
              component="img"
              src={back}
              alt="Back"
              style={{ width: '24px', height: '24px' }}
            />
          </button>
          
          <h1 className="text-2xl font-bold">Staff View</h1>
          <p className="text-gray-600 mt-4">Staff interface coming soon...</p>
        </div>
      </div>
    );
  }

  // Participant view - your existing interface
  return (
    <>
      <div className={styles.container}>
        {/* Existing commented code stays the same */}
      </div>

      <div className="mt-0 pt-0">
        <div className="flex justify-center">
          <div className={styles.backButton}>
            <Box
              component="img"
              src={back}
              alt="Back"
              onClick={() => setViewMode(null)} // Go back to role selection
            />
          </div>
          <DayDisplay />
        </div>

        <div className="flex justify-center">
          <PlanYourDayButton />
        </div>
      </div>
    </>
  );
}