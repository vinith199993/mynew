import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export default async function getSuggestions(input) {
  if (!input.trim()) return [];
  const db = getFirestore();
  const productsRef = collection(db, "products");

  // Query Firestore to match keywords that start with the input
  const q = query(
    productsRef,
    where("keywords", "array-contains", input.toLowerCase())
  );

  const querySnapshot = await getDocs(q);

  // Map titles of matching products
  const suggestions = querySnapshot.docs.map((doc) => doc.data().title);
  return suggestions;
}
