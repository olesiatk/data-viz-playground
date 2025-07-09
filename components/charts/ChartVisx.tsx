"use client";
import { Group } from "@visx/group";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AreaClosed, Line, Bar } from "@visx/shape";
import { Datum } from "@/data/mockData";
import { useState } from "react";

interface Props {
  data: Datum[];
  width?: number;
  height?: number;
}

export default function ChartVisx({ data, width = 300, height = 300 }: Props) {
  const [hovered, setHovered] = useState<Datum | null>(null);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const xScale = scaleBand<Datum["category"]>({
    domain: data.map((d) => d.category),
    range: [0, innerW],
    padding: 0.2,
  });

  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map((d) => d.value))],
    nice: true,
    range: [innerH, 0],
  });

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        <AreaClosed<Datum>
          data={data}
          x={(d) => (xScale(d.category) ?? 0) + xScale.bandwidth() / 2}
          y={(d) => yScale(d.value)}
          yScale={yScale}
          stroke="rgb(59 130 246)"
          fill="rgba(59, 130, 246, 0.35)"
          strokeWidth={1}
        />
        <Line
          from={{ x: 0, y: 0 }}
          to={{ x: 0, y: 0 }}
          stroke="transparent"
        />
        {data.map((d) => (
          <Bar
            key={d.category}
            x={xScale(d.category)}
            y={0}
            width={xScale.bandwidth()}
            height={innerH}
            fill="transparent"
            onMouseEnter={() => setHovered(d)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}

        {hovered && (
          <text
            x={(xScale(hovered.category) ?? 0) + xScale.bandwidth() / 2}
            y={yScale(hovered.value) - 10}
            textAnchor="middle"
            className="text-xs fill-current text-gray-800"
          >
            {hovered.value}
          </text>
        )}
      </Group>
    </svg>
  );
}