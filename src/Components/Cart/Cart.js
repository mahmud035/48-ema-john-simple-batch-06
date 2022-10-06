import React from 'react';
import './Cart.css';

const Cart = ({ cart, handleClearCart, children }) => {
  // console.log('cart', cart);
  let total = 0;
  let shipping = 0;
  let quantity = 0;
  for (const product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping;
  }

  const tax = parseFloat(total * 0.1);
  const grandTotal = total + shipping + tax;

  return (
    <div className="cart">
      <h3>Order Summary</h3>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${total}</p>
      <p>Total Shipping Charge: ${shipping}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <p>
        <strong>Grand Total: ${grandTotal.toFixed(2)}</strong>
      </p>
      <button onClick={handleClearCart} className="btn-clear-cart">
        Clear Cart
      </button>
      {children}
    </div>
  );
};

export default Cart;
