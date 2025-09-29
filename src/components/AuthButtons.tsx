import { useSubscribeDev } from '@subscribe.dev/react';
import '../styles/Auth.css';

export function AuthButtons() {
  const { isSignedIn, signIn, signOut, user, usage, subscriptionStatus } = useSubscribeDev();

  if (!isSignedIn) {
    return (
      <div className="auth-container">
        <h2>Welcome to Clock App</h2>
        <p>Sign in to save your clock preferences and sync across devices</p>
        <button onClick={signIn} className="auth-btn primary">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="user-info">
      <div className="user-details">
        {user?.avatarUrl && (
          <img src={user.avatarUrl} alt="User avatar" className="user-avatar" />
        )}
        <div className="user-text">
          <span className="user-email">{user?.email}</span>
          <span className="user-plan">
            Plan: {subscriptionStatus?.plan?.name ?? 'Free'}
          </span>
        </div>
      </div>

      {usage && (
        <div className="usage-info">
          Credits: {usage.remainingCredits} / {usage.allocatedCredits}
        </div>
      )}

      <button onClick={signOut} className="auth-btn secondary">
        Sign Out
      </button>
    </div>
  );
}