import '../styles/TopNav.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Cart from './Cart';

function TopNav({ cart, onRemoveFromCart }) {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCart = () => {
    setIsCartVisible((prevIsCartVisible) => !prevIsCartVisible);
  };

  useEffect(() => {}, [isCartVisible]);

  return (
    <div className="topnav">
      <a href="/">Home</a>
      <a href="/contact">Contact</a>
      <a href="/about">About</a>
      <a href="/create">Create</a>
      <button className="cart" type="button" onClick={toggleCart}>
        Shopping Cart
      </button>
      {isCartVisible && (
        <div className="cart-dropdown">
          <Cart cart={cart} onRemoveFromCart={onRemoveFromCart} />
        </div>
      )}
      <Login />
    </div>
  );
}

TopNav.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default TopNav;
