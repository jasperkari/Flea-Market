import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';
import Card from '../components/Card';

function Order() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    fetchWithTimeout('http://localhost:3003/orders', {}, 10000)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="Orders">
      <TopNav />
      <div className="Content">
        <h2>Items Bought:</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products.map((product) => (
            <Card
              key={product.id}
              image={product.image}
              username={product.username}
              name={product.name}
              price={product.price}
              description={product.description}
              showBuyButton={false}
              showRemoveButton={false}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Order;
