'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const data = [
    { year: '2020', Finance: 30, Marketing: 15, Tech: 20 },
    { year: '2021', Finance: 50, Marketing: 30, Tech: 40 },
    { year: '2022', Finance: 100, Marketing: 60, Tech: 80 },
    { year: '2023', Finance: 150, Marketing: 100, Tech: 120 },
];

const CompanyFactsChart = () => {
    return (
        <div className="w-full h-full bg-white rounded-lg p-4">
            <h3 className="text-gray-800 font-bold mb-1">Student Enrollment Growth</h3>
            <p className="text-gray-400 text-sm mb-4">Total Active Students</p>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" /> */}
                        {/* Dashed lines for Y axis values roughly matching screenshot */}
                        <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                        // ticks={[0, 200, 400, 707]} // mimicking screenshot numbers
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            wrapperStyle={{ paddingTop: '20px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="Finance"
                            stackId="1"
                            stroke="#A855F7"
                            fill="#A855F7"
                            name="Finance Courses"
                        />
                        <Area
                            type="monotone"
                            dataKey="Tech"
                            stackId="1"
                            stroke="#2DD4BF"
                            fill="#2DD4BF"
                            name="Tech Workshops"
                        />
                        <Area
                            type="monotone"
                            dataKey="Marketing"
                            stackId="1"
                            stroke="#FB923C"
                            fill="#FB923C" // Orange
                            name="Marketing & Strategy"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CompanyFactsChart;
