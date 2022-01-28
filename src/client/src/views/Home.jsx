import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userApis } from '../api';
import Header from '../components/Header';
import Post from '../components/Post';
import LandingPage from './LandingPage';

function Home({ user, status }) {
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchPosts() {
      if (!user) return;
      const api = userApis.read;
      const token = localStorage.getItem('token');
      const response = await fetch(`${api.url}/${user.username}/feed`, {
        method: api.method,
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, [user]);

  if (!user) return <LandingPage status={status} />;

  return (
    <div className="home">
      <Header />
      <main>
        <div className="new-post__form">
          <div className="new-post__profilePicture">
            <img src={user.profile_pic} alt="" />
          </div>
          <Link to="/odinbook/new-post" className="new-post__link">
            {`What's on your mind, ${user.first_name}?`}
          </Link>
        </div>

        <section className="posts">
          {posts &&
            posts.map((post) => {
              return (
                <Post
                  key={post._id}
                  postId={post._id}
                  author={post.user_id}
                  date={post.created_at}
                  body={post.body}
                  userId={user.id}
                />
              );
            })}
        </section>
      </main>
    </div>
  );
}

export default Home;
