import { useEffect, useState } from 'react';

const useCountdown = (durationS: number, initialS?: number): [() => void, number] => {
  const [timeLeft, setTimeLeft] = useState(initialS ?? durationS);

  const reset = () => setTimeLeft(durationS);

  useEffect(() => {
    const intervalId = window.setInterval(() => setTimeLeft(time => Math.max(time - 1, 0)), 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return [reset, timeLeft];
};

export default useCountdown;
