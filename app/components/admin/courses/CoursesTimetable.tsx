'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const CoursesTimetable = () => {
    // Mock data based on screenshot (July 2019/Typical Month starting on Monday)
    // Days: Mon 1 - Wed 31.
    // Events: 
    // 10th: Management in Parliament (paris, online)
    // 25th: Qualification P.1 (paris)

    const events = [
        {
            day: 10,
            title: 'Startup Evaluation Panel',
            time: '10:00',
            tags: [
                { label: 'remote', color: 'bg-blue-500' },
                { label: 'london', color: 'bg-green-500' }
            ],
            highlightDate: true // Red background for date
        },
        {
            day: 25,
            title: 'Financial Auditing Basics',
            time: '10:00',
            tags: [
                { label: 'online', color: 'bg-blue-500' }
            ]
        }
    ];

    const renderCalendarGrid = () => {
        const days = [];
        const totalSlots = 35; // 5 rows * 7 cols

        // Days 1 to 31 match July logic starting Monday
        for (let i = 1; i <= totalSlots; i++) {
            let dayNumber = i;
            let monthLabel = 'July';
            let isNextMonth = false;

            if (i > 31) {
                dayNumber = i - 31;
                monthLabel = 'August';
                isNextMonth = true;
            }

            const event = events.find(e => e.day === dayNumber && !isNextMonth);

            days.push(
                <div key={i} className="min-h-[140px] border-r border-b border-gray-300 p-3 relative flex flex-col justify-between group hover:bg-gray-50 transition-colors">
                    {/* Top Section: Date */}
                    <div className="flex justify-end">
                        <span className={`text-sm ${event?.highlightDate ? 'bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-lg shadow-sm' : 'text-gray-600'}`}>
                            {dayNumber}
                        </span>
                    </div>

                    {/* Middle Section: Event Card */}
                    {event && (
                        <div className="mt-2 mb-auto">
                            <div className="text-[10px] text-gray-400 mb-1">{event.time}</div>
                            <div className="text-xs font-bold text-gray-800 leading-tight mb-2">
                                {event.title}
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {event.tags.map((tag, idx) => (
                                    <span key={idx} className={`${tag.color} text-white text-[9px] px-2 py-0.5 rounded-full capitalize`}>
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bottom Section: Month Label */}
                    <div className="text-center mt-auto">
                        <span className="text-2xl font-bold text-gray-100 uppercase tracking-widest pointer-events-none select-none">
                            {monthLabel}
                        </span>
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="space-y-8">
            {/* Filter Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Filter</h3>

                <div className="flex flex-wrap items-end gap-6">
                    {/* Date Selector */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Select the date</label>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-gray-50 rounded-md border border-gray-200">
                                <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-l-md">
                                    <ChevronLeft size={16} />
                                </button>
                                <span className="px-6 text-sm font-medium text-gray-700">July 2019</span>
                                <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-r-md">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                            <button className="p-2 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100 border border-blue-100">
                                <CalendarIcon size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Branch */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Branch</label>
                        <select className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2 w-48 text-sm text-gray-700 outline-none cursor-pointer">
                            <option>Paris</option>
                            <option>London</option>
                        </select>
                    </div>

                    {/* Field of knowledge */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Field of knowledge</label>
                        <select className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2 w-48 text-sm text-gray-700 outline-none cursor-pointer">
                            <option>All</option>
                        </select>
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Language</label>
                        <select className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2 w-48 text-sm text-gray-700 outline-none cursor-pointer">
                            <option>All</option>
                        </select>
                    </div>

                    {/* Note Box */}
                    <div className="ml-auto border border-gray-200 rounded-lg p-3 w-64">
                        <div className="text-center">
                            <span className="text-blue-500 font-bold text-xs">Note:</span>
                        </div>
                        <div className="text-[10px] text-gray-500 text-center mt-1">
                            Course time is displayed in your local time
                        </div>
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
                {/* Header Row */}
                <div className="grid grid-cols-7 border-b border-gray-300">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <div key={day} className="py-4 text-center text-xs font-semibold text-gray-600 border-r border-gray-300 last:border-r-0">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7">
                    {renderCalendarGrid()}
                </div>
            </div>
        </div>
    );
};

export default CoursesTimetable;
