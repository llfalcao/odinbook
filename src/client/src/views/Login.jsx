import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Login() {
  const [user, setUser] = useState({ username: '', password: '' });

  const onChange = (e) => {
    const nextState = { ...user };
    nextState[e.target.name] = e.target.value;
    setUser(nextState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
