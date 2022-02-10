import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFriendRequests } from '../api/users';

function Header({ user }) {
  const [friendRequests, setFriendRequests] = useState({
    sent: [],
    received: [],
  });

  useEffect(() => {
    (async () => {
      const { sent, received } = await fetchFriendRequests(user._id);
      setFriendRequests((friendRequests) => ({
        ...friendRequests,
        sent,
        received,
      }));
    })();
  }, [user]);

  return (
    <header className="header">
      <Link to="/odinbook" className="header__brand">
        odinbook
      </Link>
      {user && (
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
                  <button type="button">Confirm</button>
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
                <button type="button">Confirm</button>
                <button type="button">Delete</button>
              </div>
            </li>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
