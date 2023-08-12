import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';

function About() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <TopNav cart={cart} onRemoveFromCart={removeFromCart} />
      <div>
        Email: email.address@mail.com <br /> Phone: 8472398574
      </div>
    </div>
  );
}

export default About;
