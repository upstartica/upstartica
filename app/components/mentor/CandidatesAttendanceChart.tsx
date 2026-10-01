'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { month: 'Aug 2025', value: 20 },
    { month: 'Sep 2025', value: 45 },
    { month: 'Oct 2025', value: 35 },
    { month: 'Nov 2025', value: 55 },
    { month: 'Dec 2025', value: 85 },
    { month: 'Jan 2025', value: 120 }, // Peak
    { month: 'Feb 2025', value: 65 }, // Dip
    { month: 'Mar 2025', value: 45 },
    { month: 'Apr 2025', value: 140 }, // High Peak
    { month: 'May 2025', value: 80 },
];

const CandidatesAttendanceChart = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 500 }}
                        dy={10}
                        interval={0} // Show all ticks (might need adjustment for mobile)
                    // Abbreviate if needed, but data has short names
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '5 5' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#6366f1"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CandidatesAttendanceChart;
