import { useEffect, useState, useRef } from "react";
import { Mic, X } from "lucide-react";

export default function MicButton({
  setInput,
  setIsListening: setParentListening,
}) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "id-ID";
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }

        console.log("Mendengar:", currentTranscript);
        setInput(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech Error:", event.error);
        if (event.error === "not-allowed") {
          alert("Izinkan akses mikrofon di browser Anda.");
          setIsListening(false);
        }
      };

      recognition.onend = () => {
        if (isListening) {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    } else {
      console.error("Browser tidak mendukung Speech Recognition");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (setParentListening) {
      setParentListening(isListening);
    }
  }, [isListening, setParentListening]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Browser tidak support.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      console.log("Mic dimatikan user.");
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        console.log("Mic dinyalakan user.");
      } catch (err) {
        console.error("Gagal start:", err);
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {isListening && (
        <div className="flex items-center gap-2 opacity-0 translate-x-2 animate-[slideInRight_0.50s_ease-out_forwards]">
          <div className="relative flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 dark:bg-emerald-300 rounded-full"></div>
            <div className="absolute w-5 h-5 rounded-full bg-blue-300 dark:bg-emerald-300 animate-ping opacity-40"></div>
          </div>
          <span className="text-sm text-blue-500 dark:text-emerald-300">
            Mendengarkan...
          </span>
        </div>
      )}

      <button
        onClick={toggleMic}
        className={`flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out h-10
          ${
            isListening
              ? "px-4 rounded-full bg-red-500/80 text-white hover:bg-red-600"
              : "btn-circle w-10 lg:w-13 lg:h-13 bg-white text-blue-600 dark:text-emerald-600 border dark:border-emerald-600 hover:bg-emerald-50 hover:scale-103"
          }
        `}
      >
        {isListening ? (
          <>
            <X className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="text-sm lg:text-md">Stop</span>
          </>
        ) : (
          <Mic className="w-4 h-4 lg:w-5.5 lg:h-5.5" />
        )}
      </button>
    </div>
  );
}
