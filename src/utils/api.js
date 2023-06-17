export const getProduct = (id) => {
  return fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
    res.json()
  );
};

export const getProductByCategory = (category) => {
  return fetch(`https://fakestoreapi.com/products/category/${category}`).then(
    (res) => res.json()
  );
};

export const getCategories = () => {
  return fetch(`https://fakestoreapi.com/products/categories`).then((res) =>
    res.json()
  );
};

export const getProducts = () => {
  return fetch("https://fakestoreapi.com/products").then((res) => res.json());
};
