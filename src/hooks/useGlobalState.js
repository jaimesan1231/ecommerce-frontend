import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../db/firebase";
import { getUserData } from "../utils/auth";
import { updateCart } from "../utils/user";

const useGlobalState = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({
    items: [],
    subTotal: 0,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserData(user.uid);
        if (userData) {
          let savedCart = {
            items: [],
            subTotal: 0,
          };
          if (localStorage.getItem("cart")) {
            savedCart = JSON.parse(localStorage.getItem("cart"));
          } else {
            console.log("no hay nada en el local");
          }

          const {
            name,
            lastname,
            cart = {
              items: [],
              subTotal: 0,
            },
          } = userData;
          console.log(cart);
          console.log(name, lastname);
          const mergedItems = [...cart.items, ...savedCart.items].reduce(
            (acc, item) => {
              const foundItem = acc.find((i) => i.id == item.id);
              if (foundItem) {
                foundItem.quantity += item.quantity;
                foundItem.price += item.price;
              } else {
                acc.push(item);
              }
              return acc;
            },
            []
          );
          const newCart = {
            cart: {
              items: [...mergedItems],
              subTotal: cart.subTotal + savedCart.subTotal,
            },
          };
          updateCart(user.uid, newCart);
          localStorage.removeItem("cart");
          setUser({ ...userData, id: user.uid });
          setCart(newCart.cart);
        }
        console.log("user is logged in", user);
      } else {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
          setCart(savedCart);
        } else {
          setCart({
            items: [],
            subTotal: 0,
          });
        }
        setUser(null);
        console.log("user is logged out");
      }
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  useEffect(() => {
    if (cart.items.length === 0) {
      return;
    }
    const subTotal =
      Math.round(
        cart.items.reduce((a, b) => {
          return a + b.price;
        }, 0) * 100
      ) / 100;
    const newCart = {
      ...cart,
      subTotal,
    };

    if (!user) {
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      updateCart(user.id, { cart: newCart });
    }

    setCart(newCart);
  }, [cart.items, user]);

  const addToCart = (product, quantity = 1) => {
    const existingProduct = cart.items.find(
      (itemCart) => itemCart.id === product.id
    );
    if (existingProduct) {
      const price = product.price * quantity;
      const newCart = [...cart.items];
      const updatedCart = newCart.map((item) => {
        if (item.id === existingProduct.id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
            price: item.price + price,
          };
        }
        return item;
      });
      setCart({
        ...cart,
        items: [...updatedCart],
      });
    } else {
      const price = product.price * quantity;
      const newProduct = {
        ...product,
        quantity: quantity,
        price: price,
      };
      setCart({
        ...cart,
        items: [...cart.items, newProduct],
      });
    }
  };
  const removeFromCart = (id) => {
    setCart({
      ...cart,
      items: cart.items.filter((product) => product.id !== id),
    });
  };
  return {
    user,
    cart,
    addToCart,
    removeFromCart,
  };
};

export default useGlobalState;
