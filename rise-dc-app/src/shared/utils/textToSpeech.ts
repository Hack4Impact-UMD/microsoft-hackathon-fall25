import {
  SpeechConfig,
  AudioConfig,
  SpeechSynthesizer,
  ResultReason,
  SpeechSynthesisResult,
  AudioOutputStream,
} from "microsoft-cognitiveservices-speech-sdk";

// TODO for production: move this function to run on a secure backend environment, so VITE_SPEECH_KEY isn't exposed client-side
export async function getAudioBlobFromText(text: string): Promise<Blob> {
  if (!import.meta.env.VITE_SPEECH_KEY || !import.meta.env.VITE_SPEECH_REGION) {
    throw new Error("Missing credentials for text-to-speech");
  }
  const speechConfig = SpeechConfig.fromSubscription(
    import.meta.env.VITE_SPEECH_KEY,
    import.meta.env.VITE_SPEECH_REGION,
  );
  const stream = AudioOutputStream.createPullStream();
  const audioConfig = AudioConfig.fromStreamOutput(stream);

  speechConfig.speechSynthesisVoiceName = "en-US-AvaMultilingualNeural";

  const synthesizer: SpeechSynthesizer | null = new SpeechSynthesizer(
    speechConfig,
    audioConfig,
  );
  return new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(
      text,
      (e: SpeechSynthesisResult) => {
        if (e.reason === ResultReason.SynthesizingAudioCompleted) {
          const blob = new Blob([e.audioData], { type: "audio/wav" });
          resolve(blob);
        } else {
          console.log("speech synthesis canceled");
          reject("speech synthesis canceled");
        }
        synthesizer.close();
      },
      (error: string) => {
        console.error(error);
        synthesizer.close();
        reject(error);
      },
    );
  });
}
