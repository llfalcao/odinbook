import { Link, Navigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import { createUser } from '../api/users';

export default function SignUp({ authenticate, status, token }) {
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
    date.setFullYear(date.getFullYear() - 13);
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

  function onChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    let res = await createUser(form);
    res = await res.json();

    if (res.errors) {
      const { errors: err } = res;
      setErrors(
        err.reduce((obj, e) => {
          obj[e.param] = e.msg;
          return obj;
        }, {}),
      );

      return;
    }
  }

  return (
    <div className="signup">
      <h1 className="logo--large">odinbook</h1>
      <form className="signup__form" onSubmit={onSubmit}>
        <legend>Sign up</legend>
        <fieldset className="signup__fullName">
          <input
            name="first_name"
            type="text"
            placeholder="First name"
            value={form.first_name}
            onChange={onChange}
          />
          {errors.first_name && <p>{errors.first_name}</p>}
          <input
            name="last_name"
            type="text"
            placeholder="Last name"
            value={form.last_name}
            onChange={onChange}
          />
          {errors.last_name && <p>{errors.last_name}</p>}
        </fieldset>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={onChange}
        />
        {errors.username && <p>{errors.username}</p>}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        {errors.password && <p>{errors.password}</p>}
        <input
          name="password_confirmation"
          type="password"
          placeholder="Confirm password"
          value={form.password_confirmation}
          onChange={onChange}
        />
        {errors.password_confirmation && <p>{errors.password_confirmation}</p>}
        <fieldset className="signup__birthdate">
          <label htmlFor="birthdate">Date of birth</label>
          <DatePicker
            id="birthdate"
            name="date_of_birth"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setForm({ ...form, date_of_birth: date });
            }}
          />
        </fieldset>
        {errors.date_of_birth && <p>{errors.date_of_birth}</p>}
        <fieldset className="signup__location">
          <input
            name="city"
            type="text"
            placeholder="City (optional)"
            value={form.city}
            onChange={onChange}
          />
          {errors.city && <p>{errors.city}</p>}
          <input
            name="country"
            type="text"
            placeholder="Country"
            value={form.country}
            onChange={onChange}
          />
          {errors.country && <p>{errors.country}</p>}
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
