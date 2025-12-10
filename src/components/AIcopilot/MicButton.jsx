import { useEffect, useState } from "react";
import { Mic, MicOff, X } from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function MicButton({ setInput, setIsListening }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleMicClick = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser Anda tidak mendukung Speech Recognition");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      console.log(transcript);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: true,
        language: "id-ID ",
      });
    }
  };

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript, setInput]);

  useEffect(() => {
    setIsListening(listening);
  }, [listening, setIsListening]);

  return (
    <div className="flex flex-col items-center gap-2">
      {listening && (
        <div className="flex items-center gap-2 text-error opacity-0 translate-x-2 animate-[slideInRight_0.50s_ease-out_forwards]">
          <div className="relative flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 dark:bg-emerald-300 rounded-full"></div>
            <div className="absolute w-5 h-5 rounded-full  bg-blue-300 dark:bg-emerald-300 animate-ping opacity-40"></div>
          </div>
          <span className="text-sm text-blue-500 dark:text-emerald-300">
            Listening…
          </span>
        </div>
      )}

      {/* === Mic Button === */}
      <button
        onClick={handleMicClick}
        className={`flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out h-10
    ${
      listening
        ? "px-4 rounded-full bg-red-500/80 text-white hover:bg-red-600"
        : "btn-circle w-10 lg:w-13 lg:h-13 bg-white text-blue-600 dark:text-emerald-600 border dark:border-emerald-600 hover:bg-emerald-50 hover:scale-103"
    }
  `}
      >
        {listening ? (
          <>
            <X className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="text-sm lg:text-md">End</span>
          </>
        ) : (
          <Mic className="w-4 h-4 lg:w-5.5 lg:h-5.5" />
        )}
      </button>
    </div>
  );
}
