import React, { useState } from 'react';
import './EventSelectionModal.css'; // Don't forget to import the CSS
import EventSelectionModal from './EventSelectionModal';
import EventCard from './EventCard';
import styles from './PlanYourDay.module.css';

type EventData = {
  name: string;
  startTime: { hour: number; minute: number; period: 'AM' | 'PM' };
  endTime: { hour: number; minute: number; period: 'AM' | 'PM' };
};

export function PlanYourDayButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
      const [events, setEvents] = useState<EventData[]>([]);


    const openPlanner = () => {
        setIsModalOpen(true);
    };

    const closePlanner = () => {
        setIsModalOpen(false);
    };

    
  const addEvent = (event: { name: string; startTime: { hour: number; minute: number; period: 'AM' | 'PM' }; endTime: { hour: number; minute: number; period: 'AM' | 'PM' }; steps?: any[] }) => {
    setEvents((prev) => [
      ...prev,
      {  id: prev.length + 1, name: event.name, startTime: event.startTime, endTime: event.endTime },
    ]);
    setIsModalOpen(false); // close modal after adding
  };

    return (
        <>
         {events.length === 0 && (
            <div
                className="bg-[#EB5904] text-white font-light pt-6 pr-25 pb-6 pl-25 rounded-lg text-[1.2rem] mt-[15rem] cursor-pointer"
                onClick={openPlanner}
            >
                <p>
                    Let's plan your day!
                </p>
            </div>
         )}

          {events.length > 0 && (
        <><div className="events-container">
                    {events.map((event, idx) => (
                        <div key={idx} className="event-card-main">
                            <EventCard
                                name={event.name}
                                startTime={event.startTime}
                                endTime={event.endTime}
                                //   icon={event.name === 'Make Bed' ? '🛏️' : event.name === 'Sweep Floor' ? '🧹' : '💧'}
                                color={'#fffef2ff'} />
                            {/* <p className="event-name-main">{event.name}</p>
              <p className="event-time">
                {event.startTime.hour}:{event.startTime.minute.toString().padStart(2, '0')} {event.startTime.period} –{' '}
                {event.endTime.hour}:{event.endTime.minute.toString().padStart(2, '0')} {event.endTime.period}
              </p> */}
                        </div>
                    ))}
                </div><div
                className={styles.plusButton}
                onClick={() => setIsModalOpen(true)}
                >
                <div className={styles.plusCircle}>
                    <span className={styles.plusIcon}>+</span>
                </div>
                {/* <p className={styles.eventTitle}>Add Event</p> */}
                </div>
                </>
      )}
            
            <EventSelectionModal
            key={isModalOpen ? 'custom' : 'normal'} 
                isOpen={isModalOpen}
                onClose={closePlanner} 
                onEventCreated={addEvent} 
                initialStep="SELECT_EVENT"
/>

                
        </>

        
    );
}