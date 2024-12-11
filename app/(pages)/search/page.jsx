"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/lib/firestore/categories/getCategories";
import getProducts from "@/lib/firestore/products/getProducts";
import getSuggestions from "@/lib/firestore/products/getSuggestions";
import { ProductCard } from "@/app/components/Products";
import SearchBox from "@/app/(pages)/search/components/SearchBox";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("low-to-high");
  const [loading, setLoading] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch initial products when no category or query is selected
  useEffect(() => {
    if (!selectedCategory && !query) {
      const fetchInitialProducts = async () => {
        setLoading(true);
        try {
          const defaultProducts = await getProducts(null, null, sortOrder);
          setProducts(defaultProducts);
        } catch (error) {
          console.error("Error fetching initial products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchInitialProducts();
    }
  }, [selectedCategory, query, sortOrder]);

  const handleSearch = async (query, category, sortOrder) => {
    setLoading(true);
    try {
      const fetchedProducts = await getProducts(query, category, sortOrder || "low-to-high");
      setSearchResults(fetchedProducts);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    setLoading(true);
    try {
      setSelectedCategory(categoryId);
      const fetchedProducts = await getProducts(null, categoryId, sortOrder);
      setProducts(fetchedProducts);
      setQuery("");
    } catch (error) {
      console.error("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearCategorySelection = async () => {
    setLoading(true);
    try {
      setSelectedCategory(null);
      const fetchedProducts = await getProducts(query, null, sortOrder);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error clearing category selection:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (order) => {
    setLoading(true);
    try {
      setSortOrder(order);
      const fetchedProducts = await getProducts(query, selectedCategory, order);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error changing sort order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row">
      <aside className="w-1/4 p-5 border-r border-gray-200">
        <h2 className="text-center font-semibold text-xl mb-5">Categories</h2>
        <div className="flex flex-col gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-4 py-2 rounded-lg border text-left ${
                selectedCategory === category.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="mt-5">
          <h3 className="text-center font-semibold text-lg mb-4">Sort by Price</h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleSortChange("low-to-high")}
              className={`px-4 py-2 rounded-lg ${
                sortOrder === "low-to-high" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Low to High
            </button>
            <button
              onClick={() => handleSortChange("high-to-low")}
              className={`px-4 py-2 rounded-lg ${
                sortOrder === "high-to-low" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              High to Low
            </button>
          </div>
        </div>
        {selectedCategory && (
          <button
            onClick={clearCategorySelection}
            className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Clear Category Selection
          </button>
        )}
      </aside>
      <main className="flex-1 p-5">
        <h1 className="text-center font-semibold text-2xl mb-5">Product Search</h1>
        <SearchBox
          onSearch={handleSearch}
          query={query}
          setQuery={setQuery}
          categories={categories}
          fetchSuggestions={getSuggestions}
        />
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            {selectedCategory && (
              <>
                <h2 className="text-center font-semibold text-xl mt-5">
                  Products in Selected Category
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <ProductCard product={product} key={product.id} />
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No products found in this category.
                    </p>
                  )}
                </div>
              </>
            )}
            {!selectedCategory && searchResults.length > 0 && (
              <>
                <h2 className="text-center font-semibold text-xl mt-5">Search Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {searchResults.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
