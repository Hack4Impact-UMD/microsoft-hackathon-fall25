import moment from "moment";
import { useRef } from "react";
import { getAudioBlobFromText } from "../utils/textToSpeech";
import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { Assignment } from "../types";

interface WhatsNextButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  assignments: Assignment[];
}

export default function WhatsNextButton({
  assignments,
  className = "",
  ...rest
}: WhatsNextButtonProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudioMutation = useMutation({
    mutationFn: async () => {
      audioRef.current?.pause(); // if already playing

      const currTime = moment();
      const nextAssignment = assignments.find((a) =>
        moment(a.startTime).isAfter(currTime)
      );

      if (nextAssignment) {
        const diff = moment(nextAssignment?.startTime).diff(
          moment.now(),
          "minutes"
        );
        const audioBlob = await getAudioBlobFromText(
          `Next event is ${nextAssignment.name} in ${diff} ${
            diff > 1 ? "minutes" : "minute"
          }`
        );
        if (!audioRef.current) throw new Error("No audio ref");

        audioRef.current.src = URL.createObjectURL(audioBlob);
        audioRef.current.play();
      } else {
        const audioBlob = await getAudioBlobFromText(`No events upcoming`);
        if (!audioRef.current) throw new Error("No audio ref");

        audioRef.current.src = URL.createObjectURL(audioBlob);
        audioRef.current.play();
      }
    },
    onError: (err) => {
      alert("Failed to play audio!");
      console.error(err);
    },
  });

  return (
    <div>
      <button
        className={twMerge(
          "p-2 px-4 bg-gray-800 text-gray-100 rounded cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed",
          className
        )}
        onClick={() => playAudioMutation.mutate()}
        disabled={playAudioMutation.isPending}
        {...rest}
      >
        What's Next
      </button>
      <audio ref={audioRef} className="hidden"></audio>
    </div>
  );
}
