

// CategoriesList.jsx (Server Component for fetching categories)
import { getCategories } from "@/lib/firestore/categories/getCategories";

export default async function CategoriesList({ selectedCategory, onCategoryClick, onClearSelection }) {
  const categories = await getCategories(); // Fetch categories on the server

  return (
    <div>
      <h2 className="text-center font-semibold text-xl mb-5">Categories</h2>
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
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
      {selectedCategory && (
        <button
          onClick={onClearSelection}
          className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Clear Category Selection
        </button>
      )}
    </div>
  );
}
