import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api';
import Header from '../components/Header';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleErrors = (field, state) => {
    const description =
      field === 'username'
        ? 'Username required.'
        : 'Password required.';
    if (state[field].length === 0) {
      setErrors({ ...errors, [field]: description });
    } else {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextState = { ...user, [name]: value };
    setUser(nextState);
    handleErrors(name, nextState);
  };

  const isEmpty = () =>
    user.username.length === 0 || user.password.length === 0
      ? true
      : false;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty()) return;

    const api = login;
    const response = await fetch(api.url, {
      headers: api.headers,
      method: api.method,
      body: JSON.stringify(user),
    });
    const { accessToken, errors } = await response.json();

    if (errors) {
      Object.entries(errors).forEach(([key, value]) =>
        setErrors({ ...errors, [key]: value }),
      );
      return;
    }

    if (accessToken) {
      localStorage.setItem('token', accessToken);
      navigate('/odinbook');
    }
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
        {errors.username ? (
          <span className="login__error">{errors.username}</span>
        ) : null}

        <input
          id="password"
          className="login__formInput"
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={onChange}
        />
        {errors.password ? (
          <span className="login__error">{errors.password}</span>
        ) : null}

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
