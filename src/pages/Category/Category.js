import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Category.css";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import { getDocs, query, where } from "firebase/firestore";
import { productsCollection } from "../../db/firebase";
// import { getProductByCategory } from "../../utils/api";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    setProducts([]);

    const getProductByCategory = async () => {
      setIsLoading(true);
      try {
        const q = query(productsCollection, where("category", "==", category));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setIsLoading(false);
        setProducts(data);
      } catch (error) {
        setIsLoading(false);
        console.log("Error al diltrar los productos: ", error);
      }
    };
    getProductByCategory();
    // .then((products) => {
    //   console.log(products);
    //   setIsLoading(false);
    //   setProducts(products);
    // })
    // .catch((error) => console.log(error));
  }, [category]);
  return (
    <div className="category">
      <h2 className="category__title">{category}</h2>
      <ProductsGrid data={products} isLoading={isLoading} />
    </div>
  );
};

export default Category;
