import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';
import {
  fetchFriendRequests,
  addFriend,
  deleteFriendRequest,
} from '../api/users';

export default function FriendRequests({ hidden }) {
  const [friendRequests, setFriendRequests] = useState({
    sent: [],
    received: [],
  });

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();
      const { sent, received } = await fetchFriendRequests(currentUser._id);
      setFriendRequests((friendRequests) => ({
        ...friendRequests,
        sent,
        received,
      }));
    })();
  }, []);

  const acceptRequest = async ({
    _id: requestId,
    from: friendId,
    to: userId,
  }) => {
    const response = await addFriend(userId, friendId, requestId);
    if (response.status !== 204) return;
    setFriendRequests((reqs) => ({
      sent: reqs.sent,
      received: reqs.received.filter((req) => req.from !== friendId),
    }));
  };

  const deleteRequest = async (requestId) => {
    const currentUser = await getCurrentUser();
    const response = await deleteFriendRequest(currentUser._id, requestId);
    if (response.status !== 204) return;
    setFriendRequests((reqs) => ({
      sent: reqs.sent.filter((req) => req._id !== requestId),
      received: reqs.received.filter((req) => req._id !== requestId),
    }));
  };

  if (hidden) return <></>;

  return (
    <div className="friendRequests">
      <p>Sent</p>
      <ul>
        {friendRequests.sent.length > 0 ? (
          friendRequests.sent.map((req) => (
            <li key={req._id}>
              <div className="friendRequest__info">
                <div className="profilePicture profilePicture--small">
                  <img src={req.user_info.profile_pic} alt="" />
                </div>
                <span>{req.user_info.full_name}</span>
              </div>

              <button
                type="button"
                className="friendRequest__btn btn-delete"
                onClick={() => deleteRequest(req._id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <span>No friend requests sent.</span>
        )}
      </ul>

      <p>Received</p>
      {friendRequests.received.length > 0 ? (
        friendRequests.received.map((req) => (
          <li key={req._id}>
            <Link
              to={`/odinbook/u/${req.user_info.username}`}
              className="friendRequest__info"
            >
              <div className="profilePicture profilePicture--small">
                <img src={req.user_info.profile_pic} alt="" />
              </div>
              <span>{req.user_info.full_name}</span>
            </Link>

            <div className="friendRequest__btnContainer">
              <button
                type="button"
                className="friendRequest__btn btn-confirm"
                onClick={() => acceptRequest(req)}
              >
                Confirm
              </button>
              <button
                type="button"
                className="friendRequest__btn btn-delete"
                onClick={() => deleteRequest(req._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))
      ) : (
        <span>No friend requests received.</span>
      )}
    </div>
  );
}
