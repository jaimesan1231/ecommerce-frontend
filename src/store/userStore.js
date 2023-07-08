import { create } from "zustand";
import { updateUser } from "../utils/user";
import useCartStore from "./cartStore";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useUserStore = create((set, get) => ({
  user: null,
  setUser: (user) =>
    set(() => ({
      user,
    })),
  addAddress: (address) => {
    const state = get();
    const newAddresses = state.user.addresses
      ? [
          ...state.user.addresses,
          {
            ...address,
            id: state.user.addresses.length + 1,
          },
        ]
      : [
          {
            ...address,
            id: 1,
          },
        ];
    updateUser(state.user.id, { addresses: newAddresses });
    set(() => ({
      user: {
        ...state.user,
        addresses: newAddresses,
      },
    }));
  },
  editAddress: (newAddress) => {
    const state = get();

    const newAddresses = state.user.addresses.map((address) => {
      if (address.id === newAddress.id) {
        return newAddress;
      }
      return address;
    });
    updateUser(state.user.id, { addresses: newAddresses });
    set(() => ({
      user: {
        ...state.user,
        addresses: newAddresses,
      },
    }));
  },
  deleteAddress: (addressId) => {
    const state = get();
    const newAddresses = state.user.addresses.filter(
      (address) => address.id !== addressId
    );
    updateUser(state.user.id, { addresses: newAddresses });
    set(() => ({
      user: {
        ...state.user,
        addresses: newAddresses,
      },
    }));
  },
  addOrder: (address, card) => {
    const cart = useCartStore.getState().cart;
    const resetCart = useCartStore.getState().resetCart;
    const state = get();
    const getCurrentDate = () => {
      const options = { month: "long", day: "numeric", year: "numeric" };
      const currentDate = new Date();
      return currentDate.toLocaleDateString("en-US", options);
    };
    const generateOrderNumber = () => {
      const randomPart = Math.floor(Math.random() * 10000); // Genera un número aleatorio de 0 a 9999
      const timestampPart = Date.now(); // Obtiene el timestamp actual en milisegundos
      const orderNumber = `${timestampPart}-${randomPart}`; // Combina el timestamp y el número aleatorio
      return orderNumber;
    };
    const getLastDigits = (card) => {
      return card.slice(-4);
    };
    const orders = state.user.orders
      ? [
          ...state.user.orders,
          {
            id: generateOrderNumber(),
            items: cart.items,
            subTotal: cart.subTotal,
            date: getCurrentDate(),
            address: address,
            card: getLastDigits(card),
          },
        ]
      : [
          {
            id: generateOrderNumber(),
            items: cart.items,
            subTotal: cart.subTotal,
            date: getCurrentDate(),
            address: address,
            card: getLastDigits(card),
          },
        ];

    updateUser(state.user.id, { orders: orders });
    resetCart();
    set(() => ({
      user: {
        ...state.user,
        orders: orders,
      },
    }));
  },
  editUser: (data) => {
    const state = get();
    updateUser(state.user.id, { ...data });
    set(() => ({
      user: {
        ...state.user,
        ...data,
      },
    }));
  },
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useUserStore);
}
export default useUserStore;
