import MoreInfoButton from "../components/Scheduler/MoreInfoButton";
import TimerBarScheduler from "./TimerBarScheduler";
import styles from './EventCard.module.css'
import { useState } from "react";
import IconButton from "./icon_components/IconButton";

// Define the TimeSlot type
type TimeSlot = {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
};

// Define the EventCardProps type
type EventCardProps = {
  name: string;
  startTime: TimeSlot;
  endTime: TimeSlot;
  icon?: React.ComponentType<any>;
  color?: string;
};

const EventCard: React.FC<EventCardProps> = ({ name, startTime, endTime, icon, color }) => {
  // Add shared icon state
  const [selectedIcon, setSelectedIcon] = useState<{name: string, icon: React.ComponentType<any>} | null>(null);

  const formatTime = (time: TimeSlot) =>
    `${time.hour}:${time.minute.toString().padStart(2, '0')} ${time.period}`;

  // Convert TimeSlot to 24-hour format and calculate duration
  const convertTo24Hour = (time: TimeSlot) => {
    let hour = time.hour;
    if (time.period === 'PM' && hour !== 12) hour += 12;
    if (time.period === 'AM' && hour === 12) hour = 0;
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

  return (
    <div className={styles.eventCard} style={{ backgroundColor: color || '#ffe5d1' }}>
      <div className={styles.titleRow}>
        <div className={styles.eventIcon}>
          <IconButton />
        </div>
        <div className={styles.textContent}>
          <p className={styles.eventTitle}>{name}</p>
          <p className={styles.eventTime}>{formatTime(startTime)} - {formatTime(endTime)}</p>
        </div>
        <MoreInfoButton 
          title={name}
          selectedIcon={selectedIcon}
          onIconChange={setSelectedIcon}
        />
      </div>
      <div className="mt-2">
      <TimerBarScheduler 
        duration={duration}
        startHour={start24.hour}
        startMinute={start24.minute}
      />
      </div>
    </div>
  );
};

export default EventCard;