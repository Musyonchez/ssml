// pages/index.js
import React from 'react';
import SynthesizeButton from '../components/SynthesizeButton';
import AudioPlayer from '../components/AudioPlayer';

const Home = () => {
  return (
    <div>
      <h1>Text-to-Speech Webpage</h1>
      <SynthesizeButton />
      <AudioPlayer />
    </div>
  );
};

export default Home;
