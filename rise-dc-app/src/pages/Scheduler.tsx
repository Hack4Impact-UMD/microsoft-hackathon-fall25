import moment from "moment";
import WhatsNextButton from "../shared/components/WhatsNextButton";
import IconCard from '../scheduling_components/icon_components/IconCard';

import styles from "./Page.module.css";
import ProgressBar from "../scheduling_components/TimerBarScheduler";

// filler logic for now 
export default function Scheduler() {

  const handleIconSelect = (category: string, iconName: string, iconType: string) => {
    console.log(`Selected ${category}: ${iconName} (${iconType})`);
  };

  return (
    <div className={styles.container}>
      <h1>Visual Scheduling & Daily Routines</h1>
      <p>
        Scheduling interface for users with first-grade or below reading/math
        levels
      </p>
      {/* <IconCard onIconSelect={handleIconSelect} /> */}
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
            },
          },
        ]}
      />
    </div>
  );
}
