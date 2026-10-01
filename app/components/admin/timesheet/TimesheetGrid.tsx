'use client';

import React from 'react';
import { MinusCircle, Plus } from 'lucide-react';

const mockDays = [
    { date: '15 / Mon', working: true },
    { date: '16 / Tue', working: true },
    { date: '17 / Wed', working: true },
    { date: '18 / Thu', working: true },
    { date: '19 / Fri', working: true },
    { date: '20 / Sat', working: false },
    { date: '21 / Sun', working: false },
];

const mockRows = [
    { id: 1, project: 'Curiculum_Dev_Fintech', role: 'Instructor', activity: 'Content Creation' },
    { id: 2, project: 'Student_Mentoring_BatchA', role: 'Mentor', activity: 'One-on-One' },
];

const TimesheetGrid = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            {/* Header Columns */}
            <div className="grid grid-cols-[auto_1.5fr_1fr_1fr_repeat(7,minmax(50px,0.5fr))] gap-2 mb-4 items-end">
                <div className="w-8"></div> {/* Remove Icon Placeholder */}
                <div className="text-xs font-semibold text-gray-500 pl-1">Project</div>
                <div className="text-xs font-semibold text-gray-500 pl-1">Role</div>
                <div className="text-xs font-semibold text-gray-500 pl-1">Activity</div>
                {mockDays.map((day, i) => (
                    <div key={i} className="text-[10px] font-medium text-gray-500 text-center">
                        {day.date}
                    </div>
                ))}
            </div>

            {/* Rows */}
            <div className="space-y-3 mb-6">
                {mockRows.map((row) => (
                    <div key={row.id} className="grid grid-cols-[auto_1.5fr_1fr_1fr_repeat(7,minmax(50px,0.5fr))] gap-2 items-center">
                        <button className="text-blue-500 hover:text-blue-600">
                            <MinusCircle size={20} />
                        </button>

                        <select className="bg-gray-100 border-none rounded-md px-3 py-2 text-xs text-gray-700 outline-none w-full">
                            <option>{row.project}</option>
                        </select>
                        <select className="bg-gray-100 border-none rounded-md px-3 py-2 text-xs text-gray-700 outline-none w-full">
                            <option>{row.role}</option>
                        </select>
                        <select className="bg-gray-100 border-none rounded-md px-3 py-2 text-xs text-gray-700 outline-none w-full">
                            <option>{row.activity}</option>
                        </select>

                        {/* Day Inputs */}
                        {mockDays.map((day, i) => (
                            <div key={i} className="relative">
                                {day.working ? (
                                    <div className={`
                                        h-8 rounded flex items-center justify-center text-xs font-medium text-white
                                        ${i === 3 ? 'bg-[#22C55E]' : 'bg-[#3B82F6]'}
                                        relative
                                    `}>
                                        4.00
                                        {i === 2 && <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white rounded-full m-0.5"></div>}
                                        {/* Little dot indicator simulation */}
                                    </div>
                                ) : (
                                    <div className="h-8 bg-gray-200 rounded"></div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500 text-blue-500 text-sm font-medium hover:bg-blue-50 transition-colors">
                        <Plus size={16} /> Add row
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316] text-white text-sm font-medium hover:bg-orange-600 transition-colors">
                        <Plus size={16} /> Add overtime
                    </button>
                </div>

                <div className="flex items-center gap-12 w-full md:w-auto">
                    <div className="flex items-center gap-4 ml-auto">
                        <button className="px-6 py-2 rounded-full border border-gray-300 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors">
                            Save
                        </button>
                        <button className="px-6 py-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">
                            Reject
                        </button>
                        <button className="px-6 py-2 rounded-full bg-gray-200 text-gray-400 text-sm font-medium cursor-not-allowed">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-2 text-xs font-bold text-gray-700">
                Total <span className="ml-2">32.00/32.00</span>
            </div>
        </div>
    );
};

export default TimesheetGrid;
