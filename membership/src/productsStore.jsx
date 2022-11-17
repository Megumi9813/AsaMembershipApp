const productsArray = [
  {
    id: process.env.REACT_APP_STRIPE_PRODUCT_ID_COFFEE,
    title: "Coffee",
    price: 4.99,
  },
  {
    id: process.env.REACT_APP_STRIPE_PRODUCT_ID_SUNGLASSES,
    title: "Sunglasses",
    price: 9.99,
  },
  {
    id: process.env.REACT_APP_STRIPE_PRODUCT_ID_CAMERA,
    title: "Camera",
    price: 39.99,
  },
];

function getProductData(id) {
  let productData = productsArray.find((product) => product.id === id);

  if (productData === undefined) {
    console.log("Product data does not exist for ID: " + id);
    return undefined;
  }

  return productData;
}

export { productsArray, getProductData };
