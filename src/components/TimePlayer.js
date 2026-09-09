import React, { useState, useEffect } from 'react';
import './TimePlayer.css';

export default function TimePlayer({ onTimeChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const nextVal = prev + 2;
          onTimeChange(nextVal); // Sends time step updates up to App.js
          return nextVal;
        });
      }, 200); // Speed of simulation
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onTimeChange]);

  return (
    <div className="time-player">
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        style={{ background: '#38bdf8', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', color: '#0f172a' }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={progress}
        onChange={(e) => {
          setProgress(Number(e.target.value));
          onTimeChange(e.target.value);
        }}
        style={{ flex: 1, accentColor: '#38bdf8' }}
      />
      <span style={{ fontSize: '0.85rem', color: '#94a3b8', minWidth: '90px' }}>
        {isPlaying ? 'Simulating...' : 'Timeline Ready'}
      </span>
    </div>
  );
}