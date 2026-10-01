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
    Cell
} from 'recharts';

const data = [
    { name: 'Avg. Test Score', value: 82, color: '#A855F7' },
    { name: 'Completion Rate', value: 75, color: '#10B981' },
    { name: 'Active Users', value: 60, color: '#FBBF24' },
    { name: 'New Signups', value: 45, color: '#3B82F6' },
];

const CompletionChart = () => {
    return (
        <div className="w-full h-full bg-white rounded-lg p-4 flex flex-col justify-center">
            <h3 className="text-gray-800 font-bold mb-4">Overall Engagement</h3>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{
                            top: 0,
                            right: 30,
                            left: 40,
                            bottom: 0,
                        }}
                        barSize={10}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                        <XAxis type="number" hide />
                        <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fontSize: 10, fill: '#6B7280' }}
                            width={80}
                        />
                        <Tooltip cursor={{ fill: 'transparent' }} />
                        <Bar dataKey="value" radius={[10, 10, 10, 10]} background={{ fill: '#eee', radius: 10 }}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CompletionChart;
