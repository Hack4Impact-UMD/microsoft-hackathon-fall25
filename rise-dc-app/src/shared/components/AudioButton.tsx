import { useRef } from "react";
import speakerIcon from "../../assets/speaker_icon.png";
import { getAudioBlobFromText } from "../utils/textToSpeech";
import { useMutation } from "@tanstack/react-query";

interface AudioButtonProps {
  text: string;
}

export default function AudioButton(props: AudioButtonProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudioMutation = useMutation({
    mutationFn: async () => {
    audioRef.current?.pause(); // if already playing
  
    const audioBlob = await getAudioBlobFromText(props.text); // create audio file
    if (!audioRef.current) throw new Error("No audio ref");
  
    audioRef.current.src = URL.createObjectURL(audioBlob); // set audioRef's audio file
    audioRef.current.play(); // play audio
    },
    onError: (err) => {
      alert("Failed to play audio!");
      console.error(err);
    },
    });

  return (
    <button 
      className="rounded-full border p-2"
      onClick={() => playAudioMutation.mutate()}
      disabled={playAudioMutation.isPending}
    >
      <img src={speakerIcon} height="24px" width="24px"/>
      <audio ref={audioRef} className="hidden"></audio>
    </button>
  );
}