import React, { useState, useEffect } from 'react';
import Timer from './components/Timer.js';
import Controls from './components/Controls.js';
import './App.css'

const App = () => {
  const [time, setTime] = useState(1500); // Initial time in seconds (25 minutes)
  const [isBreak, setIsBreak] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      // Handle switch between Pomodoro and Break
      setIsBreak((prevIsBreak) => !prevIsBreak);
      setTime(isBreak ? 300 : 600); // 5 minutes for break, 10 minutes for long break
    }

    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(1500);
  };

  return (
    <div className="container">
      <h1 className='dorotime'>DOROTIME</h1>
      <div className="diamond timer">
        <div className="timer-text">
          <Timer time={time} isBreak={isBreak} />
          <Controls startTimer={startTimer} resetTimer={resetTimer} isActive={isActive} />
        </div>
      </div>
    </div>
  );
};

export default App;
