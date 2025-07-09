"use client";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Datum } from "@/data/mockData";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface Props {
  data: Datum[];
  width?: number;
  height?: number;
}

export default function ChartCJS({ data, width = 300, height = 300 }: Props) {
  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        label: "Value",
        data: data.map((d) => d.value),
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return <Line data={chartData} width={width} height={height} />;
}