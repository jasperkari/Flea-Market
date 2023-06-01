import React from 'react';
import PropTypes from 'prop-types';

function Card({ image, name, price, description }) {
  return (
    <div className="card">
      <img src={image} alt={name} style={{ width: '100%' }} />
      <div className="container">
        <h4>
          <b>{name}</b>
        </h4>
        <p>{price}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
