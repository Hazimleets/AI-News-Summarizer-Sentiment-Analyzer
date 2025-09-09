// frontend/src/pages/Home.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function Home() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/results?keyword=${encodeURIComponent(query)}`);
  };

  return (
    <section className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-3xl w-full p-10 rounded-3xl backdrop-blur-xl bg-white/20 shadow-2xl text-center border border-white/30">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-md">NewsAI</h1>
        <p className="mt-4 text-xl text-gray-100">
          Get <span className="font-bold text-yellow-300">AI-powered</span> summaries and
          sentiment insights from the latest news.
        </p>
        <div className="mt-10">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}

export default Home;
