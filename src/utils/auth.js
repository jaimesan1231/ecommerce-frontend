import {
  EmailAuthProvider,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, usersCollection } from "../db/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const loginUser = async (email, password, onError) => {
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
    onError();

    return null;
  }
};

export const registerUser = async (data, onError, onSuccess) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;
    await setDoc(doc(usersCollection, user.uid), {
      name: data.name,
      lastname: data.lastname,
    });
    onSuccess();
  } catch (error) {
    onError();
  }
};
export const getUserData = async (userId) => {
  try {
    const userRef = doc(usersCollection, userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData;
    } else {
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
  } catch (error) {
    console.log("Error al cerrar sesion:", error);
  }
};

export const reauthenticate = async (email, password) => {
  const credential = EmailAuthProvider.credential(email, password);
  const user = auth.currentUser;
  await reauthenticateWithCredential(user, credential);
};
