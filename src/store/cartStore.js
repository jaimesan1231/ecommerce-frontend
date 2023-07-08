import { create } from "zustand";
import useUserStore from "./userStore";
import { updateCart } from "../utils/user";

const useCartStore = create((set, get) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || {
    items: [],
    subTotal: 0,
  },
  addToCart: (product, quantity = 1) => {
    const user = useUserStore.getState().user;
    const state = get();

    const existingProduct = state.cart.items.find(
      (itemCart) => itemCart.id === product.id
    );

    if (existingProduct) {
      const price = product.price * quantity;
      const newCartItems = [...state.cart.items];
      const updatedCartItems = newCartItems.map((item) => {
        if (item.id === existingProduct.id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
            price: item.price + price,
          };
        }
        return item;
      });
      const newCart = {
        items: [...updatedCartItems],
        subTotal: state.cart.subTotal + price,
      };

      if (!user) {
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        updateCart(user.id, { cart: newCart });
      }
      set(() => ({
        cart: newCart,
      }));
    } else {
      const price = product.price * quantity;
      const newProduct = {
        ...product,
        quantity: quantity,
        price: price,
      };
      const newCart = {
        items: [...state.cart.items, newProduct],
        subTotal: state.cart.subTotal + price,
      };
      if (!user) {
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        updateCart(user.id, { cart: newCart });
      }
      set(() => ({
        cart: newCart,
      }));
    }
  },
  removeFromCart: (productId) => {
    const user = useUserStore.getState().user;
    const state = get();

    const foundProduct = state.cart.items.find((item) => item.id === productId);

    const newCart = {
      items: [
        ...state.cart.items.filter((product) => product.id !== productId),
      ],
      subTotal: state.cart.subTotal - foundProduct.price,
    };
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      updateCart(user.id, { cart: newCart });
    }
    set(() => ({
      cart: newCart,
    }));
  },
  setCart: (cart) =>
    set(() => ({
      cart,
    })),
  resetCart: () => {
    const user = useUserStore.getState().user;
    if (!user) {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          items: [],
          subTotal: 0,
        })
      );
    } else {
      updateCart(user.id, {
        cart: {
          items: [],
          subTotal: 0,
        },
      });
    }
    set(() => ({
      cart: {
        items: [],
        subTotal: 0,
      },
    }));
  },
}));

export default useCartStore;
