// app/dashboard/analytics/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Page Views",
      data: [120, 190, 300, 250, 220, 310, 400],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      fill: true,
    },
    {
      label: "Clicks",
      data: [80, 100, 150, 200, 180, 240, 300],
      borderColor: "#10b981",
      backgroundColor: "rgba(16, 185, 129, 0.5)",
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Landing Page Performance (Weekly)",
    },
  },
};

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="bg-white rounded-2xl p-4 shadow">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
