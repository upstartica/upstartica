'use client';

import React from 'react';
import { Bell, Mail, MoreVertical, Calendar as CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import UserProfileClient from '../UserProfileClient';

const RightSidebar = () => {
    // Dummy calendar days
    const calendarDays = Array.from({ length: 35 }, (_, i) => {
        const day = i - 2; // Offset to start month correctly visually
        return day > 0 && day <= 30 ? day : '';
    });

    return (
        <div className="w-80 h-screen bg-white border-l border-gray-100 flex flex-col fixed right-0 top-0 overflow-y-auto z-50 p-6">

            {/* Profile Section */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-700">Your Profile</h3>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={18} />
                </button>
            </div>

            <UserProfileClient />

            <div className="flex gap-4 mb-8 justify-center">
                {/* Using the icons from the image: Bell, Monitor/Bag?, Mail */}
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm">
                    <Bell size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm">
                    {/* Placeholder for the middle icon in image */}
                    <CalendarIcon size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm">
                    <Mail size={18} />
                </button>
            </div>

            {/* Performance Growth */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-gray-700 tracking-tight leading-4">Your Performance <br /> Growth</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={18} />
                    </button>
                </div>

                <div className="h-40 flex items-end justify-between gap-2 px-2">
                    {/* Bar chart matching the image colors approximately */}
                    {[
                        { h: '35%', color: 'bg-cyan-400' },
                        { h: '45%', color: 'from-orange-400 to-orange-300' },
                        { h: '50%', color: 'bg-cyan-500' },
                        { h: '65%', color: 'bg-slate-700' },
                        { h: '55%', color: 'from-orange-400 to-orange-300' },
                    ].map((bar, i) => (
                        <div key={i} className="relative w-4 flex flex-col justify-end items-center gap-1 group h-full">
                            {/* Using a simple stack logic to mimic the chart or just simple bars */}
                            {i === 1 || i === 4 ? (
                                // The orange ones seem to be simple gradients
                                <div style={{ height: bar.h }} className={`w-full rounded-t-md bg-gradient-to-t ${bar.color}`} />
                            ) : (
                                // The others have stacked segments (blue, dark blue, cyan)
                                // Simplified for now as single bars of different colors
                                <div style={{ height: bar.h }} className={`w-full rounded-t-md ${bar.color}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Calendar Widget */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-700">Calendar</h3>
                    <div className="flex items-center text-[10px] text-gray-500 font-medium">
                        September 2025
                    </div>
                </div>

                <div className="bg-white rounded-xl">
                    <div className="grid grid-cols-7 text-center mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                            <div key={i} className="text-[10px] text-gray-400 font-bold">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 text-center gap-y-2">
                        {calendarDays.map((d, i) => {
                            // Highlighting some dates as in the image
                            // 16, 17 are green, 12 is yellow, 04, 11, 18, 25, 31 (Sundays) are red
                            let bgClass = "text-gray-600";
                            const isGreen = [16, 17].includes(Number(d));
                            const isYellow = [12].includes(Number(d)); // actually 2/09 is yellow in image, let's pick 02
                            const isRed = [4, 11, 18, 25, 31].includes(Number(d));
                            const isPurple = [20].includes(Number(d));

                            if (Number(d) === 2) bgClass = "bg-yellow-400 text-white shadow-md shadow-yellow-200";
                            else if (isGreen) bgClass = "bg-green-400 text-white shadow-md shadow-green-200";
                            else if (isRed) bgClass = "bg-red-500 text-white shadow-md shadow-red-200";
                            else if (isPurple) bgClass = "bg-purple-500 text-white shadow-md shadow-purple-200";
                            else bgClass = "text-gray-400 bg-gray-50";

                            return (
                                <div key={i} className="flex items-center justify-center">
                                    {d ? (
                                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${bgClass}`}>
                                            {d}
                                        </div>
                                    ) : <div />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RightSidebar;
