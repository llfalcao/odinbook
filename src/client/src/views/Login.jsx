import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
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
