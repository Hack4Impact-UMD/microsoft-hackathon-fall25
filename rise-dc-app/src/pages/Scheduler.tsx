import moment from "moment";
import WhatsNextButton from "../shared/components/WhatsNextButton";
import styles from "./Page.module.css";
import ProgressBar from "../scheduling_components/TimerBarScheduler";
import EventComplete from "../scheduling_components/EventCompletion";
import { useState } from "react";

export default function Scheduler() {
  const [isEventComplete, setIsEventComplete] = useState(false);
  const openPopup = () => setIsEventComplete(true);
  const closePopup = () => setIsEventComplete(false);
  return (
    <div className={styles.container}>
      <h1>Visual Scheduling & Daily Routines</h1>
      <p>
        Scheduling interface for users with first-grade or below reading/math
        levels
      </p>
      <ProgressBar duration={20000} startHour={0} startMinute={16} />
      <WhatsNextButton
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
              complete: false,
            },
          },
        ]}
      />
    </div>
  );
}
