'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const mockProjects = [
    'Curriculum_Dev_Fintech', 'Student_Mentoring_BatchA', 'Course_Review_Crypto', 'Webinar_Host_Startup', 'Intro_to_Investing',
    'Advanced_Accounting', 'Market_Analysis_2025', 'Student_Onboarding', 'Exam_Proctoring',
    'Content_Update_Q1', 'Alumni_Network_Events', 'Grant_Proposal_Writing'
];

const AssignedProjects = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Projects List */}
            <div className="flex-1 bg-white rounded-xl mb-8 w-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-800">Projects you are assigned to (12)</h3>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </div>

                {isExpanded && (
                    <div className="flex flex-wrap gap-3">
                        {mockProjects.map((project, index) => (
                            <div
                                key={index}
                                className={`
                                    px-3 py-1.5 rounded-full border text-[10px] font-medium cursor-pointer transition-colors
                                    ${index === 0 || index === 1 ? 'bg-[#3B82F6] text-white border-[#3B82F6]' : 'border-blue-500 text-gray-700 hover:bg-blue-50'}
                                `}
                            >
                                {project}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="w-full lg:w-64 shrink-0">
                <h3 className="text-xs font-bold text-gray-800 mb-3">Legend</h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-6 bg-[#3B82F6] rounded text-[10px] text-white flex items-center justify-center relative">
                            8.00
                            <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full m-0.5"></div>
                        </div>
                        <span className="text-xs text-gray-600">Workday</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-6 bg-[#EF4444] rounded text-[10px] text-white flex items-center justify-center">
                            8.00
                        </div>
                        <span className="text-xs text-gray-600">Holiday</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-6 border border-blue-500 rounded bg-white"></div>
                        <span className="text-xs text-gray-600">Today</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-6 bg-[#22C55E] rounded flex items-center justify-center relative">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        <span className="text-xs text-gray-600">Day off had (paid)</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-6 bg-[#F97316] rounded text-[10px] text-white flex items-center justify-center">
                            8.00
                        </div>
                        <span className="text-xs text-gray-600">Overtime/undertime</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignedProjects;
