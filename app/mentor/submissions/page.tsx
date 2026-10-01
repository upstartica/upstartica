'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Eye, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '../../components/mentor/Sidebar';
import { getSubmissionsData } from '@/app/actions/data';

interface Submission {
    id: string;
    taskId: string;
    taskTitle: string;
    title: string;
    description: string;
    mentee: string;
    attachmentName: string;
    submittedAt: string;
    status: string;
}

const SubmissionsPage = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            console.log('Fetching submissions from R2...');
            const data = await getSubmissionsData();
            console.log('Mentor - Fetched submissions from R2:', data);
            setSubmissions(data || []);
        } catch (error) {
            console.error('Failed to fetch submissions:', error);
            setSubmissions([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredSubmissions = submissions.filter(sub =>
        sub.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.mentee.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'submitted':
                return 'bg-blue-100 text-blue-700';
            case 'graded':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="flex-1 p-8 ml-64">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/mentor/tasks" className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600">
                                <ArrowLeft size={24} />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Task Submissions</h1>
                                <p className="text-gray-500">Review student work here. {submissions.length > 0 && `${submissions.length} submission${submissions.length !== 1 ? 's' : ''} total`}</p>
                            </div>
                        </div>
                        <button
                            onClick={fetchSubmissions}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            disabled={loading}
                        >
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                            Refresh
                        </button>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search submissions..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                            <Filter size={20} />
                            <span>Filter</span>
                        </button>
                    </div>

                    {/* Submissions Table / List */}
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                        {loading ? (
                            <div className="p-12 text-center text-gray-400">
                                <p>Loading submissions...</p>
                            </div>
                        ) : filteredSubmissions.length === 0 ? (
                            <div className="p-12 text-center text-gray-400">
                                <Eye size={48} className="mx-auto mb-4 opacity-20" />
                                <p>No submissions found</p>
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Task Name</th>
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Mentee</th>
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Submitted Date</th>
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Status</th>
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredSubmissions.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors group cursor-pointer" onClick={() => window.location.href = `/mentor/submissions/${item.id}`}>
                                            <td className="py-4 px-6">
                                                <span className="font-bold text-gray-800">{item.taskTitle}</span>
                                                {item.attachmentName && (
                                                    <span className="block text-xs text-gray-400 mt-1">📎 {item.attachmentName}</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                        {item.mentee ? item.mentee.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?'}
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{item.mentee || 'Unknown'}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-500 text-sm">
                                                {new Date(item.submittedAt).toLocaleDateString('en-US', { 
                                                    month: 'long', 
                                                    day: 'numeric', 
                                                    year: 'numeric' 
                                                })}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <Link
                                                    href={`/mentor/submissions/${item.id}`}
                                                    className="text-blue-600 font-semibold text-sm hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SubmissionsPage;
