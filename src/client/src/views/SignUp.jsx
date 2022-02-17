import { Link, useNavigate, Navigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import { createUser } from '../api/users';
import { handleLogin } from '../api/auth';

export default function SignUp({ authenticate, status, token }) {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    password_confirmation: '',
    date_of_birth: '',
    city: '',
    country: '',
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // Minimum age of 13 years old to sign up, just like Facebook...
    const date = new Date();
    setStartDate(date);
    setForm((form) => ({ ...form, date_of_birth: date.toUTCString() }));
    // UX
    const input = document.querySelector('input');
    if (input) input.focus();
  }, []);

  const currentToken = localStorage.getItem('token');
  if (currentToken && currentToken === token) {
    return <Navigate to="/odinbook" />;
  }

  const handleErrors = (name, value) => {
    switch (name) {
      case 'first_name':
        if (value === '') return 'First name required.';
        if (value.length > 50)
          return 'First name must not exceed 50 characters.';
        return;
      case 'last_name':
        if (value === '') return 'Last name required.';
        if (value.length > 50)
          return 'Last name must not exceed 50 characters.';
        return;
      case 'username':
        if (value === '') return 'Username required';
        if (value.length > 20) return 'Username is too long.';
        if (!value.match(/^[A-Za-z0-9]+$/))
          return 'Username can only contain letters and/or numbers.';
        return;
      case 'password':
        if (value === '') return 'Password required.';
        if (value.length > 128) return 'Password is too long.';
        if (form.password_confirmation.length > 0) {
          if (value !== form.password_confirmation) {
            return 'Passwords do not match.';
          } else if (value === form.password_confirmation) {
            return 'Passwords match.';
          }
        }
        return;
      case 'password_confirmation':
        if (value !== form.password) return 'Passwords do not match.';
        return;
      case 'country':
        if (value === '') return 'Country required.';
        return;
      default:
        return;
    }
  };

  const onChange = (e, date) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: date || value });
    setErrors((errors) => {
      const errorMsg = handleErrors(name, date || value);
      if (name === 'password') {
        if (errorMsg === 'Passwords do not match.') {
          delete errors[name];
          return { ...errors, password_confirmation: errorMsg };
        } else if (errorMsg === 'Passwords match.') {
          delete errors[name];
          delete errors.password_confirmation;
          return errors;
        }
      }
      if (!errorMsg) {
        delete errors[name];
        return errors;
      } else {
        return { ...errors, [name]: errorMsg };
      }
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let res = await createUser(form);
    if (res.status === 200) {
      const { accessToken } = await handleLogin({
        username: form.username,
        password: form.password,
      });

      if (accessToken) {
        localStorage.setItem('token', accessToken);
        await authenticate();
        return navigate('/odinbook');
      }
    }

    res = await res.json();
    if (res.errors) {
      const { errors: err } = res;
      setErrors(
        // Generate an object with keys being each input "name"
        // and the error message as the value.
        err.reduce((obj, e) => {
          obj[e.param] = e.msg;
          return obj;
        }, {}),
      );

      return;
    }
  };

  return (
    <div className="signup">
      <h1 className="logo--large">odinbook</h1>
      <form className="signup__form" onSubmit={onSubmit}>
        <legend>Sign up</legend>
        <fieldset className="signup__fullName">
          <div>
            <input
              name="first_name"
              type="text"
              placeholder="First name"
              value={form.first_name}
              onChange={onChange}
            />
            <input
              name="last_name"
              type="text"
              placeholder="Last name"
              value={form.last_name}
              onChange={onChange}
            />
          </div>
          <div>
            {errors.first_name && (
              <p className="signup__error">{errors.first_name}</p>
            )}
            {errors.last_name && (
              <p className="signup__error">{errors.last_name}</p>
            )}
          </div>
        </fieldset>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={onChange}
          maxLength={20}
        />
        {errors.username && <p className="signup__error">{errors.username}</p>}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        {errors.password && <p className="signup__error">{errors.password}</p>}
        <input
          name="password_confirmation"
          type="password"
          placeholder="Confirm password"
          value={form.password_confirmation}
          onChange={onChange}
        />
        {errors.password_confirmation && (
          <p className="signup__error">{errors.password_confirmation}</p>
        )}
        <fieldset className="signup__birthdate">
          <label htmlFor="birthdate">Date of birth</label>
          <DatePicker
            id="birthdate"
            name="date_of_birth"
            selected={startDate}
            onChange={(date, e) => {
              setStartDate(date);
              onChange(e, date);
            }}
          />
        </fieldset>
        {errors.date_of_birth && (
          <p className="signup__error">{errors.date_of_birth}</p>
        )}
        <fieldset className="signup__location">
          <div>
            <input
              name="city"
              type="text"
              placeholder="City (optional)"
              value={form.city}
              onChange={onChange}
            />
            {errors.city && <p className="signup__error">{errors.city}</p>}
            <input
              name="country"
              type="text"
              placeholder="Country"
              value={form.country}
              onChange={onChange}
            />
          </div>
          {errors.country && (
            <p className="signup__error" style={{ textAlign: 'right' }}>
              {errors.country}
            </p>
          )}
        </fieldset>

        <button type="submit" className="signup__submitBtn" onSubmit={onSubmit}>
          Sign up
        </button>

        <Link to="../login">
          Already have an account? <b>Log in.</b>
        </Link>
      </form>
    </div>
  );
}
