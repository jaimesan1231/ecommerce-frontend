import { create } from "zustand";
import { updateUser } from "../utils/user";

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
    console.log(newAddresses);
    updateUser(state.user.id, { addresses: newAddresses });
    set(() => ({
      user: {
        ...state.user,
        addresses: newAddresses,
      },
    }));
  },
}));

export default useUserStore;
