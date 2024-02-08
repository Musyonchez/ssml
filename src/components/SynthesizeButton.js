// components/SynthesizeButton.js
import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer';

const SynthesizeButton = ({ editorContent }) => {
  const [audioSrc, setAudioSrc] = useState(null);

  const handleSynthesize = async () => {
    try {
      const response = await fetch('/api/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: editorContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch audio');
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);

      setAudioSrc(audioUrl);
    } catch (error) {
      console.error('Error fetching audio:', error.message);
    }
  };

  return (
    <div>
      <button onClick={handleSynthesize}>Synthesize Speech</button>
      {audioSrc && <AudioPlayer audioSrc={audioSrc} />}
    </div>
  );
};

export default SynthesizeButton;
