//pages/index.js

import React, { useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import Navbar from "@/components/Navbar";
import ReadPanel from "@/components/ReadPanel";


// const [audioSrc, setAudioSrc] = useState(null);

const handleSynthesize = async () => {
  try {
    // Fetch synthesized audio from the server API route
    const response = await fetch("/api/synthesize");

    if (!response.ok) {
      throw new Error("Failed to fetch audio");
    }

    // Assuming the server responds with an audio file (e.g., mp3)
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);

    // Set the audio source for playback
    setAudioSrc(audioUrl);
  } catch (error) {
    console.error("Error fetching audio:", error.message);
  }
};

{/* {audioSrc && <AudioPlayer audioSrc={audioSrc} />} */}

const index = () => {
  return (
    <div>
        <Navbar />
        <ReadPanel />
    </div>
  );
};

export default index;

