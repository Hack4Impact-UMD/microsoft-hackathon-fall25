import { useRef, useState } from "react";
import speakerIcon from "../../assets/speaker_icon.png";
import { getAudioBlobFromText } from "../utils/textToSpeech";

interface AudioButtonProps {
  text: string;
  className?: string;
}

export default function AudioButton({ text, className }: AudioButtonProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (!audioRef.current) return;

    try {
      setIsPlaying(true);

      // Pause if already playing
      audioRef.current.pause();

      // Generate audio blob
      const audioBlob = await getAudioBlobFromText(text);

      // Set audio src and play
      audioRef.current.src = URL.createObjectURL(audioBlob);
      await audioRef.current.play();
    } catch (err) {
      console.error("Failed to play audio", err);
      alert("Failed to play audio!");
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <button
      className={`rounded-full border p-2 cursor-pointer bg-white ${className ?? ""}`}
      onClick={handlePlay}
      disabled={isPlaying}
    >
      <img src={speakerIcon} height="24px" width="24px" />
      <audio ref={audioRef} className="hidden"></audio>
    </button>
  );
}
