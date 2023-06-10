'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const sample = [
//   { name: 'Page A', uv: 4000 },
//   { name: 'Page B', uv: 3000 },
//   { name: 'Page C', uv: 2000 },
//   { name: 'Page D', uv: 2780 },
//   { name: 'Page E', uv: 1890 },
//   { name: 'Page F', uv: 2390 },
//   { name: 'Page G', uv: 3490 },
// ];

export default function LineChartComponent(props: { data: { name: string, uv: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="uv" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}