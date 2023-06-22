import '../styles/App.css';
import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';
import Card from '../components/Card';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      if (!prevCart.some((item) => item.id === product.id)) {
        return [...prevCart, product];
      }
      return prevCart;
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  return (
    <div className="App">
      <TopNav cart={cart} onRemoveFromCart={removeFromCart} />
      <div className="Content">
        <h1>Welcome to our Online Flea Market!!</h1>
        <p>
          Here you can find a variety of items for sale from different vendors.
        </p>
        <h2>Items for Sale:</h2>
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            username={product.username}
            name={product.name}
            price={product.price}
            description={product.description}
            onAddToCart={() => addToCart(product)}
            isInCart={cart.some((item) => item.id === product.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
