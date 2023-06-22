/* eslint-disable jsx-a11y/control-has-associated-label */
import '../styles/Register.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function Register({ onClose, initialUsername = '', initialPassword = '' }) {
  Register.propTypes = {
    onClose: PropTypes.func.isRequired,
    initialUsername: PropTypes.string,
    initialPassword: PropTypes.string,
  };

  Register.defaultProps = {
    initialPassword: '',
    initialUsername: '',
  };

  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(initialPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        'http://localhost:3001/register',
        {
          username,
          password,
          email,
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(() => {
        window.location.reload();
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {});
  };

  return (
    <div className="Register">
      <button
        className="Register-overlay"
        onClick={onClose}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            onClose();
          }
        }}
        type="button"
      />
      <div className="Register-content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username-input">
            Username:
            <input
              id="username-input"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <br />
          <label htmlFor="email-input">
            Email:
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <br />
          <label htmlFor="password-input">
            Password:
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Register;
