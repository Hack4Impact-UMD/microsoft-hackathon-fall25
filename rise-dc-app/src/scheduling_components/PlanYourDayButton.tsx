import React, { useState } from 'react';
import './EventSelectionModal.css'; // Don't forget to import the CSS
import EventSelectionModal from './EventSelectionModal';
import EventCard from './EventCard';
import styles from './PlanYourDay.module.css';
import WhatsNextButton from "../shared/components/WhatsNextButton";
import AISuggestionsPopup from './AIsuggestionsPopup';

type EventData = {
  name: string;
  startTime: { hour: number; minute: number; period: 'AM' | 'PM' };
  endTime: { hour: number; minute: number; period: 'AM' | 'PM' };
};

export function PlanYourDayButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [showAISuggestions, setShowAISuggestions] = useState(false); // Add AI popup state

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
    setEvents((prev) => {
      const newEvents = [
        ...prev,
        { name: event.name, startTime: event.startTime, endTime: event.endTime },
      ];
      // Sort by start time (from teammate's code)
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

  // Handle AI suggestion selection
  const handleSuggestionSelected = (suggestion: string) => {
    console.log('AI suggested event:', suggestion);
    // You could auto-open the event creation modal with the suggestion pre-filled
    // For now, just log it - you can integrate with your event creation flow
    setIsModalOpen(true); // Open event creation modal
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
        <div className="w-full mt-8">
          {/* Plus button with What's Next button to the right - positioned at the top */}
          <div className="absolute top-4 right-4 flex items-center gap-4">
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
              className="!bg-[#EB5904] hover:!bg-[#d14f03] !text-white font-bold rounded-full w-15 h-15 flex items-center justify-center text-sm !border-none shrink-0 mt-20"
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

      {/* Floating AI Suggestions Button - only show when there are events */}
      {events.length > 0 && (
        <button
          onClick={() => setShowAISuggestions(true)}
          className="fixed bottom-10 right-8 w-50 h-15 bg-orange-500 text-white rounded-2xl shadow-2xl hover:bg-purple-600 flex items-center justify-center text-xl z-50"
        >
          Give me Ideas! 🤖
        </button>
      )}

      <EventSelectionModal
        key={isModalOpen ? "custom" : "normal"}
        isOpen={isModalOpen}
        onClose={closePlanner}
        onEventCreated={addEvent}
        initialStep="SELECT_EVENT"
      />

      {/* AI Suggestions Popup */}
      <AISuggestionsPopup
        isOpen={showAISuggestions}
        onClose={() => setShowAISuggestions(false)}
        onSelectSuggestion={handleSuggestionSelected}
        events={events}
      />
    </>
  );
}