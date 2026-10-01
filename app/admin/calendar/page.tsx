'use client';

import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import MonthCalendar from '../../components/admin/calendar/MonthCalendar';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPage() {
    const [year, setYear] = useState(2025);

    // Mock data for days distribution
    const monthStats = [
        { working: 19, nonWorking: 8 },  // Jan
        { working: 20, nonWorking: 8 },  // Feb
        { working: 21, nonWorking: 10 }, // Mar
        { working: 22, nonWorking: 8 },  // Apr
        { working: 21, nonWorking: 10 }, // May
        { working: 20, nonWorking: 10 }, // Jun
        { working: 21, nonWorking: 10 }, // Jul
        { working: 22, nonWorking: 9 },  // Aug
        { working: 20, nonWorking: 10 }, // Sep
        { working: 22, nonWorking: 9 },  // Oct
        { working: 21, nonWorking: 9 },  // Nov
        { working: 20, nonWorking: 11 }, // Dec
    ];

    return (
        <div className="flex min-h-screen bg-white">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-8 min-w-0">

                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-xl font-bold text-gray-800 mb-6">Time management</h1>

                    <div className="flex flex-wrap items-end gap-8">
                        {/* Branch Selector */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-2">Branch</label>
                            <select className="bg-gray-100 border-none rounded-md px-4 py-2 w-64 text-sm text-gray-700 outline-none cursor-pointer">
                                <option>Gurugram</option>
                                <option>London</option>
                                <option>New York</option>
                            </select>
                        </div>

                        {/* Date Selector */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-2">Select the date</label>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center bg-gray-100 rounded-md">
                                    <button
                                        className="p-2 text-blue-500 hover:bg-gray-200 rounded-l-md transition-colors"
                                        onClick={() => setYear(y => y - 1)}
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="px-6 text-sm font-medium text-gray-700">{year}</span>
                                    <button
                                        className="p-2 text-blue-500 hover:bg-gray-200 rounded-r-md transition-colors"
                                        onClick={() => setYear(y => y + 1)}
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                                <button className="p-2 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100 transition-colors">
                                    <CalendarIcon size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Summary Stats Card */}
                        <div className="flex items-center bg-white border border-blue-200 rounded-xl px-8 py-4 ml-auto lg:ml-8 shadow-sm">
                            <div className="text-center px-6 border-r border-blue-100">
                                <div className="text-3xl font-normal text-gray-800 mb-1">247</div>
                                <div className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">working<br />days</div>
                            </div>
                            <div className="text-center px-6">
                                <div className="text-3xl font-normal text-red-500 mb-1">118</div>
                                <div className="text-[10px] uppercase font-semibold text-red-400 tracking-wider">non-working<br />days</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <MonthCalendar
                            key={index}
                            monthIndex={index}
                            year={year}
                            workingDays={monthStats[index].working}
                            nonWorkingDays={monthStats[index].nonWorking}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
