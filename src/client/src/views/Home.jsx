import { useEffect, useState } from 'react';
import LandingPage from './LandingPage';
import Header from '../components/Header';
import Post from '../components/Post';
import { LoadingIcon } from '../components/Icons';
import { fetchPostFeed } from '../api/posts';
import Friendlist from '../components/Friendlist';
import NewPostCTA from '../components/NewPostCTA';

function Home({ user, status, token }) {
  const [posts, setPosts] = useState();
  useEffect(() => fetchPostFeed(user).then((data) => setPosts(data)), [user]);

  const currentToken = localStorage.getItem('token');
  if (!user || currentToken !== token) return <LandingPage status={status} />;

  return (
    <div className="home">
      <Header user={user} />
      <div className="columns">
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
                    userId={user.id}
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
