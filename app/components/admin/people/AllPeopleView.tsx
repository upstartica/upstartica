'use client';

import React from 'react';
import { Download, ChevronRight, ArrowRight } from 'lucide-react';

const mockPeople = [
    { name: 'Konstantin Konstantinopolsky', branch: 'London', division: 'Management', type: 'Delivery billable', contract: 'Employee', start: '12.01.2013', id: '14321' },
    { name: 'Andrew Salgado', branch: 'London', division: 'Management', type: 'Delivery billable', contract: 'Employee', start: '21.04.2014', id: '21345' },
    { name: 'Magdalena Edinborough', branch: 'Liverpool', division: 'Operation', type: 'Delivery billable', contract: 'Subcontractor', start: '02.11.2015', id: '1894' },
    { name: 'Matt Travis', branch: 'Liverpool', division: 'Management', type: 'Delivery billable', contract: 'Employee', start: '02.11.2016', id: '135567' },
    { name: 'Daniel Wellington', branch: 'Manchester', division: 'Operation', type: 'Delivery billable', contract: 'Employee', start: '02.11.2012', id: '10973' },
    { name: 'Lucia Mirosini', branch: 'Leeds', division: 'Finance', type: 'Delivery billable', contract: 'Employee', start: '02.11.2011', id: '6324' },
    { name: 'Anette Brown', branch: 'London', division: 'Operation', type: 'Delivery billable', contract: 'Employee', start: '02.11.2005', id: '4322' },
    { name: 'Christian Lambrou', branch: 'London', division: 'Finance', type: 'Delivery billable', contract: 'Employee', start: '02.11.2009', id: '4521' },
    { name: 'Phil Collins', branch: 'Manchester', division: 'Finance', type: 'Delivery billable', contract: 'Subcontractor', start: '02.11.2008', id: '1422' },
    { name: 'Winston Holliday', branch: 'London', division: 'Operation', type: 'Delivery billable', contract: 'Employee', start: '02.11.2017', id: '45667' },
    { name: 'Carla Andrade', branch: 'London', division: 'Operation', type: 'Delivery billable', contract: 'Employee', start: '02.11.2017', id: '98871' },
];

const AllPeopleView = () => {
    return (
        <div className="space-y-6">
            {/* Header / Summary Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">List of active people</h2>
                    <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors text-sm font-medium">
                        <Download size={16} />
                        Export to Excel
                    </button>
                </div>

                {/* Summary Table */}
                <div className="bg-gray-100 rounded-lg overflow-x-auto p-4 mb-2 w-full">
                    <table className="w-full min-w-[800px]">
                        <thead>
                            <tr className="text-left text-xs text-gray-500 border-b border-gray-300">
                                <th className="pb-2 font-medium">Delivery billable</th>
                                <th className="pb-2 font-medium">Delivery unbillable</th>
                                <th className="pb-2 font-medium">Administration</th>
                                <th className="pb-2 font-medium">CEO</th>
                                <th className="pb-2 font-medium">Sales</th>
                                <th className="pb-2 font-medium">Marketing</th>
                                <th className="pb-2 font-medium">Finance</th>
                                <th className="pb-2 font-medium">HR</th>
                                <th className="pb-2 font-medium">IT</th>
                                <th className="pb-2 font-medium">Legal</th>
                                <th className="pb-2 font-medium">PPS</th>
                                <th className="pb-2 font-medium">L & D</th>
                                <th className="pb-2 font-medium">OG</th>
                                <th className="pb-2 font-medium">OBS</th>
                                <th className="pb-2 font-medium">EBO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-sm text-gray-800">
                                <td className="pt-2 font-semibold">233</td>
                                <td className="pt-2 font-semibold">11</td>
                                <td className="pt-2 font-semibold">8</td>
                                <td className="pt-2 font-semibold">1</td>
                                <td className="pt-2 font-semibold">15</td>
                                <td className="pt-2 font-semibold">11</td>
                                <td className="pt-2 font-semibold">8</td>
                                <td className="pt-2 font-semibold">4</td>
                                <td className="pt-2 font-semibold">3</td>
                                <td className="pt-2 font-semibold">2</td>
                                <td className="pt-2 font-semibold">15</td>
                                <td className="pt-2 font-semibold">1</td>
                                <td className="pt-2 font-semibold">5</td>
                                <td className="pt-2 font-semibold">2</td>
                                <td className="pt-2 font-semibold">0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end gap-8 text-xs text-gray-500 pr-4">
                    <span>Delivery: <span className="font-semibold text-gray-700">587</span></span>
                    <span>Non-delivery: <span className="font-semibold text-gray-700">126</span></span>
                    <span>Total: <span className="font-semibold text-gray-700">132</span> <span className="font-semibold text-gray-700 ml-4">713</span></span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Sidebar Filters */}
                <div className="w-full md:w-64 space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Filter</h3>

                        <div className="mb-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Regions</h4>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">UK <span className="text-gray-400 text-xs">(111)</span></span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">US <span className="text-gray-400 text-xs">(98)</span></span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">France <span className="text-gray-400 text-xs">(45)</span></span>
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Branches</h4>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">London <span className="text-gray-400 text-xs">(111)</span></span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">Liverpool <span className="text-gray-400 text-xs">(12)</span></span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">Manchester <span className="text-gray-400 text-xs">(5)</span></span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">Leeds <span className="text-gray-400 text-xs">(3)</span></span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">Cardiff <span className="text-gray-400 text-xs">(1)</span></span>
                                </label>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Divisions</h4>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">Management <span className="text-gray-400 text-xs">(43)</span></span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">Finance <span className="text-gray-400 text-xs">(10)</span></span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">Legal <span className="text-gray-400 text-xs">(1)</span></span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">Operation <span className="text-gray-400 text-xs">(1)</span></span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">IT <span className="text-gray-400 text-xs">(1)</span></span>
                                </label>
                            </div>
                        </div>

                        <button className="w-full py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                            Clear
                        </button>
                    </div>
                </div>

                {/* Right Table Section */}
                <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden min-w-0 w-full">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <span className="text-gray-500 font-medium">Found: <span className="text-gray-800 font-bold ml-1">110</span></span>
                    </div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Full name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Branch</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Division</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User type</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contract type</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {mockPeople.map((person, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{person.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{person.branch}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{person.division}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{person.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{person.contract}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{person.start}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{person.id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 flex items-center gap-2 text-sm text-gray-600 mt-2">
                        <button className="w-8 h-8 flex items-center justify-center bg-[#3B82F6] text-white rounded font-medium">1</button>
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">2</button>
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">3</button>
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">4</button>
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">5</button>
                        <span className="px-2">...</span>
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">31</button>
                        <div className="flex flex-col text-blue-500 text-xs ml-4 cursor-pointer gap-1">
                            <div className="flex items-center gap-1">
                                Next <ArrowRight size={12} />
                            </div>
                            <div className="flex items-center gap-1">
                                <ArrowRight size={12} className="transform rotate-90" /> Show all
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPeopleView;
