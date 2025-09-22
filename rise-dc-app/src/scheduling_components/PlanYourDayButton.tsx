import React, { useState } from 'react';
import './EventSelectionModal.css'; // Don't forget to import the CSS
import EventSelectionModal from './EventSelectionModal';
import EventCard from './EventCard';
import styles from './PlanYourDay.module.css';
import WhatsNextButton from "../shared/components/WhatsNextButton";

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
    steps?: any[];
  }) => {
    setEvents((prev) => [
      ...prev,
      { name: event.name, startTime: event.startTime, endTime: event.endTime },
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
          <p>Let's plan your day!</p>
        </div>
      )}

      {events.length > 0 && (
        <div className="w-full">
          {/* Plus button with What's Next button to the right - positioned at the top */}
          <div className="flex justify-center items-center gap-6 mt-4 mb-4 w-full">
            <div
              className={styles.plusButton}
              onClick={() => setIsModalOpen(true)}
            >
              <div className={styles.plusCircle}>
                <span className={styles.plusIcon}>+</span>
              </div>
            </div>
            
            <WhatsNextButton
              events={events}
              className="!bg-[#EB5904] hover:!bg-[#d14f03] !text-white font-bold rounded-full w-16 h-16 flex items-center justify-center text-xs !border-none shrink-0"
            />
          </div>
          
          {/* Events container - separate from the buttons above */}
          <div className="events-container w-full flex flex-col items-center">
            {events.map((event, idx) => (
              <div key={idx} className="event-card-main">
                <EventCard
                  name={event.name}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  color={"#fffef2ff"}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <EventSelectionModal
        key={isModalOpen ? "custom" : "normal"}
        isOpen={isModalOpen}
        onClose={closePlanner}
        onEventCreated={addEvent}
        initialStep="SELECT_EVENT"
      />
    </>
  );
}