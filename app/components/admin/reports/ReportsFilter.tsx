'use client';

import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';

interface ReportsFilterProps {
    activeModule: string;
}

const ReportsFilter = ({ activeModule }: ReportsFilterProps) => {
    const isBookkeeping = activeModule === 'bookkeeping';

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Filter</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {/* Branch */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Branch</label>
                    <div className="relative">
                        <select className="w-full bg-gray-100 border-none rounded-md px-4 py-2.5 text-sm text-gray-700 outline-none appearance-none cursor-pointer">
                            <option>All</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
                    </div>
                </div>

                {/* User division */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">User division</label>
                    <div className="relative">
                        <select className="w-full bg-gray-100 border-none rounded-md px-4 py-2.5 text-sm text-gray-700 outline-none appearance-none cursor-pointer">
                            <option>All</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
                    </div>
                </div>

                {/* User */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">User</label>
                    <div className="relative">
                        <select className="w-full bg-gray-100 border-none rounded-md px-4 py-2.5 text-sm text-gray-700 outline-none appearance-none cursor-pointer">
                            <option>All</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
                    </div>
                </div>

                {/* Account */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Account</label>
                    <div className="relative">
                        <select className="w-full bg-gray-100 border-none rounded-md px-4 py-2.5 text-sm text-gray-700 outline-none appearance-none cursor-pointer">
                            <option>Other</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
                    </div>
                </div>

                {/* Project */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Project</label>
                    <div className="relative">
                        <select className="w-full bg-gray-100 border-none rounded-md px-4 py-2.5 text-sm text-gray-700 outline-none appearance-none cursor-pointer">
                            <option>Other</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            {/* Bookkeeping Specific Fields */}
            {isBookkeeping && (
                <div className="mt-6 flex flex-wrap gap-12">
                    {/* Start Date */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Start date:</label>
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="Select"
                                className="w-full bg-gray-100 border-none rounded-md px-4 py-2.5 text-sm text-gray-700 outline-none placeholder-gray-400"
                            />
                            <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center bg-blue-100 rounded-r-md cursor-pointer">
                                <Calendar className="text-blue-500" size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Finish Date */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Finish date:</label>
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="Select"
                                className="w-full bg-gray-100 border-none rounded-md px-4 py-2.5 text-sm text-gray-700 outline-none placeholder-gray-400"
                            />
                            <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center bg-blue-100 rounded-r-md cursor-pointer">
                                <Calendar className="text-blue-500" size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Capacity */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Capacity</label>
                        <div className="flex flex-col gap-2 mt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700">External</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
                                <span className="text-sm font-medium text-gray-700">Internal</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-12 pt-12">
                <button className="px-8 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                    Clear
                </button>
                <button className="px-8 py-2 rounded-full bg-[#22C55E] text-white text-sm font-medium hover:bg-green-600 transition-colors shadow-sm">
                    Generate
                </button>
            </div>
        </div>
    );
};

export default ReportsFilter;
