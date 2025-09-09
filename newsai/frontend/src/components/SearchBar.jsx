// frontend/src/components/SearchBar.jsx

import { useState } from "react";
import { Search } from "lucide-react"; // install lucide-react if not already

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-xl mx-auto bg-white/20 backdrop-blur-lg border border-white/30 rounded-full px-4 py-2 shadow-lg"
    >
      <Search className="text-white w-6 h-6 mr-3" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder=" Search latest news..."
        className="flex-1 bg-transparent text-white placeholder-gray-200 focus:outline-none text-lg"
      />
      <button
        type="submit"
        className="ml-3 px-6 py-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform"
      >
        Get News
      </button>
    </form>
  );
}

export default SearchBar;
