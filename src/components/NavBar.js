import React, { useState, useEffect } from 'react';
import './NavBar.css';

export default function NavBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the clock every second
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-logo">OceanVis</div>
      <div className="navbar-time">{time.toLocaleTimeString()}</div>
      <div className="navbar-help">?</div>
    </div>
  );
}