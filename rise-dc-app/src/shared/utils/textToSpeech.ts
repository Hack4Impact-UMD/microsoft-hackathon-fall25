import { SpeechConfig, AudioConfig, SpeechSynthesizer, ResultReason, SpeechSynthesisResult } from "microsoft-cognitiveservices-speech-sdk";

export async function textToSpeech(text: string, _filename?: string) {
  if (!import.meta.env.VITE_SPEECH_KEY || !import.meta.env.VITE_SPEECH_REGION) {
    throw new Error("Missing credentials for text-to-speech")
  }
  const speechConfig = SpeechConfig.fromSubscription(import.meta.env.VITE_SPEECH_KEY, import.meta.env.VITE_SPEECH_REGION);

  const audioConfig = AudioConfig.fromDefaultSpeakerOutput();

  speechConfig.speechSynthesisVoiceName = "en-US-AvaMultilingualNeural";

  const synthesizer: SpeechSynthesizer | null = new SpeechSynthesizer(speechConfig, audioConfig);
  synthesizer.speakTextAsync(text, (e: SpeechSynthesisResult) => {
    if (e.reason === ResultReason.SynthesizingAudioCompleted) {
      console.log('done creating audio file')
    } else {
      console.log('speech synthesis canceled');
    }
    synthesizer.close();
  }, (error: string) => console.error(error));
}