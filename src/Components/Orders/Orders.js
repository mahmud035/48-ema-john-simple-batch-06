import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';

const Orders = () => {
  //* { products: products, initialCart: initialCart }
  const { initialCart } = useLoaderData();
  const [cart, setCart] = useState(initialCart);

  const handleRemoveItem = (id) => {
    console.log(id);
    const remaining = cart.filter((product) => product.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div className="orders-container">
        {cart.map((product, index) => (
          <ReviewItem
            key={index}
            product={product}
            handleRemoveItem={handleRemoveItem}
          ></ReviewItem>
        ))}

        {cart.length === 0 && (
          <h1>
            No Items For Review. Please <Link to="/">Shop Now</Link>
          </h1>
        )}
      </div>
      <div className="cart-container">
        <Cart cart={cart} handleClearCart={handleClearCart}></Cart>
      </div>
    </div>
  );
};

export default Orders;
