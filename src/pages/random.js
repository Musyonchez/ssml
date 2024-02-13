import React, { useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "../components/AudioPlayer";

const test = () => {
  const [data, setData] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);

  const apiUrl = "https://baconipsum.com/api/?type=all-meat&sentences=5";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log("response Data", response);
        setData(response.data.join("\n"));
      } catch (error) {
        console.error("Error fetching data", error.message);
      }
    };

    fetchData();
  }, []);

  const handleSynthesize = async () => {
    try {
      const response = await axios.post(
        "/api/synthesize",
        {
          text: data, // Use data directly, no need to stringify
        },
        {
          responseType: "arraybuffer", // Specify the responseType as 'arraybuffer'
        }
      );

      console.log("Synthesis Response:", response);

      if (response.status === 200) {
        const audioBlob = new Blob([response.data], { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);

        setAudioSrc(audioUrl);
      } else {
        throw new Error("Failed to fetch audio");
      }
    } catch (error) {
      console.error("Error synthesizing audio", error.message);
    }
  };

  return (
    <div>
      <h1>test</h1>
      <p>{data}</p>
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

export default test;
