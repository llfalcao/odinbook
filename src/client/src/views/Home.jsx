import Header from '../components/Header';

function Home({ user }) {
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
