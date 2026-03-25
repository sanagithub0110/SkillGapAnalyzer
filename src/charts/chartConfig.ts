import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Pie, Bar, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const PIE_OPTIONS = {
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        color: "#94a3b8",
        font: { family: "Inter", size: 12 },
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#fff",
      bodyColor: "#94a3b8",
      borderColor: "rgba(255,255,255,0.1)",
      borderWidth: 1,
      padding: 12,
      displayColors: true,
    },
  },
  maintainAspectRatio: false,
};

export const BAR_OPTIONS = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#0f172a",
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#64748b" },
    },
    y: {
      grid: { color: "rgba(255,255,255,0.05)" },
      ticks: { color: "#64748b" },
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};

export const RADAR_OPTIONS = {
  plugins: {
    legend: { display: false },
  },
  scales: {
    r: {
      grid: { color: "rgba(255,255,255,0.1)" },
      angleLines: { color: "rgba(255,255,255,0.1)" },
      pointLabels: { color: "#94a3b8", font: { size: 10 } },
      ticks: { display: false },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
  maintainAspectRatio: false,
};
