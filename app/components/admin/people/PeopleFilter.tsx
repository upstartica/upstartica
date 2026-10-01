'use client';

import React from 'react';

const PeopleFilter = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Filter</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Andrew Salgado"
                            className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Email address</label>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                    </div>

                    {/* Login & Branch */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Login</label>
                            <input
                                type="text"
                                placeholder="Login"
                                className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Branch</label>
                            <select className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm text-gray-500 focus:ring-2 focus:ring-blue-100 outline-none appearance-none cursor-pointer">
                                <option>Select</option>
                            </select>
                        </div>
                    </div>

                    {/* 1C ID & Practice */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">1C Id</label>
                            <input
                                type="text"
                                placeholder="Id"
                                className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Practice</label>
                            <select className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm text-gray-500 focus:ring-2 focus:ring-blue-100 outline-none appearance-none cursor-pointer">
                                <option>Select</option>
                            </select>
                        </div>
                    </div>

                    {/* User Type */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">User type</label>
                        <select className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm text-gray-500 focus:ring-2 focus:ring-blue-100 outline-none appearance-none cursor-pointer">
                            <option>Any</option>
                        </select>
                    </div>

                    {/* User Contract Type */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">User contract type</label>
                        <select className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm text-gray-500 focus:ring-2 focus:ring-blue-100 outline-none appearance-none cursor-pointer">
                            <option>Any</option>
                        </select>
                    </div>

                    {/* Checkboxes Left */}
                    <div className="space-y-3 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                            <span className="text-xs text-gray-600">Show User Type, Login, Start Date, 1C Id</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                            <span className="text-xs text-gray-600">Show Skype, Office phone, Mobile phone, Room number, Title</span>
                        </label>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* CV & Filters */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">CV</label>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none mb-3"
                        />
                        <div className="flex flex-wrap gap-4">
                            {['Capability', 'Technology', 'Certificate', 'Course'].map((item) => (
                                <label key={item} className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-xs text-gray-600">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Capabilities */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Capabilities</label>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                    </div>

                    {/* Technology */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Technology</label>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                    </div>

                    {/* Certificates */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Certificates</label>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                    </div>

                    {/* Courses */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Courses</label>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                    </div>

                    {/* Education */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Education</label>
                        <div className="grid grid-cols-2 gap-4">
                            <select className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm text-gray-500 focus:ring-2 focus:ring-blue-100 outline-none appearance-none cursor-pointer">
                                <option>Select</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Search for specialization"
                                className="w-full bg-gray-50 border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                        </div>
                    </div>

                    {/* Checkboxes Right */}
                    <div className="space-y-3 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                            <span className="text-xs text-gray-600">Show current assignments</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                            <span className="text-xs text-gray-600">Include terminated employees</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-gray-50">
                <button className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                    Clear
                </button>
                <button className="px-8 py-2 rounded-full bg-[#22C55E] text-white text-sm font-medium hover:bg-green-600 transition-colors shadow-sm">
                    Search
                </button>
            </div>
        </div>
    );
};

export default PeopleFilter;
