// frontend/src/components/ArticleCard.jsx
import SentimentBadge from "./SentimentBadge";

function ArticleCard({ headline, source, url, summary, sentiment }) {
  return (
    <div className="p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-transform bg-white/80 backdrop-blur-md border border-gray-100">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-2xl font-semibold text-indigo-700 hover:underline"
      >
        {headline}
      </a>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-gray-500 italic">{source}</span>
        <SentimentBadge sentiment={sentiment} />
      </div>
      <p className="mt-4 text-base text-gray-700">{summary}</p>
    </div>
  );
}

export default ArticleCard;
