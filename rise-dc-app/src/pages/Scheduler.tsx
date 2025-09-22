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
  const [viewMode, setViewMode] = useState<"staff" | "participant">("staff");
  const [selectedActivity, setSelectedActivity] = useState<QuietHobby | null>(
    null
  );
  const navigate = useNavigate();

  const handleActivityChosen = (hobby: QuietHobby) => {
    setSelectedActivity(hobby);
    console.log("Activity chosen:", hobby);
  };

  const handlePhotoTaken = () => {
    console.log("Photo taken");
  };

  return (
    <>

    
      <div className={styles.container}>
        
        {/* <h1>Visual Scheduling & Daily Routines</h1>
        <p>
          Scheduling interface for users with first-grade or below reading/math
          levels
        </p> */}
        {/* <WhatsNextButton
          assignments={[
            {
              id: "1",
              complete: false,
              date: moment().toString(),
              startTime: moment(moment.now()).add(10, "minutes").toString(),
              endTime: moment(moment.now()).add(40, "minutes").toString(),
              event: {
                id: "1",
                name: "Test Event",
                icon: "",
                tasks: [],
                image: { id: "image-1", caption: "Temp Caption" },
              },
            },
          ]}
        /> */}
        {/* <MoreInfoButton title={"More Info"} /> */}
      </div>



      <div className="mt-0 pt-0">
        <div className="flex justify-center">
          <div className={styles.backButton}>
              <Box
                  component="img"
                  src={back}
                  alt="Back"
                 onClick={() => navigate("/")}
                /> </div>
        <DayDisplay /> </div>

        <div className="flex justify-center">
          <PlanYourDayButton  />
        </div>

      </div>
    </>
  );
}
