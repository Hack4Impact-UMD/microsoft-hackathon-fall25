import React, { useState } from "react";
import { Box } from "@mui/material";
import back from "../scheduling_components/icon_components/back.png";
import { useNavigate } from "react-router-dom";
import styles from "../scheduling_components/PlanYourDay.module.css";
import EventSelectionModal from "../scheduling_components/EventSelectionModal";
import EventCard from "../scheduling_components/EventCard";

type EventData = {
  name: string;
  startTime: { hour: number; minute: number; period: "AM" | "PM" };
  endTime: { hour: number; minute: number; period: "AM" | "PM" };
};

export default function EditParticipant() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const openPlanner = () => {
    setIsModalOpen(true);
  };

  const closePlanner = () => {
    setIsModalOpen(false);
  };

  const addEvent = (event: {
    name: string;
    startTime: { hour: number; minute: number; period: "AM" | "PM" };
    endTime: { hour: number; minute: number; period: "AM" | "PM" };
    steps?: any[];
  }) => {
    setEvents((prev) => {
      const newEvents = [
        ...prev,
        {
          name: event.name,
          startTime: event.startTime,
          endTime: event.endTime,
        },
      ];
      // Sort by start time (from teammate's code)
      newEvents.sort((a, b) => {
        const aHour24 =
          a.startTime.period === "PM" && a.startTime.hour !== 12
            ? a.startTime.hour + 12
            : a.startTime.hour === 12 && a.startTime.period === "AM"
              ? 0
              : a.startTime.hour;
        const bHour24 =
          b.startTime.period === "PM" && b.startTime.hour !== 12
            ? b.startTime.hour + 12
            : b.startTime.hour === 12 && b.startTime.period === "AM"
              ? 0
              : b.startTime.hour;
        if (aHour24 !== bHour24) return aHour24 - bHour24;
        return a.startTime.minute - b.startTime.minute;
      });
      return newEvents;
    });
    setIsModalOpen(false); // close modal after adding
  };

  return (
    <div style={{ color: "black" }}>
      <div className={styles.container}></div>

      <div className="mt-0 pt-0">
        <div className="flex justify-center">
          <div className={styles.backButton}>
            <Box
              component="img"
              src={back}
              alt="Back"
              onClick={() => navigate("/")}
            />
          </div>

            <div className="flex max-w-100 text-center pt-3 pr-15 pb-4 pl-15 items-center justify-center bg-[#0C77D9] rounded-b-xl pointer-events-none">
                <p className="text-white font-light text-[1.2rem]">[Name Here]</p>
            </div>
        </div>

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

      <EventSelectionModal
        key={isModalOpen ? "custom" : "normal"}
        isOpen={isModalOpen}
        onClose={closePlanner}
        onEventCreated={addEvent}
        initialStep="SELECT_EVENT"
      />

      </div>
    </div>
  );
}
