'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/learner/Sidebar';
import RightSidebar from '../../components/learner/RightSidebar';
import { PanelRightOpen, PanelRightClose, FileText, Link as LinkIcon, Upload, CheckCircle } from 'lucide-react';

interface Task {
    id: string;
    title: string;
    description: string;
    assignTo: string;
    assignType: string;
    deadline: string;
    status: string;
    createdAt: string;
}

export default function LearnerTaskPage() {
    const [isProfileOpen, setIsProfileOpen] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
    const [submissionDesc, setSubmissionDesc] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/tasks');
            if (response.ok) {
                const data = await response.json();
                // Filter tasks for the current learner if needed. For now, show all.
                setTasks(data);
            }
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent, task: Task) => {
        e.preventDefault();
        
        if (!submissionDesc && !selectedFile) {
            alert('Please provide a description or attach a file.');
            return;
        }

        setIsSubmitting(true);
        try {
            // For real application, upload file to R2 here and get URL
            // const fileUrl = await uploadFile(selectedFile);
            
            const submissionData = {
                taskId: task.id,
                taskTitle: task.title,
                learnerName: 'Current Learner', // Should be dynamic based on auth
                description: submissionDesc,
                attachmentName: selectedFile ? selectedFile.name : null,
                status: 'submitted'
            };

            const response = await fetch('/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                alert('Task submitted successfully!');
                setSubmissionDesc('');
                setSelectedFile(null);
                setExpandedTaskId(null);
            } else {
                alert('Failed to submit task.');
            }
        } catch (error) {
            console.error('Error submitting task:', error);
            alert('Error submitting task.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <main className={`flex-1 ml-64 p-8 transition-all duration-300 ${isProfileOpen ? 'mr-80' : ''}`}>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Your Tasks</h1>
                        <p className="text-slate-500 text-sm">View and submit tasks assigned by your mentor.</p>
                    </div>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-100 hover:text-[#2c6684] hover:bg-blue-50 transition-colors text-sm font-medium"
                    >
                        {isProfileOpen ? (
                            <>
                                <span>Hide Profile</span>
                                <PanelRightClose size={18} />
                            </>
                        ) : (
                            <>
                                <span>View Profile</span>
                                <PanelRightOpen size={18} />
                            </>
                        )}
                    </button>
                </div>

                <div className="space-y-6">
                    {tasks.length === 0 ? (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
                            <CheckCircle className="mx-auto mb-4 opacity-20" size={48} />
                            <p>No tasks assigned yet. You're all caught up!</p>
                        </div>
                    ) : (
                        tasks.map(task => (
                            <div key={task.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div 
                                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center"
                                    onClick={() => {
                                        setExpandedTaskId(expandedTaskId === task.id ? null : task.id);
                                        setSubmissionDesc('');
                                        setSelectedFile(null);
                                    }}
                                >
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <FileText size={14} />
                                                Assigned to: {task.assignTo}
                                            </span>
                                            <span className="flex items-center gap-1 text-orange-500">
                                                Due: {new Date(task.deadline).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-blue-600 font-medium text-sm">
                                        {expandedTaskId === task.id ? 'Close' : 'View Details'}
                                    </div>
                                </div>

                                {expandedTaskId === task.id && (
                                    <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                                        <div className="mb-6">
                                            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Description</h4>
                                            <p className="text-gray-600 text-sm whitespace-pre-wrap">{task.description}</p>
                                        </div>

                                        <div className="mb-8">
                                            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Reference Material</h4>
                                            <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                                                <LinkIcon size={16} />
                                                View Reference Document
                                            </a>
                                        </div>

                                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                                            <h4 className="text-md font-bold text-gray-900 mb-4">Submit Your Work</h4>
                                            <form onSubmit={(e) => handleSubmit(e, task)} className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Submission Description</label>
                                                    <textarea
                                                        rows={4}
                                                        value={submissionDesc}
                                                        onChange={(e) => setSubmissionDesc(e.target.value)}
                                                        placeholder="Describe your approach, challenges faced, or add notes for the mentor..."
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none resize-none"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Attachment</label>
                                                    <div className="flex items-center gap-4">
                                                        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-100">
                                                            <Upload size={16} />
                                                            Upload File
                                                            <input 
                                                                type="file" 
                                                                className="hidden" 
                                                                onChange={handleFileChange}
                                                            />
                                                        </label>
                                                        {selectedFile && (
                                                            <span className="text-sm text-gray-600 flex items-center gap-2">
                                                                <FileText size={16} className="text-gray-400" />
                                                                {selectedFile.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-2">Attach any document, PDF, file or folder (zip).</p>
                                                </div>

                                                <div className="pt-4 flex justify-end">
                                                    <button 
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] text-sm flex items-center gap-2"
                                                    >
                                                        {isSubmitting ? 'Submitting...' : 'Submit Task'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </main>

            {isProfileOpen && <RightSidebar />}
        </div>
    );
}
