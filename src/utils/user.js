import { doc, updateDoc } from "firebase/firestore";
import { usersCollection } from "../db/firebase";
import { auth } from "../db/firebase";
import { updateEmail, updatePassword } from "firebase/auth";
import { reauthenticate } from "./auth";

export const updateCart = async (userId, data) => {
  try {
    const userRef = doc(usersCollection, userId);
    await updateDoc(userRef, data);
  } catch (error) {
    console.log("Error al actualizar carrito", error);
  }
};

export const updateUser = async (userId, data) => {
  try {
    const userRef = doc(usersCollection, userId);
    await updateDoc(userRef, data);
  } catch (error) {
    console.log("Error al actualizar user", error);
  }
};

export const changeEmail = async (
  currentEmail,
  newEmail,
  password,
  onError,
  onSuccess
) => {
  try {
    await reauthenticate(currentEmail, password);
    await updateEmail(auth.currentUser, newEmail);
    onSuccess();
  } catch (error) {
    onError("email", "Email already in use");

    if (error.code === "auth/wrong-password") {
      onError("email", "Your password is incorrect, please try again");
    } else {
      onError("email", "Email already in use");
    }
  }
};

export const changePassword = async (
  email,
  password,
  newPassword,
  onError,
  onSuccess
) => {
  try {
    await reauthenticate(email, password);
    await updatePassword(auth.currentUser, newPassword);
    onSuccess();
  } catch (error) {
    onError("password", "Your password is incorrect, please try again");
  }
};
