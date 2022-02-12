import { Link, useNavigate } from 'react-router-dom';
import FriendRequests from './FriendRequests';

function Header({ user }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/odinbook/login');
  };

  return (
    <header className="header">
      <Link to="/odinbook" className="header__brand">
        odinbook
      </Link>
      {user && (
        <nav>
          <Link to={`/odinbook/u/${user.username}`}>{user.full_name}</Link>
          <FriendRequests />
          <button type="button" onClick={logout}>
            Sign out
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
