/* eslint-disable jsx-a11y/label-has-associated-control */
import '../styles/Checkout.css';
import React, { useState } from 'react';
import TopNav from '../components/TopNav';

function CheckoutForm() {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [requestStatus, setRequestStatus] = useState(null);
  const storedCart = localStorage.getItem('cart');
  const cart = storedCart ? JSON.parse(storedCart) : [];
  const token = localStorage.getItem('token');

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (fData) => {
    const newCart = cart.map((item) => {
      const { image, ...rest } = item;
      return rest;
    });

    const data = {
      fData,
      cart: newCart,
    };

    fetch('http://localhost:3003/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setRequestStatus('success');
        } else {
          setRequestStatus('error');
        }
      })
      .catch(() => {
        setRequestStatus('error');
      });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Name is required';
    } else if (!/\w+\s+\w+/.test(formData.fullName)) {
      errors.fullName = 'Please enter your first and last name';
    }
    if (!formData.email.includes('@')) {
      errors.email = 'Invalid email address';
    }
    if (!/^\d+$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number';
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleFormSubmit(formData);
    }
  };

  return (
    <div>
      <TopNav cart={cart} showCart={false} />
      <h3 className="shopping-cart-title">Shopping Cart</h3>
      <ul className="cart-list">
        {cart.map((product) => (
          <li key={product.id}>
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-price">{product.price}€</span>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        {formErrors.fullName && <p>{formErrors.fullName}</p>}
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <p>{formErrors.email}</p>}
        <br />
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {formErrors.phone && <p>{formErrors.phone}</p>}
        <br />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
        {requestStatus === 'success' && <div>Success!</div>}
        {requestStatus === 'error' && <div>Error!</div>}
      </form>
    </div>
  );
}

export default CheckoutForm;
