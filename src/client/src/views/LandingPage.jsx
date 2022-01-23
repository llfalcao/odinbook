import { Link } from 'react-router-dom';
import Header from '../components/Header';

function LandingPage({ status }) {
  if (status === 'loading') {
    return <></>;
  }

  return (
    <div className="landing">
      <Header />
      <main className="landing__main">
        <h1 className="landing__headline">
          Connect with friends and the world around you on Odinbook.
        </h1>
        <Link to="/odinbook/login">
          <button type="button" className="landing__cta">
            Sign in
          </button>
        </Link>
      </main>
    </div>
  );
}

export default LandingPage;
