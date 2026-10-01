'use client';

import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import TimesheetGrid from '../../components/admin/timesheet/TimesheetGrid';
import CommentsSection from '../../components/admin/timesheet/CommentsSection';
import AssignedProjects from '../../components/admin/timesheet/AssignedProjects';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, RefreshCw, Info } from 'lucide-react';

export default function TimesheetPage() {
    return (
        <div className="flex min-h-screen bg-white">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-8 min-w-0">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-xl font-bold text-gray-800 mb-6">Time sheet</h1>

                    <div className="flex flex-wrap items-end justify-between gap-4">
                        {/* Date Selector */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-2">Select the date</label>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center bg-gray-100 rounded-md">
                                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-l-md">
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="px-8 text-sm font-medium text-gray-700">2019</span>
                                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-r-md">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                                <button className="p-2 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100 border border-blue-100">
                                    <CalendarIcon size={18} />
                                </button>
                                <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
                                    <RefreshCw size={18} />
                                </button>
                            </div>
                        </div>

                        <button className="px-6 py-2 rounded-full border border-blue-500 text-blue-500 text-sm font-medium hover:bg-blue-50 transition-colors">
                            My timesheet's report
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <TimesheetGrid />

                    <div className="pl-2">
                        <Info className="text-blue-500 mb-6" size={20} />
                    </div>

                    <CommentsSection />
                    <AssignedProjects />
                </div>
            </div>
        </div>
    );
}
