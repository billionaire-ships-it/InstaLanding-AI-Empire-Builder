"use client";

import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Visitors",
      data: [12, 19, 3, 5, 2, 3, 9],
      backgroundColor: "#4f46e5",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Weekly Traffic",
    },
  },
};

export default function AnalyticsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Business Analytics</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
