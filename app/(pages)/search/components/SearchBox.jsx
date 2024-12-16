"use client";

import { useState } from "react";

export default function SearchBox({ onSearch, query, setQuery, fetchSuggestions }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim().length > 0) {
      const fetchedSuggestions = await fetchSuggestions(newQuery);
      setSuggestions(fetchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (searchTerm) => {
    onSearch(searchTerm || query, null, null, null); // Add required params
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-lg px-4 py-2"
        placeholder="Search products..."
      />
      <button onClick={() => handleSearch()} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Search
      </button>
      {suggestions.length > 0 && (
        <ul className="border border-gray-300 rounded-lg bg-white shadow-md">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSearch(suggestion)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
