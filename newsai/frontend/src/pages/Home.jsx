import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Waves from "../components/Waves";

function Home() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    try {
      const res = await fetch("http://localhost:4000/api/news/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ keyword }),
      });

      const data = await res.json();
      navigate("/results", { state: { keyword, results: data.results || [] } });
    } catch (err) {
      console.error("Search failed:", err);
      navigate("/results", { state: { keyword, results: [] } });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-500 to-red-500 overflow-hidden">
      {/* Card content (higher at top) */}
      <div className="pt-24 relative z-10 flex justify-center">
        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl max-w-2xl w-full border border-white/20">
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
            NewsAI
          </h1>
          <p className="text-lg mb-8 text-white/90">
            Get{" "}
            <span className="text-yellow-300 font-semibold">AI-powered</span>{" "}
            summaries and sentiment insights from the latest news.
          </p>

          {/* Search form */}
          <form
            onSubmit={handleSearch}
            className="flex w-full rounded-2xl overflow-hidden shadow-lg border border-white/30 bg-white/20 backdrop-blur-lg"
          >
            <input
              type="text"
              placeholder="Search latest news..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 px-5 py-4 text-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="px-8 py-4 font-semibold text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:opacity-90 transition-all"
            >
              Get News
            </button>
          </form>
        </div>
      </div>

      {/* Waves pinned to bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <Waves />
      </div>
    </div>
  );
}

export default Home;
