'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LabelList
} from 'recharts';

const chartData = [
    { name: 'Berlin, Germany', value: 63, color: '#a855f7' },
    { name: 'Paris, France', value: 47, color: '#22c55e' },
    { name: 'Belgrade, Serbia', value: 52, color: '#eab308' },
    { name: 'Copenhagen, Denmark', value: 81, color: '#2563eb' },
];

const TopPerformersChart = () => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', paddingTop: '20px' }}>
            {/* Custom Axis Labels */}
            <div className="flex justify-between text-[10px] text-gray-400 font-medium px-1 mb-2 absolute top-0 w-full left-0">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
            </div>

            <ResponsiveContainer>
                <BarChart
                    layout="vertical"
                    data={chartData}
                    margin={{
                        top: 0,
                        right: 30, // Space for labels
                        left: -60,
                        bottom: 0,
                    }}
                    barSize={12}
                    barGap={10}
                >
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" radius={[10, 10, 10, 10]} background={{ fill: '#f3f4f6', radius: 10 }}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList
                            dataKey="value"
                            position="right"
                            formatter={(val: any) => `${val}%`}
                            style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                fill: '#4b5563' // gray-600
                            }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopPerformersChart;
