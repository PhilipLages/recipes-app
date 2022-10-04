import React, { useContext, useState } from 'react';
import PropTypes, { func } from 'prop-types';
import RecipesContext from '../Context';
import '../styles/login.css';

export default function Login({ history: { push } }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const { setEmail } = useContext(RecipesContext);

  const handleChange = (({ target: { name, value } }) => {
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  });

  const checkEmail = () => {
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const checkInputEmail = emailRegex.test(login.email);
    return checkInputEmail;
  };

  const checkPassword = () => {
    const numberMin = 7;
    const checkInputPassword = login.password.length >= numberMin;
    return checkInputPassword;
  };

  const isValid = checkEmail() && checkPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail({ email: login.email });
    push('/meals');
  };

  return (
    <div className="login-container">
      <h1>
        Recip
        <span>Easy</span>
      </h1>
      <form className="login-form" onSubmit={ handleSubmit }>
        <label className="form-label" htmlFor="email">
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            value={ login.email }
            onChange={ handleChange }
            placeholder="Email"
            data-testid="email-input"
          />
        </label>
        <label className="form-label" htmlFor="password">
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={ login.password }
            onChange={ handleChange }
            placeholder="Password"
            data-testid="password-input"
          />
        </label>
        <button
          className="btn"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !isValid }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: func,
  }),
}.isRequired;
