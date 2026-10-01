'use client';

import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import CoursesTimetable from '../../components/admin/courses/CoursesTimetable';
import FindCoursesFilter from '../../components/admin/courses/FindCoursesFilter';
import FeedbackView from '../../components/admin/courses/FeedbackView';
import QuizzesView from '../../components/admin/courses/QuizzesView';
import CourseRegistrationView from '../../components/admin/courses/CourseRegistrationView';
import { Archive, Search, FileText, HelpCircle, ClipboardCheck } from 'lucide-react';

export default function CoursesPage() {
    const [activeTab, setActiveTab] = useState<'timetable' | 'find' | 'feedback' | 'quizzes' | 'registration'>('registration');

    return (
        <div className="flex min-h-screen bg-white">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-8 min-w-0">

                {/* Top Tabs Navigation */}
                <div className="flex items-start gap-12 mb-12 ml-4 overflow-x-auto pb-4">
                    {/* Active Tab: Courses timetable */}
                    <div
                        className={`flex flex-col items-center gap-3 cursor-pointer group shrink-0 transition-opacity ${activeTab === 'timetable' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                        onClick={() => setActiveTab('timetable')}
                    >
                        <div className={`w-[180px] h-[100px] rounded-xl flex flex-col items-center justify-center transition-all ${activeTab === 'timetable' ? 'bg-[#3B82F6] shadow-lg scale-105' : 'bg-transparent'}`}>
                            <Archive className={`${activeTab === 'timetable' ? 'text-white' : 'text-gray-600'} w-8 h-8 mb-2`} />
                            <span className={`${activeTab === 'timetable' ? 'text-white' : 'text-gray-800'} font-medium text-sm text-center`}>Courses timetable</span>
                        </div>
                    </div>

                    {/* Find Courses */}
                    <div
                        className={`flex flex-col items-center gap-3 cursor-pointer group shrink-0 transition-opacity ${activeTab === 'find' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                        onClick={() => setActiveTab('find')}
                    >
                        <div className={`w-[180px] h-[100px] rounded-xl flex flex-col items-center justify-center transition-all ${activeTab === 'find' ? 'bg-[#3B82F6] shadow-lg scale-105' : 'bg-transparent pt-4'}`}>
                            <Search className={`${activeTab === 'find' ? 'text-white' : 'text-gray-600'} w-8 h-8 mb-2`} />
                            <span className={`${activeTab === 'find' ? 'text-white' : 'text-gray-800'} font-bold text-xs text-center`}>Find Courses</span>
                        </div>
                    </div>

                    {/* Feedback */}
                    <div
                        className={`flex flex-col items-center gap-3 cursor-pointer group shrink-0 transition-opacity ${activeTab === 'feedback' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                        onClick={() => setActiveTab('feedback')}
                    >
                        <div className={`w-[180px] h-[100px] rounded-xl flex flex-col items-center justify-center transition-all ${activeTab === 'feedback' ? 'bg-[#3B82F6] shadow-lg scale-105' : 'bg-transparent pt-4'}`}>
                            <FileText className={`${activeTab === 'feedback' ? 'text-white' : 'text-gray-600'} w-8 h-8 mb-2`} />
                            <span className={`${activeTab === 'feedback' ? 'text-white' : 'text-gray-800'} font-bold text-xs text-center`}>Feedback</span>
                        </div>
                    </div>

                    {/* Quizzes */}
                    <div
                        className={`flex flex-col items-center gap-3 cursor-pointer group shrink-0 transition-opacity ${activeTab === 'quizzes' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                        onClick={() => setActiveTab('quizzes')}
                    >
                        <div className={`w-[180px] h-[100px] rounded-xl flex flex-col items-center justify-center transition-all ${activeTab === 'quizzes' ? 'bg-[#3B82F6] shadow-lg scale-105' : 'bg-transparent pt-4'}`}>
                            <HelpCircle className={`${activeTab === 'quizzes' ? 'text-white' : 'text-gray-600'} w-8 h-8 mb-2`} />
                            <span className={`${activeTab === 'quizzes' ? 'text-white' : 'text-gray-800'} font-bold text-xs text-center`}>Quizzes</span>
                        </div>
                    </div>

                    {/* Courses registration */}
                    <div
                        className={`flex flex-col items-center gap-3 cursor-pointer group shrink-0 transition-opacity ${activeTab === 'registration' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                        onClick={() => setActiveTab('registration')}
                    >
                        <div className={`w-[180px] h-[100px] rounded-xl flex flex-col items-center justify-center transition-all ${activeTab === 'registration' ? 'bg-[#3B82F6] shadow-lg scale-105' : 'bg-transparent pt-4'}`}>
                            <ClipboardCheck className={`${activeTab === 'registration' ? 'text-white' : 'text-gray-600'} w-8 h-8 mb-2`} />
                            <span className={`${activeTab === 'registration' ? 'text-white' : 'text-gray-800'} font-bold text-xs text-center`}>Courses registration</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {activeTab === 'timetable' && <CoursesTimetable />}
                {activeTab === 'find' && <FindCoursesFilter />}
                {activeTab === 'feedback' && <FeedbackView />}
                {activeTab === 'quizzes' && <QuizzesView />}
                {activeTab === 'registration' && <CourseRegistrationView />}
            </div>
        </div>
    );
}
