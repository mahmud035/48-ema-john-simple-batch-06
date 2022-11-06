import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import {
  addToDb,
  deleteShoppingCart,
  getStoredCart,
} from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

/* 
//* Needed:

count(Total Data): loaded from server
perPageItem: 10 (assumed)
numberOfPages: (count / perPageItem)
currentPage: 

*/

const Shop = () => {
  const { count, products } = useLoaderData();
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageItem, setPerPageItem] = useState(10);

  const numberOfPages = Math.ceil(count / perPageItem);

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];

    for (const id in storedCart) {
      const addedProduct = products.find((product) => product._id === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }

    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find((product) => product._id === selectedProduct._id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }

    setCart(newCart);
    addToDb(selectedProduct._id);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product, index) => (
          <Product
            key={index}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>

      <div className="cart-container">
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link to="/orders">
            <button className="btn-review-order">Review Order</button>
          </Link>
        </Cart>
      </div>

      <div className="pagination">
        <p>Currently selected page: {currentPage}</p>

        {[...Array(numberOfPages).keys()].map((index, pageNumber) => (
          <button
            key={index}
            onClick={() => setCurrentPage(pageNumber)}
            className={currentPage === pageNumber && 'selected '}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Shop;
