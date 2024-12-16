"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/lib/firestore/categories/getCategories";
import { getBrands } from "@/lib/firestore/brands/getBrands";
import getProducts from "@/lib/firestore/products/getProducts";
import getSuggestions from "@/lib/firestore/products/getSuggestions";
import { ProductCard } from "@/app/components/Products";
import SearchBox from "@/app/(pages)/search/components/SearchBox";

export default function SearchPage() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("low-to-high");
  const [loading, setLoading] = useState(false);

  // Fetch categories
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

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const fetchedBrands = await getBrands();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  // Fetch products based on current filters
  useEffect(() => {
    const fetchProducts = async () => {
      if (!query && !selectedCategory) {
        setLoading(true);
        try {
          const defaultProducts = await getProducts(null, null, sortOrder, selectedBrand);
          setProducts(defaultProducts);
          setSearchResults([]);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProducts();
  }, [selectedCategory, query, sortOrder, selectedBrand]);

  const handleSearch = async (searchQuery, category, order, brand) => {
    setLoading(true);
    try {
      const fetchedProducts = await getProducts(searchQuery, category, order, brand);
      setSearchResults(fetchedProducts);
      setProducts([]);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    setLoading(true);
    try {
      setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
      const fetchedProducts = await getProducts(query, categoryId || null, sortOrder, selectedBrand);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandClick = async (brandId) => {
    setLoading(true);
    try {
      setSelectedBrand(selectedBrand === brandId ? null : brandId);
      const fetchedProducts = await getProducts(query, selectedCategory, sortOrder, brandId || null);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products by brand:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (order) => {
    setLoading(true);
    try {
      setSortOrder(order);
      const fetchedProducts = await getProducts(query, selectedCategory, order, selectedBrand);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error sorting products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-r from-white via-gray-50 to-gray-100 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 p-5 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50 shadow-md rounded-lg text-gray-700 font-medium">
        <h2 className="text-center font-semibold text-xl mb-5 text-blue-600">Categories</h2>
        <div className="flex flex-col gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-4 py-2 rounded-lg border text-left transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-blue-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <h3 className="text-center font-semibold text-lg mt-6 mb-4 text-blue-600">Brands</h3>
        <div className="flex flex-col gap-4">
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => handleBrandClick(brand.id)}
              className={`px-4 py-2 rounded-lg border text-left transition-all duration-200 ${
                selectedBrand === brand.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-blue-100"
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>
        <h3 className="text-center font-semibold text-lg mt-6 mb-4 text-blue-600">Sort by Price</h3>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleSortChange("low-to-high")}
            className={`px-4 py-2 rounded-lg ${
              sortOrder === "low-to-high" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-100"
            }`}
          >
            Low to High
          </button>
          <button
            onClick={() => handleSortChange("high-to-low")}
            className={`px-4 py-2 rounded-lg ${
              sortOrder === "high-to-low" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-100"
            }`}
          >
            High to Low
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <h1 className="text-center font-semibold text-2xl mb-5 text-blue-600">Product Search</h1>
        <SearchBox
          onSearch={handleSearch}
          query={query}
          setQuery={setQuery}
          fetchSuggestions={getSuggestions}
        />
        {loading ? (
          <p className="text-center text-gray-500 mt-6">Loading...</p>
        ) : (
          <div>
            {products.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            )}
            {searchResults.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {searchResults.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
