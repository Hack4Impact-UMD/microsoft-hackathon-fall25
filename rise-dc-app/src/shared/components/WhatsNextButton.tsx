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
          const diff = nextEvent.startTime.diff(currTime, 'minutes');
          text = `Next event is ${nextEvent.name} in ${diff} ${diff === 1 ? 'minute' : 'minutes'}`;
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
        className={`p-2 px-4 bg-gray-800 text-gray-100 rounded cursor-pointer disabled:opacity-70 ${className}`}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Speaking..." : "What's Next"}
      </button>
      <audio ref={audioRef} className="hidden"></audio>
    </div>
  );
}