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
    Legend
} from 'recharts';

const data = [
    { year: '2020', Growth: 40, Consistent: 30, Dropped: 10 },
    { year: '2021', Growth: 60, Consistent: 50, Dropped: 15 },
    { year: '2022', Growth: 90, Consistent: 70, Dropped: 20 },
    { year: '2023', Growth: 120, Consistent: 90, Dropped: 25 },
];

const CompanyFactsBarChart = () => {
    return (
        <div className="w-full h-full bg-white rounded-lg p-4">
            <h3 className="text-gray-800 font-bold mb-1">Student Consistency</h3>
            <p className="text-gray-400 text-sm mb-4">Performance Trends</p>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis hide />
                        <Tooltip />
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            wrapperStyle={{ paddingTop: '20px' }}
                        />
                        <Bar dataKey="Growth" stackId="a" fill="#22C55E" name="High Growth" />
                        <Bar dataKey="Consistent" stackId="a" fill="#3B82F6" name="Consistent" />
                        <Bar dataKey="Dropped" stackId="a" fill="#EF4444" name="Dropped Out" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CompanyFactsBarChart;
