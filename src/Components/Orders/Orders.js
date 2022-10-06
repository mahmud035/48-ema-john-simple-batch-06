import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';

const Orders = () => {
  //* { products: products, initialCart: initialCart }
  const { products, initialCart } = useLoaderData();
  const [cart, setCart] = useState(initialCart);

  return (
    <div className="shop-container">
      <div className="orders-container">
        {cart.map((product, index) => (
          <ReviewItem key={index} product={product}></ReviewItem>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Orders;
