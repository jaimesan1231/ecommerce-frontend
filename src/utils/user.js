import { doc, updateDoc } from "firebase/firestore";
import { usersCollection } from "../db/firebase";

export const updateCart = async (userId, data) => {
  try {
    const userRef = doc(usersCollection, userId);
    await updateDoc(userRef, data);
  } catch (error) {
    console.log("Error al actualizar carrito", error);
  }
};
