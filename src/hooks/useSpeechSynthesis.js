// hooks/useSpeechSynthesis.js
import { useState } from 'react';

export const useSpeechSynthesis = () => {
  const [audioSrc, setAudioSrc] = useState(null);

  const synthesizeSpeech = async (text) => {
    try {
      const response = await fetch('/api/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch audio');
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);

      setAudioSrc(audioUrl);
    } catch (error) {
      console.error('Error fetching audio:', error.message);
    }
  };

  return { audioSrc, synthesizeSpeech };
};
