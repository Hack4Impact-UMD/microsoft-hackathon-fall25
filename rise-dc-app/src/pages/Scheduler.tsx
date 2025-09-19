import { DayDisplay } from '../scheduling_components/DayDisplay';
import { PlanYourDayButton } from '../scheduling_components/PlanYourDayButton';

export default function Scheduler() {
  return (
    <div className="flex flex-col items-center">
      <DayDisplay />
      <PlanYourDayButton />
    </div>
  );
}
