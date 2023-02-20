import { useState, useEffect } from "react";
export function useCountdown(timeAmount, questionNumber) {
  const [secs, decrement] = useState(timeAmount);
  const [progress, increment] = useState(0);
  useEffect(() => {
    if (secs > 0) {
      const progressLevel = setInterval(() => {
        increment(progress + 100 / timeAmount);
        decrement(secs - 1);
      }, 1000);
      return () => clearInterval(progressLevel);
    }
  }, [progress, secs, timeAmount]);

  useEffect(() => {
    decrement(timeAmount);
    increment(0);
  }, [questionNumber])

  const sec = parseInt(secs % 60, 10);
  const seconds = sec < 10 ? "0" + sec : sec;
  return [progress, seconds];
}