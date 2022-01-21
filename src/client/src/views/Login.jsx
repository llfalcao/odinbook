import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api';
import Header from '../components/Header';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });

  const onChange = (e) => {
    const nextState = { ...user };
    nextState[e.target.name] = e.target.value;
    setUser(nextState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const api = login;
    const response = await fetch(api.url, {
      headers: api.headers,
      method: api.method,
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data) {
      localStorage.setItem('token', data.accessToken);
      navigate('/odinbook');
    }
    // todo: show errors
  };

  return (
    <div className="login">
      <Header />
      <form className="login__form" onSubmit={onSubmit}>
        <input
          id="username"
          className="login__formInput"
          name="username"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={onChange}
        />

        <input
          id="password"
          className="login__formInput"
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={onChange}
        />

        <button
          type="submit"
          className="login__btn login__logInBtn"
          onClick={onSubmit}
        >
          Log In
        </button>

        <hr />

        <Link
          to="/odinbook/signup"
          className="login__btn login__newAccountBtn"
        >
          Create new account
        </Link>
      </form>
    </div>
  );
}

export default Login;
