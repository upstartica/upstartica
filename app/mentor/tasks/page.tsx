'use client';

import React from 'react';
import Link from 'next/link';
import { ClipboardList, FileCheck, ArrowRight } from 'lucide-react';
import Sidebar from '../../components/mentor/Sidebar';

const TasksPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="flex-1 p-8 ml-64">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">Tasks Management</h1>
                        <p className="text-gray-500">Manage student assignments and review submissions.</p>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Assign Task Card */}
                        <Link href="/mentor/assign-task" className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <ClipboardList size={120} className="text-blue-600 transform rotate-12 translate-x-4 -translate-y-4" />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <ClipboardList size={28} />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Assign Task</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        Create new detailed tasks for your students. Set requirements, deadlines, and attach resources.
                                    </p>
                                </div>

                                <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                                    Create Assignment <ArrowRight size={16} className="ml-2" />
                                </div>
                            </div>
                        </Link>

                        {/* View Submissions Card */}
                        <Link href="/mentor/submissions" className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FileCheck size={120} className="text-emerald-600 transform rotate-12 translate-x-4 -translate-y-4" />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                    <FileCheck size={28} />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">View Submissions</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        Review and grade tasks submitted by students. Provide feedback and track progress.
                                    </p>
                                </div>

                                <div className="flex items-center text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                                    Review Work <ArrowRight size={16} className="ml-2" />
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TasksPage;
