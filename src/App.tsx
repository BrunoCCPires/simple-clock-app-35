import { useSubscribeDev } from '@subscribe.dev/react';
import { Clock } from './components/Clock';
import { ClockWithStorage } from './components/ClockWithStorage';
import { AuthButtons } from './components/AuthButtons';
import './App.css';

function App() {
  const { isSignedIn } = useSubscribeDev();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Simple Clock App</h1>
        <p className="app-subtitle">A clean and simple clock with cloud sync</p>
      </header>

      <AuthButtons />

      <main className="app-main">
        {isSignedIn ? <ClockWithStorage /> : <Clock />}
      </main>

      <footer className="app-footer">
        <p>
          {isSignedIn
            ? 'Your preferences are synced to the cloud'
            : 'Sign in to sync your preferences across devices'}
        </p>
      </footer>
    </div>
  );
}

export default App;
