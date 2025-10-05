"use client";

import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "../ui/button";
import { Mic } from "lucide-react";
import { useTheme } from "next-themes";

interface VoiceSearchProps {
  onVoiceResult: (text: string) => void;
}

export default function VoiceSearch({ onVoiceResult }: VoiceSearchProps) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const { theme } = useTheme();

  useEffect(() => {
    if (transcript) {
      onVoiceResult(transcript);
      resetTranscript(); // clear transcript after passing result
    }
  }, [transcript, onVoiceResult, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser doesn’t support speech recognition 😔</p>;
  }

  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({
        continuous: false,
        language: "en-GB", // 🇬🇧 use British English
      });
    }
  };

  return (
    <Button
      onClick={handleToggleListening}
      className={`flex items-center justify-center cursor-pointer transition-all duration-300 
        ${
          listening
            ? "bg-[var(--accent-blue)] animate-pingOnce"
            : "bg-[var(--background-card)] hover:bg-[var(--accent-blue)]"
        }`}
      title={listening ? "Click to stop listening" : "Click to start speaking"}
    >
      <Mic
        size={20}
        className={`text-white transition-transform duration-300 ${
          listening ? "scale-125 animate-bounce-slow" : "scale-100"
        }`}
        style={{
          filter: theme === "light" ? "brightness(0) saturate(100%)" : "none",
        }}
      />
    </Button>
  );
}
