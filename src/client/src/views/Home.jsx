import { useEffect, useState } from 'react';
import { postApis } from '../api';
import Header from '../components/Header';
import Post from '../components/Post';
import LandingPage from './LandingPage';

function Home({ user, status }) {
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchPosts() {
      if (!user) return;

      const api = postApis.read;
      const response = await fetch(api.url, {
        method: api.method,
      });
      const data = await response.json();
      console.log(data);
      setPosts(data);
    }
    fetchPosts();
  }, [user]);

  if (!user) return <LandingPage status={status} />;

  return (
    <div className="home">
      <Header />
      <main>
        <h1>Welcome back, {user.first_name}!</h1>

        <section className="posts">
          {posts &&
            posts.map((post) => {
              return <Post key={post._id} body={post.body} />;
            })}
        </section>
      </main>
    </div>
  );
}

export default Home;
