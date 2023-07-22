'use client';

import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';
import DATA from '@/seed/chart-data-sentiment.json';

export function SentimentChart() {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart data={DATA} margin={{ right: 0, left: -15, bottom: 0 }}>
        {/*<Area type='monotone' dataKey='irrelevant' stackId="1" stroke='#bebebe' fill='#bebebe' />*/}
        <YAxis hide domain={[0, 50]} />
        <Area
          type="monotone"
          dataKey="positive"
          stackId="1"
          stroke="#028103"
          fill="#6DB36E"
        />
        <Area
          type="monotone"
          dataKey="negative"
          stackId="1"
          stroke="#8B0000"
          fill="#BA676A"
        />
        <Area
          type="monotone"
          dataKey="neutral"
          stackId="1"
          stroke="#F7B707"
          fill="#F7B707"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}