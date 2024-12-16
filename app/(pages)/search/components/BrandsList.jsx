import { getFirestore, collection, getDocs } from "firebase/firestore";

export async function getBrands() {
  const db = getFirestore();
  const brandsRef = collection(db, "brands");
  const querySnapshot = await getDocs(brandsRef);

  // Map brand details
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
