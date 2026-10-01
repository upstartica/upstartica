'use client';

import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const FindCoursesFilter = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[600px] flex flex-col relative">
            <h2 className="text-xl font-bold text-gray-800 mb-8">Filter</h2>

            {/* Top Row: Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Field of knowledge */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Field of knowledge</label>
                    <select className="w-full bg-gray-100 border-none rounded-md px-4 py-3 text-sm text-gray-700 outline-none cursor-pointer appearance-none">
                        <option>All</option>
                    </select>
                </div>

                {/* Course */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Course</label>
                    <select className="w-full bg-gray-100 border-none rounded-md px-4 py-3 text-sm text-gray-700 outline-none cursor-pointer appearance-none">
                        <option>All</option>
                    </select>
                </div>

                {/* Instructors */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Instructors</label>
                    <select className="w-full bg-gray-100 border-none rounded-md px-4 py-3 text-sm text-gray-700 outline-none cursor-pointer appearance-none">
                        <option>All</option>
                    </select>
                </div>
            </div>

            {/* Period and Radio Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-center">
                {/* Period */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Period</label>
                    <select className="w-full bg-gray-100 border-none rounded-md px-4 py-3 text-sm text-gray-700 outline-none cursor-pointer appearance-none">
                        <option>Other</option>
                    </select>
                </div>

                {/* Radio Buttons */}
                <div className="flex items-center gap-6 mt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">actual dates</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                            {/* Unchecked */}
                        </div>
                        <span className="text-xs font-medium text-gray-700">planned</span>
                    </label>
                </div>
            </div>

            {/* Date Pickers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Start date:</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Select"
                            className="w-full bg-gray-100 border-none rounded-md px-4 py-3 text-sm text-gray-500 outline-none"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none">
                            <CalendarIcon size={18} />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Finish date:</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Select"
                            className="w-full bg-gray-100 border-none rounded-md px-4 py-3 text-sm text-gray-500 outline-none"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none">
                            <CalendarIcon size={18} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Inactive Checkbox */}
            <div className="mb-12">
                <label className="flex items-center gap-3 cursor-pointer">
                    <div className="w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center">
                        {/* Unchecked */}
                    </div>
                    <span className="text-xs font-medium text-gray-600">Show inactive trainings</span>
                </label>
            </div>

            {/* Footer Buttons */}
            <div className="mt-auto flex justify-end items-center gap-4">
                <button className="px-8 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                    Clear
                </button>
                <button className="px-10 py-2 rounded-full bg-[#22C55E] text-white text-sm font-medium hover:bg-green-600 transition-colors shadow-sm">
                    Search
                </button>
            </div>
        </div>
    );
};

export default FindCoursesFilter;
