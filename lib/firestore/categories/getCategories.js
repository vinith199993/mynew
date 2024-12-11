import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const getCategories = async () => {
  try {
    const categoriesRef = collection(db, "categories");
    const querySnapshot = await getDocs(categoriesRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return [];
  }
};
