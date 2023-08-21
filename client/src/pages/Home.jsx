/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import '../styles/App.css';
import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';
import Card from '../components/Card';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const admin = localStorage.getItem('admin') === 'true';
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  function fetchWithTimeout(url, options, timeout = 5000) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout),
      ),
    ]);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchWithTimeout('http://localhost:3002/products', {}, 10000)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      if (!prevCart.some((item) => item.id === product.id)) {
        // return [...prevCart, product];
        const { image, ...productWithoutImage } = product;
        return [...prevCart, productWithoutImage];
      }
      return prevCart;
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const filteredProducts = products.filter((product) => {
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (minPrice && product.price < minPrice) {
      return false;
    }

    if (maxPrice && product.price > maxPrice) {
      return false;
    }

    return true;
  });

  const onRemoveProduct = (product) => {
    const data = {
      id: product.id,
    };

    fetch('http://localhost:3002/userproducts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <div className="App">
      <TopNav cart={cart} onRemoveFromCart={removeFromCart} />
      <div className="Content">
        <h1>Welcome to our Online Flea Market!!</h1>
        <p>
          Here you can find a variety of items for sale from different vendors.
        </p>
        <div className="search-filter">
          <div>
            <label htmlFor="search">Search:</label>
            <input
              className="search-input"
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="min-price">Min price:</label>
            <input
              className="search-input"
              type="number"
              id="min-price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="max-price">Max price:</label>
            <input
              className="search-input"
              type="number"
              id="max-price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <h2>Items for Sale:</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              image={product.image}
              username={product.username}
              name={product.name}
              price={product.price}
              description={product.description}
              onAddToCart={() => addToCart(product)}
              isInCart={cart.some((item) => item.id === product.id)}
              showBuyButton={!admin && product.username !== username}
              showRemoveButton={admin || product.username === username}
              onRemoveProduct={() => onRemoveProduct(product)}
              error={error}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
