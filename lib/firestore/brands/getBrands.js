import { db } from "@/lib/firebase";  // Assuming Firebase is initialized here
import { collection, getDocs } from "firebase/firestore";

export const getBrands = async () => {
  const brandsRef = collection(db, "brands");  // Assuming "brands" is your Firestore collection
  const snapshot = await getDocs(brandsRef);
  const brands = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return brands;
};
