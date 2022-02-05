import { Link, Navigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';

export default function SignUp({ authenticate, status, token }) {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const input = document.querySelector('input');
    if (input) input.focus();
  }, []);

  const currentToken = localStorage.getItem('token');
  if (currentToken && currentToken === token) {
    return <Navigate to="/odinbook" />;
  }

  return (
    <div className="signup">
      <h1 className="logo--large">odinbook</h1>
      <form className="signup__form">
        <legend>Sign up</legend>

        <fieldset className="signup__fullName">
          <input name="first_name" type="text" placeholder="First name" />
          <input name="last_name" type="text" placeholder="Last name" />
        </fieldset>
        <input name="username" type="text" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <input name="password" type="password" placeholder="Confirm password" />
        <fieldset className="signup__birthdate">
          <label htmlFor="birthdate">Date of birth</label>
          <DatePicker
            id="birthdate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </fieldset>

        <fieldset className="signup__location">
          <input name="city" type="text" placeholder="City (optional)" />
          <input name="country" type="text" placeholder="Country" />
        </fieldset>

        <button type="submit" className="signup__submitBtn">
          Sign up
        </button>

        <Link to="../login">
          Already have an account? <b>Log in.</b>
        </Link>
      </form>
    </div>
  );
}
