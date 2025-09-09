// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ReactWordcloud from "react-wordcloud";

function Dashboard() {
  const [sentimentData, setSentimentData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [keywords, setKeywords] = useState([]);

  // Mock data
  useEffect(() => {
    setSentimentData([
      { name: "Positive", value: 40 },
      { name: "Negative", value: 25 },
      { name: "Neutral", value: 35 },
    ]);

    setTrendData([
      { date: "2025-09-04", positive: 5, negative: 2, neutral: 3 },
      { date: "2025-09-05", positive: 7, negative: 1, neutral: 2 },
      { date: "2025-09-06", positive: 6, negative: 4, neutral: 2 },
    ]);

    setKeywords([
      { text: "AI", value: 30 },
      { text: "Politics", value: 20 },
      { text: "Economy", value: 15 },
    ]);
  }, []);

  const COLORS = ["#4ade80", "#f87171", "#60a5fa"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500 p-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-white drop-shadow-lg">
        📊 Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Sentiment Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Sentiment Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Word Cloud */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Keyword Cloud
          </h2>
          <div className="h-[300px] flex items-center justify-center">
            {keywords.length > 0 ? (
              <ReactWordcloud
                words={keywords}
                options={{
                  rotations: 2,
                  rotationAngles: [0, 90],
                  fontSizes: [15, 40],
                  colors: ["#facc15", "#f87171", "#4ade80", "#60a5fa"],
                }}
              />
            ) : (
              <p className="text-gray-500">No keywords available</p>
            )}
          </div>
        </div>

        {/* Trend Line */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Sentiment Trend (7 days)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#374151" />
              <YAxis stroke="#374151" />
              <Tooltip />
              <Line type="monotone" dataKey="positive" stroke="#4ade80" strokeWidth={2} />
              <Line type="monotone" dataKey="negative" stroke="#f87171" strokeWidth={2} />
              <Line type="monotone" dataKey="neutral" stroke="#60a5fa" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
