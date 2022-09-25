import React from 'react';
import './Cart.css';

const Cart = ({ cart }) => {
  let total = 0;
  let shipping = 0;
  for (const product of cart) {
    total = total + product.price;
    shipping = shipping + product.shipping;
  }

  const tax = parseFloat(total * 0.1);
  const grandTotal = total + shipping + tax;

  return (
    <div className="cart">
      <h3>Order Summary</h3>
      <p>Selected Items: {cart.length}</p>
      <p>Total Price: ${total}</p>
      <p>Total Shipping Charge: ${shipping}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <p>
        <strong>Grand Total: ${grandTotal.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Cart;
