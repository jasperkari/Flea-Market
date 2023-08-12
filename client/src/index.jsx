import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/Index.css';
import App from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Create from './pages/Create';
import Order from './pages/Order';
import Listing from './pages/Listing';
import Checkout from './pages/Checkout';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create" element={<Create />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/listings" element={<Listing />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
