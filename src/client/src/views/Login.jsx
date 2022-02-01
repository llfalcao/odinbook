import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { handleLogin } from '../api/auth';
import Header from '../components/Header';

export default function Login({ authenticate, status, token }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const currentToken = localStorage.getItem('token');
  if (currentToken && currentToken === token) {
    return <Navigate to="/odinbook" />;
  }

  if (status === 'loading') {
    return <></>;
  }

  const handleErrors = (field, state) => {
    const description =
      field === 'username' ? 'Username required.' : 'Password required.';
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

  const hasEmptyFields = () => {
    const err = {};
    if (user.username.length === 0) {
      err.username = 'Username required.';
    }
    if (user.password.length === 0) {
      err.password = 'Password required.';
    }
    setErrors(err);
    return Object.keys(err).length !== 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (hasEmptyFields()) return;

    const { accessToken, errors } = await handleLogin(user);
    if (errors) {
      Object.entries(errors).forEach(([key, value]) =>
        setErrors({ ...errors, [key]: value }),
      );
      return;
    }

    if (accessToken) {
      localStorage.setItem('token', accessToken);
      await authenticate();
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

        <Link to="/odinbook/signup" className="login__btn login__newAccountBtn">
          Create new account
        </Link>
      </form>
    </div>
  );
}
