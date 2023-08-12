import '../styles/Cart.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Cart({ cart, onRemoveFromCart }) {
  const navigate = useNavigate();

  const handleRemoveFromCart = (product) => {
    onRemoveFromCart(product);
  };

  const onCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <h3 className="text">Shopping Cart</h3>
      {cart.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <button type="button" onClick={() => handleRemoveFromCart(product)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="button" onClick={onCheckout}>
        Checkout
      </button>
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
