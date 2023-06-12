import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Register from './Register';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  function handleLogin() {
    axios
      .post(
        'http://localhost:3001/login',
        {
          username,
          password,
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
        localStorage.setItem('expTime', response.data.expTime);
        setIsLoggedIn(true);
        setLoginFailed(false);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        setLoginFailed(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expTime');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expTime = localStorage.getItem('expTime');
    setUsername(localStorage.getItem('username'));
    if (token && expTime && Date.now() < expTime * 1000) {
      setIsLoggedIn(true);
    } else {
      handleLogout();
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div />;
  }

  return (
    <div className="login">
      {!isLoggedIn ? (
        <>
          <div style={{ display: 'flex' }}>
            {loginFailed && (
              <p style={{ marginRight: '10px' }}>
                Incorrect username or password
              </p>
            )}
            <div>
              <input
                className="login-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="login-button"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="login-button"
                type="button"
                onClick={() => setShowRegister(true)}
              >
                Sign up
              </button>
            </div>
          </div>
          {showRegister && (
            <Register
              onClose={() => setShowRegister(false)}
              initialUsername={username}
              initialPassword={password}
            />
          )}
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>Welcome, {username}!</p>
          <button className="login-button" type="button" onClick={handleLogout}>
            logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
