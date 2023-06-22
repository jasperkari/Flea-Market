import '../styles/Card.css';
import React from 'react';
import PropTypes from 'prop-types';

function Card({
  image,
  name,
  username,
  price,
  description,
  onAddToCart,
  isInCart,
}) {
  return (
    <div className="card">
      <img src={image} alt={name} style={{ width: '100%' }} />
      <div className="container">
        <h4>
          <b>{name}</b>
        </h4>
        <p>{username}</p>
        <p>{price}€</p>
        <div>
          <p>{description}</p>
          {isInCart ? (
            <p>In Cart</p>
          ) : (
            <button type="button" onClick={onAddToCart}>
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  image: '/default-image.png',
};

Card.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isInCart: PropTypes.bool.isRequired,
};

export default Card;
