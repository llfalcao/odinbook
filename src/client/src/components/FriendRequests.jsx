import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/auth';
import { addFriend, fetchFriendRequests } from '../api/users';

export default function FriendRequests() {
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

  return (
    <div>
      <p>Sent</p>
      <ul>
        {friendRequests.sent.map((req) => (
          <li key={req._id}>
            <div>
              <div className="profilePicture--small">
                <img src={req.user_info.profile_pic} alt="" />
              </div>
              <p>{req.user_info.full_name}</p>
            </div>
            <div>
              <button type="button">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <p>Received</p>
      {friendRequests.received.map((req) => (
        <li key={req._id}>
          <div>
            <div className="profilePicture--small">
              <img src={req.user_info.profile_pic} alt="" />
            </div>
            <p>{req.user_info.full_name}</p>
          </div>
          <div>
            <button type="button" onClick={() => acceptRequest(req)}>
              Confirm
            </button>
            <button type="button">Delete</button>
          </div>
        </li>
      ))}
    </div>
  );
}
