import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchBox({ onSearch, query, setQuery, categories, fetchSuggestions }) {
  const [category, setCategory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query) {
      const fetch = async () => {
        const fetchedSuggestions = await fetchSuggestions(query);
        setSuggestions(fetchedSuggestions);
        setShowSuggestions(true);
      };
      fetch();
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, category, "");
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion); // Update the search input
    onSearch(suggestion, category, ""); // Trigger a product search with the clicked suggestion
    setShowSuggestions(false); // Hide the suggestions dropdown
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 w-full justify-center items-center"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Product Name ..."
          type="text"
          className="border px-5 py-2 rounded-xl bg-white focus:outline-none w-full md:w-auto"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-5 py-2 rounded-xl bg-white focus:outline-none w-full md:w-auto"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <Button type="submit">
          <Search size={16} />
          Search
        </Button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded-md shadow-lg mt-2 w-full max-h-48 overflow-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
