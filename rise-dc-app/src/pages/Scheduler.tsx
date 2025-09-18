import moment from "moment";
import WhatsNextButton from "../shared/components/WhatsNextButton";
import styles from "./Page.module.css";
import MoreInfoButton from "../components/Scheduler/MoreInfoButton";

export default function Scheduler() {
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
      <MoreInfoButton></MoreInfoButton>
    </div>
  );
}
