import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserPosts } from '../api/posts';
import {
  fetchUser,
  fetchFriendRequests,
  sendFriendRequest,
} from '../api/users';
import Header from '../components/Header';
import { AboutIcon, LoadingIcon } from '../components/Icons';
import NewPostCTA from '../components/NewPostCTA';
import Post from '../components/Post';

export default function Profile({ user: currentUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [isFriendshipPending, setIsFriendshipPending] = useState();

  const url = window.location.href.split('/');
  const username = url[url.length - 1];

  useEffect(() => {
    (async () => {
      const user = await fetchUser(username);
      if (user === 'User not found') {
        return navigate('/odinbook/not-found');
      }
      const { sent } = await fetchFriendRequests(currentUser._id);
      setIsFriendshipPending(sent.includes(user._id));
      const posts = await fetchUserPosts(username);
      setUser(user);
      setPosts(posts);
    })();
  }, [username, navigate, currentUser]);

  const requestFriendship = async () => {
    await sendFriendRequest(currentUser._id, user._id);
    setIsFriendshipPending(true);
  };

  if (!user) return <LoadingIcon />;

  return (
    <>
      <Header user={currentUser} />
      <main>
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

          {currentUser.username !== user.username &&
            (!currentUser.friends.includes(user._id) ? (
              isFriendshipPending ? (
                <button type="button" className="profileCard__requestBtn">
                  Request Sent
                </button>
              ) : (
                <button
                  type="button"
                  className="profileCard__requestBtn"
                  onClick={requestFriendship}
                >
                  Send Friend Request
                </button>
              )
            ) : (
              <div>Friends</div>
            ))}
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
    </>
  );
}
