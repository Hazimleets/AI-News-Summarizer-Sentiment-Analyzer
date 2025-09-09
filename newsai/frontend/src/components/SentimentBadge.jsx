//frontend/src/components/SentimentBadge.jsx

function SentimentBadge({ sentiment }) {
  let color = "bg-gray-400";
  if (sentiment === "Positive") color = "bg-green-500";
  if (sentiment === "Negative") color = "bg-red-500";

  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-xs font-medium ${color}`}
    >
      {sentiment}
    </span>
  );
}

export default SentimentBadge;