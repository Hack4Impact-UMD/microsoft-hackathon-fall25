import React, { useState } from "react";
import EventCardSteps from "../scheduling_components/EventCardSteps";
import { Event } from "../shared/types";
import { DayDisplay } from "../scheduling_components/DayDisplay";
import { PlanYourDayButton } from "../scheduling_components/PlanYourDayButton";
import { QuietHobby } from "../scheduling_components/quiet_hobbies/types";
import { Box } from "@mui/material";
import back from "../scheduling_components/icon_components/back.png";
import { useNavigate } from "react-router-dom";
import styles from "./Page.module.css";

const EventCardTest: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<QuietHobby | null>(
    null,
  );
  const navigate = useNavigate();

  const handleActivityChosen = (hobby: QuietHobby) => {
    setSelectedActivity(hobby);
    console.log("Activity chosen:", hobby);
  };

  const sampleEvent: Event = {
    id: "1",
    userId: "user123",
    name: "Clean Bedroom",
    icon: "🧹",
    complete: false,
    startTime: "00:00",
    endTime: "00:00",
    category: "chores" as any,
    steps: [
      "Make Bed",
      "Put books away",
      "Put clothes away"
    ]
  };

  const handleStepToggle = (stepIndex: number) => {
    console.log(`Step ${stepIndex} was toggled`);
  };

  const handleMarkAsDone = () => {
    console.log("Event marked as done!");
  };

  return (
    <div style={{ color: "black" }}>
      <div className={styles.container}></div>

      <div className="mt-0 pt-0">
        <div className="flex justify-center">
          <div className={styles.backButton}>
            <Box
              component="img"
              src={back}
              alt="Back"
              onClick={() => navigate("/")}
            />
          </div>
          <DayDisplay />
        </div>

        <div className="flex justify-center">
          <PlanYourDayButton />
        </div>

        <div className="flex justify-center mt-4">
          <EventCardSteps
            event={sampleEvent}
            onStepToggle={handleStepToggle}
            onMarkAsDone={handleMarkAsDone}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCardTest;
