import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export default async function getProducts(title, categoryId, sortOrder = "low-to-high", brandId = null) {
  const productsRef = collection(db, "products");
  let productsQuery = query(productsRef);

  // Filter by title (search query)
  if (title) {
    productsQuery = query(productsQuery, where("title", "==", title));
  }

  // Filter by category ID
  if (categoryId) {
    productsQuery = query(productsQuery, where("categoryId", "==", categoryId));
  }

  // Filter by brand ID
  if (brandId) {
    productsQuery = query(productsQuery, where("brandId", "==", brandId));
  }

  // Sort by price
  if (sortOrder === "low-to-high") {
    productsQuery = query(productsQuery, orderBy("price", "asc"));
  } else if (sortOrder === "high-to-low") {
    productsQuery = query(productsQuery, orderBy("price", "desc"));
  }

  try {
    const querySnapshot = await getDocs(productsQuery);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}