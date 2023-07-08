import React, { useEffect, useState } from "react";
import bannerImg from "../../images/homeBanner2.png";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import { fetchPopularProducts } from "../../utils/api";
import "./Home.css";

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
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home">
      <div className="banner">
        <div className="banner__text">
          <h1 className="banner__title">Welcome to Multimart</h1>
          <p className="banner__subtitle">
            Discover our amazing deals and high-quality products
          </p>
        </div>
        <img
          src={bannerImg}
          alt="variety of products "
          className="banner__image"
        />
      </div>
      <h2 className="home__title">Weekly Popular Products</h2>
      <ProductsGrid data={products} isLoading={isLoading} />
    </div>
  );
};

export default Home;
