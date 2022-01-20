import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing">
      <header className="landing__header">
        <Link to="/odinbook" className="landing__brand">
          odinbook
        </Link>
      </header>
      <main className="landing__main">
        <h1 className="landing__headline">
          Connect with friends and the world around you on Odinbook.
        </h1>
        <button type="button" className="landing__cta">
          Sign in
        </button>
      </main>
    </div>
  );
}

export default LandingPage;
