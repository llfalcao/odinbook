import { useEffect, useState } from 'react';
import LandingPage from './LandingPage';
import Post from '../components/Post';
import { LoadingIcon } from '../components/Icons';
import { fetchPostFeed } from '../api/posts';
import Friendlist from '../components/Friendlist';
import NewPostCTA from '../components/NewPostCTA';
import Sidebar from '../components/Sidebar';

function Home({ user, status, token }) {
  const [posts, setPosts] = useState();
  useEffect(() => fetchPostFeed(user).then((data) => setPosts(data)), [user]);

  const currentToken = localStorage.getItem('token');
  if (!user || currentToken !== token) return <LandingPage status={status} />;

  return (
    <div className="home">
      <div className="columns">
        <Sidebar user={user} />

        <main>
          <NewPostCTA user={user} />
          <section className="posts">
            {posts ? (
              posts.map((post) => {
                return (
                  <Post
                    key={post._id}
                    postId={post._id}
                    author={post.user_id}
                    date={post.created_at}
                    body={post.body}
                    currentUser={user}
                    linkToComments={true}
                  />
                );
              })
            ) : (
              <LoadingIcon />
            )}
          </section>
        </main>

        <Friendlist username={user.username} />
      </div>
    </div>
  );
}

export default Home;
