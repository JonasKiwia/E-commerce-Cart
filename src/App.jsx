import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  const products = [
    { id: 1, name: 'T-Shirt', price: 20 },
    { id: 2, name: 'Jeans', price: 40 },
    { id: 3, name: 'Sneakers', price: 60 },
    { id: 4, name: 'Hat', price: 15 },
    { id: 5, name: 'Socks', price: 5 },
  ];

  const [cart, setCart] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Simple E-Commerce Cart</h1>
      </header>
      <ProductList
        products={products}
        addToCart={addToCart}
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
    </div>
  );
};

export default App;
