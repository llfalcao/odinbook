import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserPosts } from '../api/posts';
import Header from '../components/Header';
import { AboutIcon, LoadingIcon } from '../components/Icons';
import Post from '../components/Post';

export default function Profile({ user }) {
  const [posts, setPosts] = useState();
  useEffect(
    () => fetchUserPosts(user.username).then((data) => setPosts(data)),
    [user],
  );

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
            <span>105</span>
            <span>Posts</span>
          </Link>
        </div>
      </div>
      <section className="posts">
        {posts ? (
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
          <LoadingIcon />
        )}
      </section>
    </main>
  );
}
