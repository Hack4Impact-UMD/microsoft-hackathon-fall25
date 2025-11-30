import React, { useState } from "react";
import IconButton from "../scheduling_components/icon_components/IconButton";
import MoreInfoButton from "../components/Scheduler/MoreInfoButton";
import { Event } from "../shared/types";

type TimeSlot = {
  hour: number;
  minute: number;
  period: "AM" | "PM";
};

interface EventCardWithStepsProps {
  event: Event;
  onStepToggle?: (stepIndex: number) => void;
  onMarkAsDone?: () => void;
}

const EventCardSteps: React.FC<EventCardWithStepsProps> = ({
  event,
  onStepToggle,
  onMarkAsDone,
}) => {
  const [selectedIcon, setSelectedIcon] = useState<{
    name: string;
    icon: React.ComponentType<any>;
  } | null>(null);//Intializesset SelectedIcon or  it to None

  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(event.steps.length).fill(false)
  );

  const formatTime = (timeString: string) => {
    // For now, just returning the raw string
    return timeString;
  };

  const handleStepToggle = (stepIndex: number) => { //Handles user clicking checkbod
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[stepIndex] = !newCompletedSteps[stepIndex];//change step to True/False
    setCompletedSteps(newCompletedSteps); //update state

    if (onStepToggle) {
      onStepToggle(stepIndex);
    }
  };

  const completedCount = completedSteps.filter(Boolean).length; //finds completed count
  const totalSteps = event.steps.length;
  const progressPercentage = (completedCount / totalSteps) * 100;
  const allStepsComplete = completedCount === totalSteps;

  const handleMarkAsDone = () => {
    if (allStepsComplete && onMarkAsDone) {
      onMarkAsDone(); //only calls if all steps complete and if info passed to parent
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-orange-500 min-w-[400px] my-4">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">
            <IconButton />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold text-black m-0">{event.name}</h3>
            <p className="text-base text-gray-600 m-0">
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <MoreInfoButton
            title={event.name}
            selectedIcon={selectedIcon}
            onIconChange={setSelectedIcon}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1 h-8 bg-gray-200 rounded-2xl overflow-hidden">
          <div
            className="h-full bg-orange-400 rounded-2xl transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full border-2 border-gray-300">
          <span className="text-2xl">🕐</span>
        </div>
      </div>

      {/* Progress Text */}
      <p className="text-center text-base font-semibold text-gray-800 my-3">
        {completedCount} out of {totalSteps} tasks completed
      </p>

      {/* Checklist */}
      <div className="flex flex-col gap-3 mb-5">
        {event.steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-white border-2 border-green-500 rounded-xl cursor-pointer transition-all hover:bg-green-50 hover:translate-x-1"
            onClick={() => handleStepToggle(index)}
          >
            <div className={`w-7 h-7 border-2 border-green-500 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${completedSteps[index] ? 'bg-green-500' : 'bg-white'}`}>
              {completedSteps[index] && <span className="text-white text-xl font-bold">✓</span>}
            </div>
            <span className="text-lg text-black font-medium">{step}</span>
          </div>
        ))}
      </div>

      {/* Mark as Done Button */}
      <button
        className={`w-full py-3.5 rounded-xl border-none text-lg font-bold cursor-pointer transition-all flex items-center justify-center gap-2 ${
          allStepsComplete
            ? 'bg-green-500 text-white hover:bg-green-600 hover:-translate-y-0.5 hover:shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        onClick={handleMarkAsDone}
        disabled={!allStepsComplete}
      >
        ✓ Mark as Done
      </button>
    </div>
  );
};

export default EventCardSteps;