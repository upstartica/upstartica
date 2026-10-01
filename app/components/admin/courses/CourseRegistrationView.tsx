'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, PlusCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const mockAvailableCourses = [
    { training: 'Advanced Corporate Finance', initiator: 'Andrew Blick', owner: '25 Apr', language: 'EN', field: 'Finance' },
    { training: 'Blockchain for Business', initiator: '', owner: '16 Feb', language: 'EN', field: 'Tech' },
    { training: 'Global Economics 101', initiator: '', owner: '16 Feb', language: 'RU', field: 'Economics' },
    { training: 'Negotiation Skills for Leaders', initiator: '', owner: '12 Feb', language: 'RU', field: 'Soft Skills' },
    { training: 'Sustainable Business Practices', initiator: '', owner: '03 Feb', language: 'RU', field: 'Strategy' },
    { training: 'Forex Trading Fundamentals', initiator: 'Hans Fillipinho', owner: '20 Jan', language: 'FR', field: 'Trading' },
    { training: 'Risk Management Frameworks', initiator: '', owner: '18 Jan', language: 'FR', field: 'Risk' },
    { training: 'Product Market Fit Analysis', initiator: '', owner: '14 Jan', language: 'FR', field: 'Product' },
    { training: 'Agile for Startups', initiator: '', owner: '05 Jan', language: 'FR', field: 'Operations' },
];

const CourseRegistrationView = () => {
    const [year, setYear] = useState(2025);
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div>
            {/* Empty State placeholder */}
            <div className="flex flex-col items-center justify-center py-12 mb-12">
                <div className="relative mb-6">
                    {/* Simple CSS illustration for the clipboard icon */}
                    <div className="w-16 h-20 bg-white border-2 border-gray-200 rounded-lg shadow-sm relative rotate-[-10deg] z-0">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-blue-500 rounded-t-sm"></div>
                    </div>
                    <div className="w-16 h-20 bg-white border-2 border-gray-200 rounded-lg shadow-sm absolute top-0 left-4 z-10">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-blue-500 rounded-t-sm"></div>
                    </div>
                </div>
                <h3 className="text-gray-500 font-medium text-lg">There are no courses registrations.</h3>
            </div>

            {/* Available Courses Section */}
            <div className="bg-white">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                        <h2 className="text-lg font-bold text-gray-800">Available Courses:</h2>

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

                    <div className="flex items-center gap-4">
                        {/* Field Dropdown */}
                        <div className="relative w-48">
                            <select className="w-full bg-gray-100 border-none rounded-md px-4 py-2 text-sm text-gray-600 outline-none appearance-none cursor-pointer">
                                <option>Field</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none">
                                <ChevronDown size={16} />
                            </div>
                        </div>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                        >
                            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </button>
                    </div>
                </div>

                {isExpanded && (
                    <div className="mb-8">
                        {/* Table Header */}
                        <div className="grid grid-cols-[3fr_1.5fr_1fr_1fr_1fr_0.5fr] gap-4 bg-gray-300 px-6 py-3 rounded-md mb-2 text-xs font-semibold text-gray-600">
                            <div>Training</div>
                            <div>Initiator</div>
                            <div>Owner</div>
                            <div>Language</div>
                            <div>Field</div>
                            <div></div>
                        </div>

                        {/* Table Rows */}
                        <div className="space-y-1">
                            {mockAvailableCourses.map((course, index) => (
                                <div key={index} className={`grid grid-cols-[3fr_1.5fr_1fr_1fr_1fr_0.5fr] gap-4 px-6 py-4 rounded-md items-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <div className="text-sm font-medium text-gray-800">{course.training}</div>
                                    <div className="text-sm font-medium text-gray-600">{course.initiator}</div>
                                    <div className="text-sm font-medium text-gray-600">{course.owner}</div>
                                    <div className="text-sm font-medium text-gray-600">{course.language}</div>
                                    <div className="text-sm font-medium text-gray-600">{course.field}</div>
                                    <div className="flex justify-end">
                                        <button className="text-blue-500 hover:text-blue-600 transition-colors">
                                            <PlusCircle size={24} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pagination */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <button className="flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50 gap-1 mr-2" disabled>
                        <ArrowLeft size={16} /> Previous
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center bg-[#3B82F6] text-white rounded font-medium">1</button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">2</button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">3</button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">4</button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">5</button>
                    <span className="px-1 text-gray-400">...</span>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">31</button>
                    <button className="flex items-center text-blue-500 hover:text-blue-600 gap-1 ml-2 font-medium">
                        Next <ArrowRight size={16} />
                    </button>
                    <button className="flex items-center text-blue-500 hover:text-blue-600 gap-1 ml-4 font-medium">
                        <ArrowRight size={16} className="rotate-90" /> Show all
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseRegistrationView;
