"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Datum } from "@/data/mockData";

interface Props {
  data: Datum[];
  width?: number;
  height?: number;
}

export default function ChartD3({ data, width = 300, height = 300 }: Props) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const x = d3
      .scaleBand<Datum["category"]>()
      .domain(data.map((d) => d.category))
      .range([0, innerW])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .nice()
      .range([innerH, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x));

    g.append("g").call(d3.axisLeft(y));

    // Bars
    g.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.category)!)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => innerH - y(d.value))
      .attr("fill", "steelblue")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "orange");
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.category}</strong>: ${d.value}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "steelblue");
        tooltip.style("opacity", 0);
      });

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr(
        "class",
        "pointer-events-none fixed bg-gray-800 text-white text-xs rounded px-2 py-1"
      )
      .style("opacity", 0);

    return () => {
      tooltip.remove();
    };
  }, [data, height, width]);

  return <svg ref={ref} width={width} height={height} />;
}