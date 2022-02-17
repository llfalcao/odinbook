import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';
import { addFriend, fetchFriendRequests } from '../api/users';

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

              <button type="button" className="friendRequest__btn btn-delete">
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
              <button type="button" className="friendRequest__btn btn-delete">
                {/* todo: delete friend request */}
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
