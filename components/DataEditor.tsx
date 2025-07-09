"use client";
import { useState } from "react";
import { Datum } from "@/data/mockData";

interface Props {
  data: Datum[];
  onChange: (d: Datum[]) => void;
}

export default function DataEditor({ data, onChange }: Props) {
  const [rows, setRows] = useState<Datum[]>(data);

  const updateRow = (idx: number, field: keyof Datum, value: string) => {
    const updated = rows.map((r, i) =>
      i === idx ? { ...r, [field]: field === "value" ? +value : value } : r
    );
    setRows(updated);
    onChange(updated);
  };

  const addRow = () => {
    const next = [...rows, { category: `X${rows.length}`, value: 0 }];
    setRows(next);
    onChange(next);
  };

  const removeRow = (idx: number) => {
    const next = rows.filter((_, i) => i !== idx);
    setRows(next);
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {rows.map((r, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <input
            className="w-20 border rounded px-1 py-0.5 text-sm bg-white"
            value={r.category}
            onChange={(e) => updateRow(idx, "category", e.target.value)}
          />
          <input
            type="number"
            className="w-24 border rounded px-1 py-0.5 text-sm bg-white"
            value={r.value}
            onChange={(e) => updateRow(idx, "value", e.target.value)}
          />
          <button
            aria-label="Delete row"
            className="px-1.5 py-0.5 border rounded text-xs text-red-600 hover:bg-red-50"
            onClick={() => removeRow(idx)}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        className="px-2 py-1 border rounded text-sm hover:bg-gray-50"
        onClick={addRow}
      >
        + Add row
      </button>
    </div>
  );
}