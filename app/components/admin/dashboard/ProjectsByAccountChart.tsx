'use client';

import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip
} from 'recharts';

const data = [
    { name: 'Venture Capital', value: 25, color: '#EF4444' }, // Red
    { name: 'Business Strategy', value: 20, color: '#F59E0B' }, // Yellow/Orange
    { name: 'Financial Modeling', value: 15, color: '#9F1239' }, // Dark Red/Brown
    { name: 'Crypto & Assets', value: 10, color: '#14B8A6' }, // Teal
    { name: 'Marketing', value: 15, color: '#3B82F6' }, // Blue
    { name: 'Startup Law', value: 10, color: '#A855F7' }, // Purple
    { name: 'Leadership', value: 5, color: '#22C55E' }, // Green
];

const ProjectsByAccountChart = () => {
    return (
        <div className="w-full h-full bg-white rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-gray-800 font-bold mb-4 self-start">Course Distribution</h3>
            <div className="h-[250px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            wrapperStyle={{ paddingTop: '20px', fontSize: '10px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center">
                    <p className="text-gray-500 text-xs">Students by</p>
                    <p className="text-gray-700 font-bold text-sm">Course</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectsByAccountChart;
