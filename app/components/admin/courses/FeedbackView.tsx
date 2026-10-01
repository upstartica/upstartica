'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

const mockPassedCourses = [
    { date: '24 Apr', training: 'Introduction to Venture Capital', instructor: "Keithlyn O'Hara", hours: '3.00' },
    { date: '16 Feb', training: 'Business Strategy Fundamentals', instructor: 'Matthew Brandstock', hours: '5.00' },
    { date: '16 Feb', training: 'Accounting for Startups', instructor: 'Chris Columbus', hours: '4.00' },
    { date: '11 Feb', training: 'Marketing and Growth Hacking', instructor: 'Chris Columbus', hours: '2.50' },
    { date: '03 Feb', training: 'Legal Structures for Entrepreneurs', instructor: 'Arnold Harris', hours: '3.00' },
    { date: '01 Feb', training: 'Seed Funding Operations', instructor: 'Arnold Harris', hours: '4.50' },
];

const FeedbackView = () => {
    const [year, setYear] = useState(2025);
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="bg-white rounded-xl">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                    <h2 className="text-lg font-bold text-gray-800">Passed Courses:</h2>

                    {/* Year Selector */}
                    <div className="flex items-center bg-gray-100 rounded-lg">
                        <button
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-l-lg transition-colors"
                            onClick={() => setYear(y => y - 1)}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="px-6 text-sm font-medium text-gray-700">{year}</span>
                        <button
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-r-lg transition-colors"
                            onClick={() => setYear(y => y + 1)}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                >
                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
            </div>

            {/* Table Content */}
            {isExpanded && (
                <div className="overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-[1fr_3fr_1.5fr_0.5fr] gap-4 bg-gray-300 px-6 py-4 rounded-md mb-2">
                        <div className="text-xs font-semibold text-gray-600">Date</div>
                        <div className="text-xs font-semibold text-gray-600">Training</div>
                        <div className="text-xs font-semibold text-gray-600">Instructor</div>
                        <div className="text-xs font-semibold text-gray-600 text-right">Hours</div>
                    </div>

                    {/* Table Rows */}
                    <div className="space-y-1">
                        {mockPassedCourses.map((course, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-[1fr_3fr_1.5fr_0.5fr] gap-4 px-6 py-5 rounded-md ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                            >
                                <div className="text-sm font-medium text-gray-600">{course.date}</div>
                                <div className="text-sm font-medium text-gray-800">{course.training}</div>
                                <div className="text-sm font-medium text-gray-600">{course.instructor}</div>
                                <div className="text-sm font-medium text-gray-600 text-right">{course.hours}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedbackView;
