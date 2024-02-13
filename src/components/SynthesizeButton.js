// components/SynthesizeButton.js
import React from 'react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import AudioPlayer from './AudioPlayer';

const SynthesizeButton = ({ editorContent }) => {
  const { audioSrc, synthesizeSpeech } = useSpeechSynthesis();

  const handleSynthesize = () => {
    synthesizeSpeech(editorContent);
  };

  return (
    <div>
      <button
        onClick={handleSynthesize}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Synthesize Speech
      </button>
      {audioSrc && (
        <div className="mt-4">
          <AudioPlayer audioSrc={audioSrc} />
        </div>
      )}
    </div>
  );
};

export default SynthesizeButton;
