import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FriendRequests from './FriendRequests';
import { FriendsIcon } from './Icons';

function Header({ user }) {
  const navigate = useNavigate();
  const [nav, setNav] = useState({ friendRequests: false });

  const logout = () => {
    localStorage.clear();
    navigate('/odinbook/login');
  };

  const toggleDropdown = (key) => {
    setNav({ ...nav, [key]: !nav[key] });
  };

  return (
    <header className="header">
      <Link to="/odinbook" className="header__brand">
        odinbook
      </Link>
      {user && (
        <nav>
          <Link
            to={`/odinbook/u/${user.username}`}
            className="header__currentUser"
          >
            <div className="profilePicture profilePicture--small">
              <img src={user.profile_pic} alt="" />
            </div>
            <span>{user.full_name}</span>
          </Link>
          <div className="friendRequests__container">
            <button
              type="button"
              onClick={() => toggleDropdown('friendRequests')}
            >
              <FriendsIcon />
            </button>
            <FriendRequests hidden={!nav.friendRequests} />
          </div>
          <button type="button" onClick={logout} className="header__logoutBtn">
            Sign out
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
