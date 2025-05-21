import { useState } from 'react';

export const useVoiceSearch = (onResult: (text: string) => void) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Tu navegador no soporta el reconocimiento de voz');
      return;
    }

    setIsListening(true);
    setError(null);

    // Esta es una simulación. En un entorno real, usarías la API WebSpeech
    setTimeout(() => {
      setIsListening(false);
      onResult('historia bicentenario bolivia');
    }, 2000);

    // La implementación real sería algo como:
    /*
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-BO';
    recognition.continuous = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    recognition.onerror = (event) => {
      setError('Error en el reconocimiento de voz');
      console.error(event.error);
    };
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
    */
  };

  return {
    isListening,
    error,
    startListening
  };
};