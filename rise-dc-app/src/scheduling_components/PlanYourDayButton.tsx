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

    
const addEvent = (event: {
  name: string;
  startTime: { hour: number; minute: number; period: 'AM' | 'PM' };
  endTime: { hour: number; minute: number; period: 'AM' | 'PM' };
}) => {
  setEvents((prev) => {
    const newEvents = [
      ...prev,
      { id: prev.length + 1, name: event.name, startTime: event.startTime, endTime: event.endTime },
    ];

    // Sort by start time
    newEvents.sort((a, b) => {
      const aHour24 = a.startTime.period === 'PM' && a.startTime.hour !== 12 ? a.startTime.hour + 12 : a.startTime.hour === 12 && a.startTime.period === 'AM' ? 0 : a.startTime.hour;
      const bHour24 = b.startTime.period === 'PM' && b.startTime.hour !== 12 ? b.startTime.hour + 12 : b.startTime.hour === 12 && b.startTime.period === 'AM' ? 0 : b.startTime.hour;

      if (aHour24 !== bHour24) return aHour24 - bHour24;
      return a.startTime.minute - b.startTime.minute;
    });

    return newEvents;
  });

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
            
        <>
        
        <div
                className={styles.plusButton}
                onClick={() => setIsModalOpen(true)}
                >
                <div className={styles.plusCircle}>
                    <span className={styles.plusIcon}>+</span>
                </div>
                {/* <p className={styles.eventTitle}>Add Event</p> */}
                </div>
        <div className="events-container">
          

          
          
                    {events.map((event, idx) => (
                        <div key={idx} className="event-card-main">
                            <EventCard
                                name={event.name}
                                startTime={event.startTime}
                                endTime={event.endTime}
                                color={'#fffef2ff'} />
                      
                      
                     

                        </div>
                    ))}
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