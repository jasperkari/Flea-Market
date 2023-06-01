import '../styles/App.css';
import React from 'react';
import TopNav from './TopNav';
import Card from './Card';

function App() {
  return (
    <div className="App">
      <TopNav />
      <h1>Welcome to our Online Flea Market!</h1>
      <p>
        Here you can find a variety of items for sale from different vendors.
      </p>
      <h2>Items for Sale:</h2>
      <Card
        image="item1.jpg"
        name="Item 1"
        price="$10"
        description="Description of Item 1"
      />
      <Card
        image="item2.jpg"
        name="Item 2"
        price="$20"
        description="Description of Item 2"
      />
      <Card
        image="item3.jpg"
        name="Item 3"
        price="$30"
        description="Description of Item 3"
      />
    </div>
  );
}

export default App;
