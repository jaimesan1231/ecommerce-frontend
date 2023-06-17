import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, usersCollection } from "../db/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const loginUser = async (email, password) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log("Login error: ", error);
    return null;
  }
};

export const getUserData = async (userId) => {
  try {
    console.log(userId);
    const userRef = doc(usersCollection, userId);
    const userDoc = await getDoc(userRef);
    console.log(userDoc);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData;
    } else {
      console.log("Usuario no encontrado");
      return null;
    }
  } catch (error) {
    console.log("Error al loguear:", error);
    return null;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("Cierre de sesion exitoso");
  } catch (error) {
    console.log("Error al cerrar sesion:", error);
  }
};
