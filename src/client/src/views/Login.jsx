import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Login() {
  return (
    <div>
      <Header />
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>

        <button type="button">Login</button>
        <Link to="/odinbook/signup">No account? Create one!</Link>
      </form>
    </div>
  );
}

export default Login;
