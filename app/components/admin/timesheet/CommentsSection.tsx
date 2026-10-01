'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const mockComments = [
    { date: '15 Jan', task: 'Course_Review_Crypto', role: 'Auditor', activity: 'Quality Check', hours: '8.00', comment: 'Reviewed module 3 for accuracy' },
    { date: '16 Jan', task: 'Webinar_Host_Startup', role: 'Host', activity: 'Event', hours: '8.00', comment: 'Hosted Q&A session with students' },
];

const CommentsSection = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="bg-white rounded-xl mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-800">Comments</h3>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>

            {isExpanded && (
                <div className="overflow-hidden">
                    {/* Header */}
                    <div className="grid grid-cols-[0.8fr_1.5fr_1fr_1fr_0.8fr_2fr] gap-4 bg-gray-300 px-6 py-3 rounded-md mb-1">
                        <div className="text-[10px] font-bold text-gray-700">Date</div>
                        <div className="text-[10px] font-bold text-gray-700">Project Task</div>
                        <div className="text-[10px] font-bold text-gray-700">Role</div>
                        <div className="text-[10px] font-bold text-gray-700">Activity</div>
                        <div className="text-[10px] font-bold text-gray-700">Hours</div>
                        <div className="text-[10px] font-bold text-gray-700">Comments</div>
                    </div>

                    {/* Rows */}
                    <div className="space-y-1">
                        {mockComments.map((item, index) => (
                            <div key={index} className={`grid grid-cols-[0.8fr_1.5fr_1fr_1fr_0.8fr_2fr] gap-4 px-6 py-3 rounded-md ${index % 2 === 0 ? 'bg-white' : 'bg-[#F3F4F6]'}`}>
                                <div className="text-xs text-gray-700">{item.date}</div>
                                <div className="text-xs text-gray-700">{item.task}</div>
                                <div className="text-xs text-gray-700">{item.role}</div>
                                <div className="text-xs text-gray-700">{item.activity}</div>
                                <div className="text-xs text-gray-700">{item.hours}</div>
                                <div className="text-xs text-gray-700">{item.comment}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentsSection;
