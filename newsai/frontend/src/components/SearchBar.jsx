// frontend/src/components/SearchBar.jsx

import { useState } from "react";
import { Search } from "lucide-react"; // modern icon

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={submit}
      className="flex items-center w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-white/20 bg-white/20 backdrop-blur-lg"
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news by keyword..."
        className="flex-1 px-5 py-3 text-lg bg-transparent text-white placeholder-gray-300 focus:outline-none"
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-6 py-3 bg-accent text-black font-semibold hover:bg-yellow-400 transition"
      >
        <Search size={18} />
        Search
      </button>
    </form>
  );
}

export default SearchBar;

