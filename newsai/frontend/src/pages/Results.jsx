// frontend/src/pages/Results.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Results() {
  const location = useLocation();
  const { keyword, results } = location.state || { keyword: "", results: [] };
  const [articles, setArticles] = useState(results);

  // Fallback: if results empty (page reload), fetch again
  useEffect(() => {
    const fetchAgain = async () => {
      if (articles.length === 0 && keyword) {
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
          setArticles(data.results || []);
        } catch (err) {
          console.error("Retry fetch failed:", err);
        }
      }
    };
    fetchAgain();
  }, [keyword]);

  const sentimentColors = {
    Positive: "bg-green-100 text-green-700",
    Negative: "bg-red-100 text-red-700",
    Neutral: "bg-gray-200 text-gray-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500 py-10 px-6">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">
        Showing results for{" "}
        <span className="bg-yellow-300 text-black px-2 py-1 rounded">
          {keyword}
        </span>
      </h2>

      {articles.length === 0 ? (
        <p className="text-center text-white/90">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-black mb-2">
                {article.headline}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Source: {article.source}
              </p>
              <p className="text-sm text-gray-800 mb-4">{article.summary}</p>
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${sentimentColors[article.sentiment]}`}
              >
                {article.sentiment}
              </span>
              <div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 font-medium hover:underline"
                >
                  Read full article →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;
