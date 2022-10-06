import React from 'react';
import './ReviewItem.css';
import { MdDeleteForever } from 'react-icons/md';

const ReviewItem = ({ product }) => {
  console.log(product);
  const { name, price, quantity, img } = product;

  return (
    <div className="review-item">
      <img src={img} alt="" />
      <div className="review-details-container">
        <div className="review-details">
          <h5>{name}</h5>
          <p>
            <small>Price: {price}</small>
          </p>
          <p>
            <small> Quantity: {quantity}</small>
          </p>
        </div>
        <div className="delete-button">
          <MdDeleteForever size={40} className="delete-icon" />
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
