import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await api.get("/tasks/stats");
    setStats(res.data);
  };

  if (!stats) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-10 text-slate-500">
          Loading dashboard...
        </div>
      </>
    );
  }

  /* ======================
     CHART CONFIG
  ====================== */
  const chartData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        data: [
          stats.priorityBreakdown.Low || 0,
          stats.priorityBreakdown.Medium || 0,
          stats.priorityBreakdown.High || 0,
        ],
        backgroundColor: [
          "#22c55e", // green
          "#f59e0b", // amber
          "#ef4444", // red
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: "65%",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 16,
          color: "#475569",
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            A quick overview of your productivity
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur border rounded-2xl p-6">
            <p className="text-sm text-slate-500">Total Tasks</p>
            <h3 className="mt-2 text-3xl font-bold">
              {stats.total}
            </h3>
          </div>

          <div className="bg-white/80 backdrop-blur border rounded-2xl p-6">
            <p className="text-sm text-slate-500">Completed</p>
            <h3 className="mt-2 text-3xl font-bold text-green-600">
              {stats.completed}
            </h3>
          </div>

          <div className="bg-white/80 backdrop-blur border rounded-2xl p-6">
            <p className="text-sm text-slate-500">Pending</p>
            <h3 className="mt-2 text-3xl font-bold text-amber-600">
              {stats.pending}
            </h3>
          </div>

          <div className="bg-white/80 backdrop-blur border rounded-2xl p-6">
            <p className="text-sm text-slate-500">
              Completion Rate
            </p>
            <h3 className="mt-2 text-3xl font-bold text-indigo-600">
              {stats.completionRate}%
            </h3>
          </div>
        </div>

        {/* CHART SECTION */}
        <div className="bg-white/80 backdrop-blur border rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">
            Tasks by Priority
          </h3>

          <div className="h-72">
            <Doughnut
              data={chartData}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </>
  );
}
