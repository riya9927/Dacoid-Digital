import React, { useEffect, useState } from 'react';

export default function QuizTimer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="text-xl font-semibold">
      Time Left: {timeLeft}s
    </div>
  );
}