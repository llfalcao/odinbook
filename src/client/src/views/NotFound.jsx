import { Link } from 'react-router-dom';
import Header from '../components/Header';

function NotFound({ user }) {
  return (
    <div className="not-found">
      <Header user={user} />
      <h1>Sorry, we couldn't find the content you're looking for.</h1>
      <Link to="/odinbook" type="button" className="return">
        Go home
      </Link>
    </div>
  );
}

export default NotFound;
