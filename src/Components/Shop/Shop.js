import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageItem, setPerPageItem] = useState(10);

  const numberOfPages = Math.ceil(count / perPageItem);

  useEffect(() => {
    const url = `http://localhost:5000/products?currentPage=${currentPage}&perPageItem=${perPageItem}`;

    console.log(currentPage, perPageItem);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCount(data?.count);
        setProducts(data?.products);
      });
  }, [currentPage, perPageItem]);

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
        <p>
          Currently selected page: {currentPage} and per Page Item:
          {perPageItem}
        </p>

        {[...Array(numberOfPages).keys()].map((index, pageNumber) => (
          <button
            key={index}
            onClick={() => setCurrentPage(pageNumber)}
            className={currentPage === pageNumber ? 'selected' : undefined}
          >
            {pageNumber}
          </button>
        ))}

        <select onChange={(e) => setPerPageItem(e.target.value)}>
          <option value="5">5</option>
          <option value="10" selected>
            10
          </option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </div>
    </div>
  );
};

export default Shop;
