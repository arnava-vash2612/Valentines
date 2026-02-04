import { useState, useEffect, useRef } from 'react';
import Journey from './components/Journey';
import Envelope from './components/Envelope';
import { storyData } from './data';
import './App.css';

function App() {
  const [stage, setStage] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false); // Track if assets are ready
  const audioRef = useRef(new Audio());

  // --- PRELOADING ASSETS (THE FIX FOR LAG) ---
  useEffect(() => {
    const preloadAssets = async () => {
      const promises = storyData.map((story) => {
        return new Promise((resolve) => {
          // Preload Image
          const img = new Image();
          img.src = story.img;
          img.onload = resolve; // Continue when loaded
          img.onerror = resolve; // Continue even if error (don't break app)

          // Preload Audio (Optional: Logic to just fetch it)
          const audio = new Audio();
          audio.src = story.song;
          audio.preload = "auto";
        });
      });

      await Promise.all(promises);
      setIsLoaded(true); // Assets are ready!
    };

    preloadAssets();
  }, []);

  // --- AUDIO LOGIC ---
  useEffect(() => {
    if (stage >= 0 && stage < storyData.length) {
      audioRef.current.pause(); // Stop previous song instantly
      audioRef.current.src = storyData[stage].song;
      audioRef.current.volume = 0.5;

      // A small timeout ensures smooth transition between tracks
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => console.log("Audio play prevented:", error));
      }
    }
  }, [stage]);

  const handleNext = () => {
    setStage((prev) => prev + 1);
  };

  return (
    <div className="app-container">

      {/* Background Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      {/* START SCREEN */}
      {stage === -1 && (
        <div className="start-screen scanner-container">
          <h1>IDENTITY CHECK</h1>
          <p style={{ marginBottom: '30px', color: '#888' }}>Protocol: Valentine // Security Level: 1</p>

          <div className="fingerprint" onClick={handleNext}>
            <div className="fingerprint-icon">⚡</div>
          </div>

          <div className="scan-text">
            {isLoaded ? "TOUCH TO AUTHENTICATE" : "SYSTEM LOADING..."}
          </div>
        </div>
      )}

      {/* JOURNEY */}
      {stage >= 0 && stage < storyData.length && (
        <Journey
          currentStage={stage}
          data={storyData}
          onNext={handleNext}
        />
      )}

      {/* ENVELOPE */}
      {stage >= storyData.length && (
        <Envelope />
      )}

    </div>
  );
}

export default App;