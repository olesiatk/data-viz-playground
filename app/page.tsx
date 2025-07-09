"use client";
import { useState } from "react";
import ChartD3 from "@/components/charts/ChartD3";
import ChartCJS from "@/components/charts/ChartCJS";
import ChartVisx from "@/components/charts/ChartVisx";
import DataEditor from "@/components/DataEditor";
import { mockData as initial } from "@/data/mockData";

export default function Home() {
  const [data, setData] = useState(initial);

  return (
    <main className="container p-6">
      <h1 className="text-4xl pb-4 font-sans font-bold capitalize italic text-blue-900">Viz Playground</h1>

      {/* Editable mock data */}
      <div className="flex flex-col items-center space-y-6 w-full h-full">
        <section className="p-4 mx-0 border rounded-xl shadow-sm max-w-md bg-blue-100">
          <h2 className="text-xl font-semibold mb-2">Edit mock data</h2>
          <DataEditor data={data} onChange={setData} />
        </section>

        <section className="flex flex-wrap justify-center gap-8">
          <div className="p-4 border rounded-xl shadow-sm max-w-full bg-green-100">
            <h2 className="text-xl font-semibold mb-2">D3 Bar Chart</h2>
            <ChartD3 data={data} />
          </div>

          <div className="p-4 border rounded-xl shadow-sm max-w-full bg-green-100">
            <h2 className="text-xl font-semibold mb-2">Chart.js Line</h2>
            <ChartCJS data={data} />
          </div>

          <div className="p-4 border rounded-xl shadow-sm md:col-span-2 max-w-full bg-green-100">
            <h2 className="text-xl font-semibold mb-2">Visx Area</h2>
            <ChartVisx data={data} />
          </div>
        </section>
      </div>
    </main>
  );
}
