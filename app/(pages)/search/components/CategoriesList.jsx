// Components/CategoriesList.jsx
import { getCategories } from "@/lib/firestore/categories/getCategories";

export default async function CategoriesList({
  selectedCategory,
  onCategoryClick,
  onClearSelection,
}) {
  const categories = await getCategories();

  return (
    <div className="flex flex-wrap gap-4 md:flex-row md:overflow-x-scroll">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryClick(category.id)}
          className={`w-full px-4 py-2 text-left rounded-lg border ${
            selectedCategory === category.id
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {category.name}
        </button>
      ))}
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
