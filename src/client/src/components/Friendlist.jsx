import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFriends } from '../api/users';

export default function Friendlist({ username }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends(username).then((list) => setFriends(list));
  }, [username]);

  return (
    <div className="friendlist friendlist--sidebar">
      <h4>Friends</h4>
      <ul>
        {friends.map((user) => (
          <li key={user._id}>
            <Link to={`/odinbook/u/${user.username}`}>
              <div className="profilePicture profilePicture--small">
                <img src={user.profile_pic} alt="" />
              </div>
              <p>{user.full_name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
