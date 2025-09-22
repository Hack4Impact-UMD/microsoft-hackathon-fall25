import React, { useState } from 'react';
import styles from './EventCard.module.css';
import IconButton from '../scheduling_components/icon_components/IconButton'
import MoreInfoButton from '../components/Scheduler/MoreInfoButton';
import TimerBarScheduler from './TimerBarScheduler';
import EventCompletionPopup from './EventCompletion';

type TimeSlot = {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
};

interface EventCardProps {
  name: string;
  startTime: TimeSlot;
  endTime: TimeSlot;
  icon?: string;
  color?: string;
}

const EventCard: React.FC<EventCardProps> = ({ name, startTime, endTime, icon, color }) => {
  const [selectedIcon, setSelectedIcon] = useState<{name: string, icon: React.ComponentType<any>} | null>(null);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false); // Add this state

  const formatTime = (time: TimeSlot) =>
    `${time.hour}:${time.minute.toString().padStart(2, '0')} ${time.period}`;

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

  // Handle when "Mark as Done" is clicked
  const handleMarkAsDone = (eventName: string) => {
    setShowCompletionPopup(true);
  };

  const handleClosePopup = () => {
    setShowCompletionPopup(false);
  };

  return (
    <>
      <div className={styles.eventCard} style={{ backgroundColor: color || '#ffe5d1' }}>
        <div className={styles.titleRow}>
          <div className={styles.eventIcon}>
            <IconButton 
             
            />
          </div>
          <div className={styles.textContent}>
            <p className={styles.eventTitle}>{name}</p>
            <p className={styles.eventTime}>{formatTime(startTime)} - {formatTime(endTime)}</p>
          </div>

        <div className="relative bottom-5 left-38 z-10">
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
          eventName={''}        />
      </div>

      {/* Show completion popup when needed */}
      {showCompletionPopup && (
        <EventCompletionPopup 
          event={name}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default EventCard;