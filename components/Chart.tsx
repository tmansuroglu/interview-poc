"use client";

import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Yes: "#4ade80",
  No: "#f87171",
};

type ChartProps = {
  data: { name: string; count: number }[];
};

export default function Chart({ data }: ChartProps) {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" radius={[10, 10, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name as keyof typeof COLORS]}
              />
            ))}
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
