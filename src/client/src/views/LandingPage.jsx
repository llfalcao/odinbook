import { Link } from 'react-router-dom';

export default function LandingPage({ status }) {
  if (status === 'loading') {
    return <></>;
  }

  return (
    <div className="landing">
      <main className="landing__main">
        <div className="landing__headline">
          <h1>Connect with friends and the world around you on Odinbook.</h1>
          <Link to="/odinbook/login">
            <button type="button" className="landing__cta">
              Sign in
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
