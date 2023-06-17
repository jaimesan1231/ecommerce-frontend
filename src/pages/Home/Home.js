import React, { useEffect, useState } from "react";
import bannerImg from "../../images/homeBanner2.png";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";

import "./Home.css";
import { getProducts } from "../../utils/api";
import { getDocs, limit, orderBy, query } from "firebase/firestore";
import { productsCollection } from "../../db/firebase";

const Home = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPpopularProducts = async () => {
      setIsLoading(true);
      try {
        const q = query(
          productsCollection,
          orderBy("rating.count", "desc"),
          limit(20)
        );
        const querySnapshot = await getDocs(q);
        const popularProducts = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setIsLoading(false);
        console.log(popularProducts);
        setProducts(popularProducts);
      } catch (error) {
        setIsLoading(false);
        console.log("Error al obtener los productos:", error);
      }
    };
    fetchPpopularProducts();
    // setIsLoading(true);
    // getProducts()
    //   .then((data) => {
    //     setIsLoading(false);
    //     setProducts(data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home">
      <div className="banner">
        <div className="banner__text">
          <h1 className="banner__title">Welcome to Ecommerce</h1>
          <p className="banner__subtitle">
            Discover our amazing deals and high-quality products
          </p>
        </div>
        <img src={bannerImg} alt="" className="banner__image" />
      </div>
      <h2 className="home__title">Weekly Popular Products</h2>
      <ProductsGrid data={products} isLoading={isLoading} />
    </div>
  );
};

export default Home;
