import { getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { productsCollection } from "../db/firebase";

export const fetchPopularProducts = async (limitNumber) => {
  try {
    const q = query(
      productsCollection,
      orderBy("rating.count", "desc"),
      limit(limitNumber)
    );
    const querySnapshot = await getDocs(q);
    const popularProducts = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return popularProducts;
  } catch (error) {
    console.log("Error al obtener los productos:", error);
  }
};

export const searchProductByName = async (searchTerm) => {
  try {
    const q = query(
      productsCollection,
      where("title", "==", searchTerm),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    const searchResult = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    console.log(searchResult);
    return searchResult;
  } catch (error) {
    console.log("Error al obtener los productos:", error);
  }
};
