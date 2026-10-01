'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Download, ArrowLeft } from 'lucide-react';
import Sidebar from '../../../components/mentor/Sidebar';
import { useParams } from 'next/navigation';
import { getSubmissionsData } from '@/app/actions/data';

interface Submission {
    id: string;
    taskId: string;
    taskTitle: string;
    title: string;
    description: string;
    mentee: string;
    attachmentName: string;
    attachmentSize?: number;
    submittedAt: string;
    status: string;
}

const TaskDetailsPage = () => {
    const params = useParams();
    const submissionId = params.taskId as string;
    const [submission, setSubmission] = useState<Submission | null>(null);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmission();
    }, [submissionId]);

    const fetchSubmission = async () => {
        try {
            console.log('Fetching submission details from R2...');
            const data = await getSubmissionsData();
            console.log('All submissions:', data);
            const found = data.find((s: Submission) => s.id === submissionId);
            console.log('Found submission:', found);
            setSubmission(found || null);
        } catch (error) {
            console.error('Failed to fetch submission:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        alert('Notes saved successfully!');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50 font-sans">
                <Sidebar />
                <div className="flex-1 p-8 ml-64 flex items-center justify-center">
                    <p className="text-gray-400">Loading submission...</p>
                </div>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="flex min-h-screen bg-gray-50 font-sans">
                <Sidebar />
                <div className="flex-1 p-8 ml-64">
                    <div className="max-w-6xl mx-auto text-center py-12">
                        <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Not Found</h2>
                        <p className="text-gray-500 mb-6">The submission you're looking for doesn't exist.</p>
                        <Link href="/mentor/submissions" className="text-blue-600 hover:underline">
                            Back to Submissions
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="flex-1 p-8 ml-64">
                <div className="max-w-6xl mx-auto space-y-6">

                    {/* Breadcrumbs / Back Link */}
                    <div className="flex items-center gap-4">
                        <Link href="/mentor/submissions" className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600">
                            <ArrowLeft size={24} />
                        </Link>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Link href="/mentor/tasks" className="hover:text-blue-600 transition-colors">Tasks</Link>
                            <span>/</span>
                            <Link href="/mentor/submissions" className="hover:text-blue-600 transition-colors">Submissions</Link>
                            <span>/</span>
                            <span className="text-gray-900 font-medium">{submission.taskTitle}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8">
                        {/* Main Content (Left) */}
                        <div className="col-span-8 space-y-8">

                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-1">{submission.taskTitle}</h1>
                                <p className="text-blue-500 text-sm font-medium">
                                    Submitted: {new Date(submission.submittedAt).toLocaleDateString('en-US', { 
                                        month: 'long', 
                                        day: 'numeric', 
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>

                            {/* Submission Title */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                                <h2 className="text-lg font-bold text-gray-900">Submission Title</h2>
                                <p className="text-gray-700 text-sm font-medium">{submission.title}</p>
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                                <h2 className="text-lg font-bold text-gray-900">Student Comments</h2>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {submission.description || 'No comments provided by the student.'}
                                </p>
                            </div>

                            {/* Attachments */}
                            {submission.attachmentName && (
                                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                                    <h2 className="text-lg font-bold text-gray-900">Attachments</h2>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 text-gray-500">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700 block">{submission.attachmentName}</span>
                                                {submission.attachmentSize && (
                                                    <span className="text-xs text-gray-400">
                                                        {(submission.attachmentSize / 1024).toFixed(2)} KB
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Download size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Mentor Notes */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                                <h2 className="text-lg font-bold text-gray-900">Mentor Notes & Feedback</h2>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all text-sm text-gray-700"
                                    placeholder="Add your feedback and notes here..."
                                ></textarea>
                            </div>

                        </div>

                        {/* Sidebar (Right) */}
                        <div className="col-span-4 space-y-6">

                            {/* Assigned Mentee */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Submitted By</h3>
                                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm">
                                        {submission.mentee ? submission.mentee.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{submission.mentee || 'Unknown'}</p>
                                        <p className="text-xs text-blue-500">Student</p>
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Status</h3>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                    submission.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                                    submission.status === 'graded' ? 'bg-green-100 text-green-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                </span>
                            </div>

                            {/* Submission Date */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Submission Date</h3>
                                <p className="text-sm font-medium text-gray-700">
                                    {new Date(submission.submittedAt).toLocaleDateString('en-US', { 
                                        month: 'long', 
                                        day: 'numeric', 
                                        year: 'numeric' 
                                    })}
                                </p>
                            </div>

                            {/* Grade Section */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Grade</h3>
                                <input
                                    type="text"
                                    placeholder="Enter grade (e.g., A, 95/100)"
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                />
                            </div>

                            {/* Save Button */}
                            <button 
                                onClick={handleSave}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200"
                            >
                                Save Feedback
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TaskDetailsPage;
