import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Category.css";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import { getDocs, query, where } from "firebase/firestore";
import { productsCollection } from "../../db/firebase";
import Dropdown from "../../components/Dropdown/Dropdown";
// import { getProductByCategory } from "../../utils/api";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();
  const [order, setOrder] = useState("");
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
        console.log("Error al filtrar los productos: ", error);
      }
    };
    getProductByCategory();
  }, [category]);
  useEffect(() => {
    if (order === "") {
      return;
    }
    if (order === "priceAsc") {
      const sortedProducts = [...products];
      sortedProducts.sort((a, b) => {
        return a.price - b.price;
      });
      setProducts(sortedProducts);
    } else if (order === "priceDesc") {
      const sortedProducts = [...products];
      sortedProducts.sort((a, b) => {
        return b.price - a.price;
      });
      setProducts(sortedProducts);
    }
  }, [order]);
  return (
    <div className="category">
      <h2 className="category__title">{category}</h2>
      <div className="sort-section">
        <div className="sort-section__dropdown">
          <Dropdown
            title={"Sort by"}
            items={[
              {
                value: "priceAsc",
                text: "Price: Low to High",
              },
              {
                value: "priceDesc",
                text: "Price: High to Low",
              },
              {
                value: "customer",
                text: "Customer Review",
              },
            ]}
            onSelect={(order) => setOrder(order)}
          />
        </div>
      </div>
      <ProductsGrid data={products} isLoading={isLoading} />
    </div>
  );
};

export default Category;
