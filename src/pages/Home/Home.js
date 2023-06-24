import React, { useEffect, useState } from "react";
import bannerImg from "../../images/homeBanner2.png";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";

import "./Home.css";
import { getDocs, limit, orderBy, query } from "firebase/firestore";
import { productsCollection } from "../../db/firebase";
import { fetchPopularProducts } from "../../utils/api";

const Home = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPopularProducts = async () => {
      setIsLoading(true);
      const popularProducts = await fetchPopularProducts(20);
      setIsLoading(false);
      setProducts(popularProducts);
    };
    getPopularProducts();
    // const fetchPpopularProducts = async () => {
    //   setIsLoading(true);
    //   try {
    //     const q = query(
    //       productsCollection,
    //       orderBy("rating.count", "desc"),
    //       limit(20)
    //     );
    //     const querySnapshot = await getDocs(q);
    //     const popularProducts = querySnapshot.docs.map((doc) => {
    //       return {
    //         ...doc.data(),
    //         id: doc.id,
    //       };
    //     });
    //     setIsLoading(false);
    //     console.log(popularProducts);
    //     setProducts(popularProducts);
    //   } catch (error) {
    //     setIsLoading(false);
    //     console.log("Error al obtener los productos:", error);
    //   }
    // };
    // fetchPpopularProducts();
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
