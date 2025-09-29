import { useState, useEffect } from 'react';
import { useSubscribeDev } from '@subscribe.dev/react';
import '../styles/Clock.css';

interface ClockSettings {
  format24h: boolean;
  showSeconds: boolean;
  lastViewedAt?: number;
}

export function ClockWithStorage() {
  const { useStorage } = useSubscribeDev();
  const [time, setTime] = useState(new Date());

  const [settings, setSettings, syncStatus] = useStorage<ClockSettings>('clock-settings', {
    format24h: true,
    showSeconds: true
  });

  useEffect(() => {
    setSettings({
      ...settings,
      lastViewedAt: Date.now()
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour12: !settings.format24h,
      hour: '2-digit',
      minute: '2-digit',
      ...(settings.showSeconds && { second: '2-digit' })
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

  const toggleFormat = () => {
    setSettings({
      ...settings,
      format24h: !settings.format24h
    });
  };

  const toggleSeconds = () => {
    setSettings({
      ...settings,
      showSeconds: !settings.showSeconds
    });
  };

  return (
    <div className="clock-container">
      <div className="sync-status">Sync: {syncStatus}</div>
      <div className="time-display">{formatTime(time)}</div>
      <div className="date-display">{formatDate(time)}</div>

      <div className="clock-controls">
        <button onClick={toggleFormat} className="control-btn">
          {settings.format24h ? '12h' : '24h'} Format
        </button>
        <button onClick={toggleSeconds} className="control-btn">
          {settings.showSeconds ? 'Hide' : 'Show'} Seconds
        </button>
      </div>

      {settings.lastViewedAt && (
        <div className="last-viewed">
          Last viewed: {new Date(settings.lastViewedAt).toLocaleString()}
        </div>
      )}
    </div>
  );
}