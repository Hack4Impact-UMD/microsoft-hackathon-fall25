import moment from "moment";
import WhatsNextButton from "../shared/components/WhatsNextButton";
import styles from "./Page.module.css";
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
      <WhatsNextButton
        assignments={[
          {
            id: "1",
            name: "Test Event",
            date: moment().toString(),
            startTime: moment(moment.now()).add(10, "minutes").toString(),
            endTime: moment(moment.now()).add(40, "minutes").toString(),
            event: {
              id: "1",
              name: "Test Event",
              icon: "",
              complete: false,
              tasks: [],
              image: { id: "image-1", caption: "Temp Caption" },
            },
          },
        ]}
      />

      <button
        className="p-2 px-4 bg-[#1BBB57]/50 rounded-lg text-white cursor-pointer"
        onClick={openPopup}
      >
        ✓ Mark as Done
      </button>
      {isEventComplete && (
        <EventComplete event="brush your teeth" onClose={closePopup} />
      )}
    </div>
  );
}
