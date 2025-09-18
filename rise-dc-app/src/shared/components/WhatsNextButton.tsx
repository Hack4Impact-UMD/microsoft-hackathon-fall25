import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { getAudioBlobFromText } from "../utils/textToSpeech";
import { useMutation } from "@tanstack/react-query";

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


export default function WhatsNextButton({ events }: WhatsNextButtonProps) {
  const [nextEventId, setNextEventId] = useState<string>();
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudioMutation = useMutation({
    mutationFn: async () => {
      audioRef.current?.pause() // if already playing

      const currTime = moment();
      const nextEvent = events.find(e => moment(e.startTime).isAfter(currTime));
      // TODO:
      // if nextEvent hasn't changed, just play the current audio
      // else refetch the audio for the new next event and play that instead
      if (nextEvent) {
        const diff = moment(moment.now()).diff(nextEvent?.startTime, 'minutes')
        const audioBlob = await getAudioBlobFromText(`Next event is ${nextEvent.title} in ${diff} minutes`);
        if (!audioRef.current) throw new Error("No audio ref")

        audioRef.current.src = URL.createObjectURL(audioBlob)
        audioRef.current.play();
      } else {
        const audioBlob = await getAudioBlobFromText(`No events upcoming`);
        if (!audioRef.current) throw new Error("No audio ref")

        audioRef.current.src = URL.createObjectURL(audioBlob)
        audioRef.current.play();
      }
    },
    onError: (err) => {
      alert("Failed to play audio!")
      console.error(err);
    }
  })

  return <div>
    <button onClick={() => playAudioMutation.mutate()} disabled={playAudioMutation.isPending}>
      What's Next
    </button>
    <audio ref={audioRef} style={{
      display: 'none'
    }}></audio>
  </div>;
}
