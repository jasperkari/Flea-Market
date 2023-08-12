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
  showBuyButton,
  showRemoveButton,
  onRemoveProduct,
  error,
}) {
  const uint8Array = new Uint8Array(image.data);
  const blob = new Blob([uint8Array], { type: 'image/png' });
  const imageUrl = URL.createObjectURL(blob);

  return (
    <div className="card">
      <img src={imageUrl} alt={name} style={{ width: '100%' }} />
      <div className="container">
        <h4>
          <b>{name}</b>
        </h4>
        <p>{username}</p>
        <p>{price}€</p>
        <div>
          <p>{description}</p>
          {showBuyButton &&
            (isInCart ? (
              <p>In Cart</p>
            ) : (
              <button type="button" onClick={onAddToCart}>
                Buy
              </button>
            ))}
          {showRemoveButton && (
            <button type="button" onClick={onRemoveProduct}>
              Remove
            </button>
          )}
          {error && <p>There was an error removing the product.</p>}
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  error: false,
  onRemoveProduct: null,
  showRemoveButton: false,
  showBuyButton: false,
  onAddToCart: null,
};

Card.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  ]).isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func,
  isInCart: PropTypes.bool.isRequired,
  showBuyButton: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
  onRemoveProduct: PropTypes.func,
  error: PropTypes.bool,
};

export default Card;
