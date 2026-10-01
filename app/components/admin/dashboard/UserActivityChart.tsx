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
    { month: 'Jan', Active: 120, New: 40 },
    { month: 'Feb', Active: 132, New: 35 },
    { month: 'Mar', Active: 145, New: 50 },
    { month: 'Apr', Active: 160, New: 45 },
    { month: 'May', Active: 178, New: 60 },
    { month: 'Jun', Active: 195, New: 55 },
];

const UserActivityChart = () => {
    return (
        <div className="w-full h-full bg-white rounded-lg p-4">
            <h3 className="text-gray-800 font-bold mb-1">Live Online Activity</h3>
            <p className="text-gray-400 text-sm mb-4">Daily Average Users</p>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            hide
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
                            dataKey="Active"
                            stackId="1"
                            stroke="#3B82F6"
                            fill="#3B82F6"
                            fillOpacity={0.2}
                            name="Returning Users"
                        />
                        <Area
                            type="monotone"
                            dataKey="New"
                            stackId="1"
                            stroke="#10B981"
                            fill="#10B981"
                            fillOpacity={0.2}
                            name="New Visitors"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UserActivityChart;
