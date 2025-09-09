//frontend/src/pages/Results.jsx

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";

function Results() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post("http://localhost:4000/api/news/search", { keyword });
        setArticles(res.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (keyword) fetchData();
  }, [keyword]);

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">
        Showing results for <span className="text-yellow-300">"{keyword}"</span>
      </h2>
      {loading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((a) => (
            <ArticleCard key={a.url} {...a} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;
