import moment from "moment";
import { useEffect, useState } from "react";
import { getAudioElementFromText } from "../utils/textToSpeech";

// TODO: ScheduleEvent is a temporary placeholder until the scheduling types are finalized & pushed
interface ScheduleEvent {
  id: string;
  title: string;
  startTime: string; // ISO-8601
  endTime: string; // ISO-8601
}

// assume the events are sorted by start time
interface WhatsNextButtonProps {
  events: ScheduleEvent[];
}

export default function WhatsNextButton(props: WhatsNextButtonProps) {
  const { events } = props;
  const [nextEventId, setNextEventId] = useState<string>();
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handlePlayAudio = () => {
    const currTime = moment();
    const nextEvent = events.find(e => moment(e.startTime).isAfter(currTime));
    // TODO:
    // if nextEvent hasn't changed, just play the current audio
    // else refetch the audio for the new next event and play that instead
    if ((!nextEvent && !nextEventId) || (nextEvent && nextEvent.id === nextEventId)) {
      audio?.play();
    }
  };

  return <button onClick={handlePlayAudio}></button>;
}
