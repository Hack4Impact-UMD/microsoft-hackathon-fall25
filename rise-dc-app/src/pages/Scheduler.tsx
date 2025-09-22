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
  const [selectedActivity, setSelectedActivity] = useState<QuietHobby | null>(null);
  const navigate = useNavigate();

  const handleActivityChosen = (hobby: QuietHobby) => {
    setSelectedActivity(hobby);
    console.log("Activity chosen:", hobby);
  };

  const handlePhotoTaken = () => {
    console.log("Photo taken");
  };

  // REMOVED: SAMPLE EVENTS TEMPORARILY TO DEBUG

  // Show selection buttons if no view mode is selected
  
  
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
              onClick={() => navigate("/")} // Go back to role selection
            />
          </div>
          <DayDisplay />
        </div>

        <div className="flex justify-center">
          <PlanYourDayButton />
        </div>

        {/*removed whatsnextbutton*/}
      </div>
    </>
  );
}