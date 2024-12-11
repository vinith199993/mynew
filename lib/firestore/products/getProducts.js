import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export default async function getProducts(title, categoryId) {
  const db = getFirestore();
  const productsRef = collection(db, "products");
  const conditions = [];

  // Filter by title
  if (title) {
    conditions.push(where("title", "==", title));
  }

  // Filter by category
  if (categoryId) {
    conditions.push(where("categoryId", "==", categoryId));
  }

  const q = query(productsRef, ...conditions);
  const querySnapshot = await getDocs(q);

  // Map product details
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return products;
}
