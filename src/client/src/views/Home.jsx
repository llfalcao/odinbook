import Header from '../components/Header';
import LandingPage from './LandingPage';

function Home({ user, status }) {
  if (!user) return <LandingPage status={status} />;

  return (
    <div className="home">
      <Header />
      <main>
        <h1>Welcome back, {user.first_name}!</h1>
      </main>
    </div>
  );
}

export default Home;
