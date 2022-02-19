import { Link } from 'react-router-dom';

function NotFound({ user }) {
  return (
    <div className="not-found">
      <h1>Sorry, we couldn't find the content you're looking for.</h1>
      <Link to="/odinbook" type="button" className="return">
        Go home
      </Link>
    </div>
  );
}

export default NotFound;
