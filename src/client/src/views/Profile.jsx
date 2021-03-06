import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserPosts } from '../api/posts';
import {
  fetchUser,
  fetchFriendRequests,
  sendFriendRequest,
} from '../api/users';
import { AboutIcon, LoadingIcon, PictureUpdateIcon } from '../components/Icons';
import NewPostCTA from '../components/NewPostCTA';
import PictureUpdater from '../components/PictureUpdater';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import Friendlist from '../components/Friendlist';

export default function Profile({ user: currentUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [isFriendshipPending, setIsFriendshipPending] = useState();
  const [modal, setModal] = useState(false);

  const url = window.location.href.split('/');
  const username = url[url.length - 1];

  const loadUserData = async (username) => {
    const user = await fetchUser(username);
    if (user === 'User not found') {
      return navigate('/odinbook/not-found');
    }
    const { sent } = await fetchFriendRequests(currentUser._id);
    const posts = await fetchUserPosts(username);
    setIsFriendshipPending(sent.some((req) => req.to === user._id));
    setUser(user);
    setPosts(posts);
  };

  useEffect(() => {
    loadUserData(username);

    return () => {
      setPosts(undefined);
      setIsFriendshipPending(undefined);
      setUser(null);
    };
  }, [username]);

  const requestFriendship = async () => {
    await sendFriendRequest(currentUser._id, user._id);
    setIsFriendshipPending(true);
  };

  if (!user) return <LoadingIcon />;

  return (
    <div className="profile">
      <Sidebar user={user} />
      <main>
        <div className="profileCard">
          <div>
            <div className="profilePicture">
              <img src={user.profile_pic} alt="ProfilePic" />
              {currentUser.username === user.username && (
                <button
                  type="button"
                  className="profilePicture__updateBtn"
                  onClick={() => setModal(true)}
                >
                  <PictureUpdateIcon />
                </button>
              )}
            </div>
            <h1>{user.full_name}</h1>
          </div>
          {modal ? (
            <PictureUpdater
              user={currentUser}
              close={() => setModal(false)}
              reload={async () => {
                setModal(false);
                setUser(await fetchUser(username));
              }}
            />
          ) : (
            <div className="profileCard__links">
              <Link to="##">
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
          )}

          {currentUser.username !== user.username &&
            (!currentUser.friends.includes(user._id) ? (
              isFriendshipPending ? (
                <button type="button" className="profileCard__requestBtn">
                  {/* Todo: undo request */}
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
              <button
                type="button"
                className="profileCard__requestBtn"
                onClick={requestFriendship}
              >
                Friends
              </button>
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
                  currentUser={currentUser}
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
      <Friendlist username={currentUser.username} />
    </div>
  );
}
