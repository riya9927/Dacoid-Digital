import React, { useState, useEffect } from 'react';

const QUIZ_DURATION = 30 * 60; // 30 minutes in seconds

const QuizTimer = ({ onTimeUp, isPaused }) => {
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);

  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, isPaused, onTimeUp]);

  // Reset timer when quiz is restarted
  useEffect(() => {
    setTimeLeft(QUIZ_DURATION);
  }, []);

  // Format time to display minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-lg font-semibold">
      Time left: {formatTime(timeLeft)}
    </div>
  );
};

export default QuizTimer;