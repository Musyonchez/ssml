import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ audioSrc, onLoadMore }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    const audio = document.getElementById('audioPlayer');

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    // Add event listeners for play, pause, and time update
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    // Cleanup event listeners on component unmount
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleLoadMore = () => {
    // Call the onLoadMore callback passed from the parent component
    if (onLoadMore) {
      onLoadMore();
    }
  };

  const handleTogglePlay = () => {
    const audio = document.getElementById('audioPlayer');

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleSeek = (event) => {
    const audio = document.getElementById('audioPlayer');
    const newPosition = (event.nativeEvent.offsetX / event.target.offsetWidth) * duration;
    audio.currentTime = newPosition;
  };

  const handlePlaybackSpeedChange = (speed) => {
    const audio = document.getElementById('audioPlayer');
    audio.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const handleDownload = () => {
    const audio = document.getElementById('audioPlayer');
    const link = document.createElement('a');
    link.href = audio.src;
    link.download = 'audio.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-100 p-8 rounded-md shadow-lg">
    <audio id="audioPlayer" className="w-full">
      <source src={audioSrc} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    <div className="flex items-center justify-between mt-4">
      <div>
        <button
          onClick={handleTogglePlay}
          className="bg-blue-500 text-white py-2 px-4 rounded mr-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={handleLoadMore}
          className="bg-green-500 text-white py-2 px-4 rounded mr-4 hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
        >
          Load More Content
        </button>
      </div>
      <div className="text-gray-600">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
    <div
      onClick={handleSeek}
      className="w-full h-4 bg-gray-300 mt-4 cursor-pointer relative"
    >
      <div
        style={{ width: `${(currentTime / duration) * 100}%` }}
        className="h-full bg-green-500"
      ></div>
    </div>
    <div className="mt-4 flex items-center">
      <label className="mr-2 text-gray-600">Playback Speed:</label>
      <select
        onChange={(e) => handlePlaybackSpeedChange(parseFloat(e.target.value))}
        value={playbackSpeed}
        className="border border-gray-300 rounded p-2 focus:outline-none"
      >
        <option value={0.5}>0.5x</option>
        <option value={1}>1x</option>
        <option value={1.5}>1.5x</option>
        <option value={2}>2x</option>
      </select>
    </div>
    <button
      onClick={handleDownload}
      className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple active:bg-purple-800"
    >
      Download
    </button>
  </div>
);
};

export default AudioPlayer;