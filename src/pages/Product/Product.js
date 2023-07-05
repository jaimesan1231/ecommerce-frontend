import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import addIcon from "../../images/add.svg";
import minusIcon from "../../images/minus.svg";
import delivery from "../../images/delivery-truck.svg";
import returnDelivery from "../../images/return-delivery.svg";
import "./Product.css";
import Rating from "../../components/Rating/Rating";
import { AppContext } from "../../context/AppContext";
import { doc, getDoc } from "firebase/firestore";
import { productsCollection } from "../../db/firebase";
import useCartStore from "../../store/cartStore";

const Product = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const productRef = doc(productsCollection, productId);
        const docSnap = await getDoc(productRef);
        if (docSnap.exists()) {
          setCurrentProduct({
            ...docSnap.data(),
            id: productId,
          });
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log("Error al obtener el producto: ", error);
      }
    };
    getProduct();
  }, [productId]);
  const increaseQuantity = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddButton = () => {
    console.log(currentProduct);
    addToCart(currentProduct, quantity);
  };
  return (
    <>
      {currentProduct && (
        <div className="product">
          <div className="product__image-container">
            <img src={currentProduct.image} alt="" className="product__image" />
          </div>
          <div className="product__info">
            <h2 className="product__title">{currentProduct.title}</h2>
            <p className="product__description">{currentProduct.description}</p>
            <Rating rating={currentProduct.rating} />
            <p className="product__price">$ {currentProduct.price}</p>
            <div className="product__counter-section">
              <div className="counter">
                <button className="counter__button" onClick={decreaseQuantity}>
                  <img src={minusIcon} alt="" />
                </button>
                {quantity}
                <button className="counter__button" onClick={increaseQuantity}>
                  <img src={addIcon} alt="" />
                </button>
              </div>
              <span> Only 20 items left</span>
            </div>
            <button className="product__button" onClick={handleAddButton}>
              Add to Cart
            </button>
            <div className="product__delivery">
              <img src={delivery} alt="" />
              <span>Free Delivery</span>
              <img src={returnDelivery} alt="" />
              <span>Free 30 days Delivery Returns</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
