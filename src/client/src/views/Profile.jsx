import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserPosts } from '../api/posts';
import { fetchUser } from '../api/users';
import Header from '../components/Header';
import { AboutIcon, LoadingIcon } from '../components/Icons';
import NewPostCTA from '../components/NewPostCTA';
import Post from '../components/Post';

export default function Profile({ user: currentUser }) {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const url = window.location.href.split('/');
  const username = url[url.length - 1];
  useEffect(() => {
    fetchUser(username).then((data) => setUser(data));
    fetchUserPosts(username).then((data) => setPosts(data));
  }, [username]);

  if (!user) return <LoadingIcon />;

  return (
    <main>
      <Header user={user} />
      <div className="profileCard">
        <div>
          <div className="profilePicture">
            <img src={user.profile_pic} alt="ProfilePic" />
          </div>
          <h1>{user.full_name}</h1>
        </div>
        <div className="profileCard__links">
          <Link to="about">
            <AboutIcon />
            <span>About</span>
          </Link>
          <Link to="friends">
            <span>{user.friends.length}</span>
            <span>Friends</span>
          </Link>
          <Link to={`/odinbook/u/${user.username}`}>
            <span>{user.total_posts}</span>
            <span>Posts</span>
          </Link>
        </div>
      </div>

      {currentUser.username === username && <NewPostCTA user={user} />}
      <section className="posts">
        {posts ? (
          posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                author={user}
                date={post.created_at}
                body={post.body}
                userId={user._id}
                linkToComments={true}
              />
            ))
          ) : (
            <p>No posts yet.</p>
          )
        ) : (
          <LoadingIcon />
        )}
      </section>
    </main>
  );
}
