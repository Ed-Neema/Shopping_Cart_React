// Coffee: price_1MgySdKi4ZLh3cdghOFpnRGA
// Sunglasses: price_1MgyU0Ki4ZLh3cdgS13wvovw
// Camera: price_1MgyUiKi4ZLh3cdg2jwIE7rF

const productsArray = [
  {
    id: "price_1MgySdKi4ZLh3cdghOFpnRGA",
    title: "Coffee",
    price: 4.99,
  },
  {
    id: "price_1MgyU0Ki4ZLh3cdgS13wvovw",
    title: "Sunglasses",
    price: 9.99,
  },
  {
    id: "price_1MgyUiKi4ZLh3cdg2jwIE7rF",
    title: "Camera",
    price: 39.99,
  },
];

function getProductData(id) {
  let productData = productsArray.find((product) => product.id === id);

  if (productData === undefined) {
    console.log("Product data doesn't exist with ID: " + id);
    return undefined;
  }
  return productData;
}
export { productsArray, getProductData };
