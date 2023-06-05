import React, { useState } from 'react';

function printStuff(username, password) {
  // eslint-disable-next-line no-console
  console.log(username);
  // eslint-disable-next-line no-console
  console.log(password);
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="login">
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={() => printStuff(username, password)}>
        login
      </button>
      <button type="button">sign up</button>
    </div>
  );
}

export default Login;
