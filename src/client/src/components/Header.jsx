import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/odinbook" className="header__brand">
        odinbook
      </Link>
    </header>
  );
}

export default Header;
