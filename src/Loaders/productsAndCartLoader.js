import { getStoredCart } from '../utilities/fakedb';

export const productsAndCartLoader = async () => {
  //* get Products
  const productsData = await fetch('products.json');
  const products = await productsData.json();
  // console.log(products);

  //* get cart
  const savedCart = getStoredCart();
  const previousCart = [];
  // console.log('savedCart', savedCart);
  for (const id in savedCart) {
    const addedProduct = products.find((product) => product.id === id);

    if (addedProduct) {
      const quantity = savedCart[id];
      // console.log(id, quantity);
      addedProduct.quantity = quantity;
      previousCart.push(addedProduct);
      console.log(previousCart);
    }
  }

  return { products, previousCart };
};
