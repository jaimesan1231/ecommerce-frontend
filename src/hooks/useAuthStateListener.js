import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/firebase";
import { useEffect } from "react";
import { getUserData } from "../utils/auth";
import { updateCart } from "../utils/user";
import useUserStore from "../store/userStore";
import useCartStore from "../store/cartStore";

const useAuthStateListener = () => {
  // const setUser = useUserStore((state) => state.setUser);
  const setCart = useCartStore((state) => state.setCart);
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserData(user.uid);
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
        if (userData) {
          const savedCart = JSON.parse(localStorage.getItem("cart")) || {
            items: [],
            subTotal: 0,
          };
          const {
            cart = {
              items: [],
              subTotal: 0,
            },
          } = userData;

          const mergedItems = [...cart.items, ...savedCart.items].reduce(
            (acc, item) => {
              const foundItem = acc.find((i) => i.id === item.id);
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
          setUser({ ...userData, id: user.uid, email: user.email });
          setCart(newCart.cart);
        }
      } else {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || {
          items: [],
          subTotal: 0,
        };
        localStorage.removeItem("token");
        setUser(null);
        setCart(savedCart);
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default useAuthStateListener;
