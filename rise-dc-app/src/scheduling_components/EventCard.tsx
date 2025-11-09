import React, { useState } from "react";
import styles from "./EventCard.module.css";
import IconButton from "../scheduling_components/icon_components/IconButton";
import MoreInfoButton from "../components/Scheduler/MoreInfoButton";
import TimerBarScheduler from "./TimerBarScheduler";
import EventCompletionPopup from "./EventCompletion";
import EventCompletionPopupView from "./EventCompletionPopupView";

type TimeSlot = {
  hour: number;
  minute: number;
  period: "AM" | "PM";
};

interface EventCardProps {
  name: string;
  startTime: TimeSlot;
  endTime: TimeSlot;
  icon?: string;
  color?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  name,
  startTime,
  endTime,
  icon,
  color,
}) => {
  const [selectedIcon, setSelectedIcon] = useState<{
    name: string;
    icon: React.ComponentType<any>;
  } | null>(null);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [showCompletionView, setShowCompletionView] = useState(false); // New state
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionData, setCompletionData] = useState<{
    enjoyment: "YES" | "MAYBE" | "NO";
    photoFile?: File;
  } | null>(null); // Store completion data

  const formatTime = (time: TimeSlot) =>
    `${time.hour}:${time.minute.toString().padStart(2, "0")} ${time.period}`;

  const convertTo24Hour = (time: TimeSlot) => {
    let hour = time.hour;
    if (time.period === "PM" && hour !== 12) hour += 12;
    if (time.period === "AM" && hour === 12) hour = 0;
    return { hour, minute: time.minute };
  };

  const calculateDuration = (start: TimeSlot, end: TimeSlot) => {
    const startTime24 = convertTo24Hour(start);
    const endTime24 = convertTo24Hour(end);

    const startMs = (startTime24.hour * 60 + startTime24.minute) * 60 * 1000;
    const endMs = (endTime24.hour * 60 + endTime24.minute) * 60 * 1000;

    return endMs - startMs;
  };

  const start24 = convertTo24Hour(startTime);
  const duration = calculateDuration(startTime, endTime);

  // Handle when "Mark as Done" is clicked
  const handleMarkAsDone = (eventName: string) => {
    if (!isCompleted) {
      // Only allow if not already completed
      setShowCompletionPopup(true);
    }
  };

  const handleClosePopup = (data?: {
    enjoyment: "YES" | "MAYBE" | "NO";
    photoFile?: File;
  }) => {
    setShowCompletionPopup(false);
    if (data) {
      setIsCompleted(true);
      setCompletionData(data); // Store the completion data
    }
  };

  const handleCardClick = () => {
    if (isCompleted && completionData) {
      setShowCompletionView(true);
    }
  };

  // Determine card styling based on completion state
  const cardStyle = {
    backgroundColor: isCompleted ? "#e7e7e7ff" : color || "#ffe5d1", // Gray when completed
    opacity: isCompleted ? 0.85 : 1,
    ...{}, // Any additional styles
  };

  return (
    <>
      <div
        className={styles.eventCard}
        style={cardStyle}
        onClick={handleCardClick}
      >
        <div className={styles.titleRow}>
          {/* Left side: Icon + Text */}
          <div className="flex items-center gap-2">
            <div className={styles.eventIcon}>
              <IconButton />
            </div>
            <div className={styles.textContent}>
              <div className="flex items-center gap-2">
                <p className={styles.eventTitle}>{name}</p>
                {/* Show checkmark when completed */}
                {isCompleted && (
                  <span className="text-green-600 text-xl font-bold">✓</span>
                )}
              </div>
              <p className={styles.eventTime}>
                {formatTime(startTime)} - {formatTime(endTime)}
              </p>
            </div>
          </div>

          {/* Right side: MoreInfoButton */}
          <div className="flex items-center">
            <MoreInfoButton
              title={name}
              selectedIcon={selectedIcon}
              onIconChange={setSelectedIcon}
            />
          </div>
        </div>

        <TimerBarScheduler
          duration={duration}
          startHour={start24.hour}
          startMinute={start24.minute}
          onMarkAsDone={handleMarkAsDone}
          eventName={name}
        />
      </div>

      {/* Show completion popup when needed */}
      {showCompletionPopup && (
        <EventCompletionPopup event={name} onClose={handleClosePopup} />
      )}

      {showCompletionView && completionData && (
        <EventCompletionPopupView
          event={name}
          onClose={() => setShowCompletionView(false)}
          completionData={completionData}
        />
      )}
    </>
  );
};

export default EventCard;
