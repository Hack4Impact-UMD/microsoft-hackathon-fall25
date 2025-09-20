import React from 'react';
import styles from './EventCard.module.css';

type TimeSlot = {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
};

interface EventCardProps {
  name: string;
  startTime: TimeSlot;
  endTime: TimeSlot;
  icon?: string;      // optional emoji/icon
  color?: string;     // optional background color
}

const EventCard: React.FC<EventCardProps> = ({ name, startTime, endTime, icon, color }) => {
  const formatTime = (time: TimeSlot) =>
    `${time.hour}:${time.minute.toString().padStart(2, '0')} ${time.period}`;

  return (
    <div className={styles.eventCard} style={{ backgroundColor: color || '#ffe5d1' }}>
      {icon && <div className="event-icon">{icon}</div>}
      <p className={styles.eventTitle}>{name}</p>
      <p className={styles.eventTime}>{formatTime(startTime)} - {formatTime(endTime)}</p>
    </div>
  );
};

export default EventCard;
