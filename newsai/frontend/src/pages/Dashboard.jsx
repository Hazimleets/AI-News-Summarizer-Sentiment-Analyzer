//frontend/src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState({ sentiment: [], trend: [], wordcloud: null });

  useEffect(() => {
    async function fetchAnalytics() {
      const res = await axios.get("/api/analytics/sentiment");
      setData(res.data);
    }
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <h2 className="text-4xl font-extrabold text-white mb-8 drop-shadow-md">
        Analytics Dashboard
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30">
          <h3 className="font-semibold mb-4 text-lg text-white">Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.sentiment}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.sentiment.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.name === "Positive"
                        ? "#22c55e"
                        : entry.name === "Negative"
                        ? "#ef4444"
                        : "#9ca3af"
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Line */}
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30">
          <h3 className="font-semibold mb-4 text-lg text-white">7-Day Sentiment Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Word Cloud */}
      {data.wordcloud && (
        <div className="mt-10 bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30">
          <h3 className="font-semibold mb-4 text-lg text-white">Word Cloud</h3>
          <img
            src={data.wordcloud}
            alt="wordcloud"
            className="mx-auto rounded-xl shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
