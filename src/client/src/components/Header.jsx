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
        <>
          <FriendRequests />
          <button type="button" onClick={logout}>
            Sign out
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
