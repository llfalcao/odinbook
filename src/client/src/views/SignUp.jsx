import { Link, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

export default function SignUp({ authenticate, status, token }) {
  const [startDate, setStartDate] = useState(new Date());

  const currentToken = localStorage.getItem('token');
  if (currentToken && currentToken === token) {
    return <Navigate to="/odinbook" />;
  }

  return (
    <div className="signup">
      <Header />
      <form className="signup__form">
        <legend>Sign up</legend>

        <input name="first_name" type="text" placeholder="First name" />
        <input name="last_name" type="text" placeholder="Last name" />
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

        <input name="city" type="text" placeholder="City (optional)" />
        <input name="country" type="text" placeholder="Country" />

        <button type="submit">Sign up</button>

        <Link to="../login">Already have an account? Log in here.</Link>
      </form>
    </div>
  );
}
