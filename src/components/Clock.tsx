import { useState, useEffect } from 'react';
import '../styles/Clock.css';

interface ClockProps {
  timezone?: string;
}

export function Clock({ timezone = 'local' }: ClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="clock-container">
      <div className="time-display">{formatTime(time)}</div>
      <div className="date-display">{formatDate(time)}</div>
    </div>
  );
}