import { useRef, useState } from "react";
import moment from "moment";

interface SimpleEvent {
  name: string;
  startTime: { hour: number; minute: number; period: 'AM' | 'PM' };
}

interface WhatsNextButtonProps {
  className?: string;
  events?: SimpleEvent[];
}

export default function WhatsNextButton({
  className = "",
  events = [],
}: WhatsNextButtonProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {    
    try {
      setIsLoading(true);
      
      // check upcoming
      const currTime = moment();
      let text = "No events upcoming";
      
      if (events.length > 0) {
        // Convert events to moment objects and sort
        const sortedEvents = events.map(event => {
          let hour = event.startTime.hour;
          if (event.startTime.period === 'PM' && hour !== 12) {
            hour += 12;
          } else if (event.startTime.period === 'AM' && hour === 12) {
            hour = 0;
          }
          const startTime = moment().hour(hour).minute(event.startTime.minute).second(0);
          
          return {
            name: event.name,
            startTime: startTime
          };
        }).sort((a, b) => a.startTime.valueOf() - b.startTime.valueOf());
        
        // Find next event
        const nextEvent = sortedEvents.find(e => e.startTime.isAfter(currTime));
       if (nextEvent) {
  const totalMinutes = nextEvent.startTime.diff(currTime, 'minutes');
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let diffText = "";
  if (hours > 0) diffText += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  if (hours > 0 && minutes > 0) diffText += " and ";
  if (minutes > 0) diffText += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;

  text = `Next event is ${nextEvent.name} in ${diffText}`;
}

      }
      
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onend = () => {
        console.log("Speech finished");
        setIsLoading(false);
      };
      
      utterance.onerror = (event) => {
        console.error("Speech error:", event);
        setIsLoading(false);
      };
      
      speechSynthesis.speak(utterance);
      
    } catch (err) {
      console.error("handleClick error:", err);
      setIsLoading(false);
      alert("Error occurred: " + err);
    }
  };

  return (
  <div>
  <button
    className={`px-15 py-5 bg-gray-800 text-gray-100 rounded-xl cursor-pointer disabled:opacity-70 ${className}`}
    onClick={handleClick}
    disabled={isLoading}
  >
    {isLoading ? "Speaking..." : "What's Next? 🔊"}
  </button>
  <audio ref={audioRef} className="hidden"></audio>
</div>

  );
}