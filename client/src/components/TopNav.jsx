import React from 'react';
import Login from './Login';

function TopNav() {
  return (
    <div className="topnav">
      <a href="/">Home</a>
      <a href="/contact">Contact</a>
      <a href="/about">About</a>
      <Login />
    </div>
  );
}

export default TopNav;
