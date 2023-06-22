import '../styles/Cart.css';
import React from 'react';
import PropTypes from 'prop-types';

function Cart({ cart, onRemoveFromCart }) {
  const handleRemoveFromCart = (product) => {
    onRemoveFromCart(product);
  };

  return (
    <div>
      <h3>Shopping Cart</h3>
      {cart.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <button type="button" onClick={() => handleRemoveFromCart(product)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button">Checkout</button>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default Cart;
