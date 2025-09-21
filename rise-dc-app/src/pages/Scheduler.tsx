
import moment from "moment";
import WhatsNextButton from "../shared/components/WhatsNextButton";

import styles from "./Page.module.css";
import ProgressBar from "../scheduling_components/TimerBarScheduler";
import { DayDisplay } from '../scheduling_components/DayDisplay';
import { PlanYourDayButton } from '../scheduling_components/PlanYourDayButton';
import { useState } from "react";
import { QuietHobby } from "../scheduling_components/quiet_hobbies/types";

export default function Scheduler() {

  const [viewMode, setViewMode] = useState<'staff' | 'participant'>('staff');
  const [selectedActivity, setSelectedActivity] = useState<QuietHobby | null>(null);

  const handleActivityChosen = (hobby: QuietHobby) => {
    setSelectedActivity(hobby);
    console.log('Activity chosen:', hobby);
  };

  const handlePhotoTaken = () => {
    console.log('Photo taken');
  };

  return (
    <div>
      <DayDisplay />
      <PlanYourDayButton />
    </div>
  );
}
