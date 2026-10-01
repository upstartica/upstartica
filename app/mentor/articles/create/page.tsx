'use client';

import React, { useState } from 'react';
import Sidebar from '../../../components/mentor/Sidebar';
import { ArrowLeft, Upload, FileText, Check, X, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CreateArticlePage = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mock Categories
    const categories = ['Teaching', 'EdTech', 'Psychology', 'Planning', 'Trends', 'Career Advice'];

    const handlePublish = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push('/mentor/articles');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white flex font-sans">
            <Sidebar />

            <main className="flex-1 ml-64 p-8 bg-gray-50/50 min-h-screen">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/mentor/articles" className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Create New Article</h1>
                            <p className="text-gray-500 text-sm">Share your knowledge and insights with the community.</p>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">

                        {/* Title Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">Article Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a descriptive title..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none font-medium text-gray-900"
                            />
                        </div>

                        {/* Category & Cover Image Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">Category</label>
                                <div className="relative">
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none appearance-none font-medium text-gray-700 cursor-pointer"
                                    >
                                        <option value="" disabled>Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <FileText size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">Cover Image</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-center gap-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group h-[52px]">
                                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-600 transition-colors">
                                        <ImageIcon size={20} />
                                        <span className="text-sm font-medium">Upload Cover Image</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Short Description */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">Short Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Brief summary of the article..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none min-h-[100px] resize-none font-medium text-gray-900"
                            />
                            <p className="text-xs text-gray-400 text-right">{description.length}/200</p>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">Content</label>
                            <div className="relative">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your article content here..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none min-h-[400px] font-medium text-gray-900"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
                            <Link
                                href="/mentor/articles"
                                className="px-6 py-2.5 rounded-lg text-gray-500 font-bold hover:bg-gray-100 transition-colors text-sm"
                            >
                                Cancel
                            </Link>
                            <button
                                onClick={handlePublish}
                                disabled={isLoading || !title}
                                className={`px-8 py-2.5 rounded-lg text-white font-bold transition-all text-sm flex items-center gap-2 ${isLoading || !title ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Publishing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Check size={18} />
                                        <span>Publish Article</span>
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateArticlePage;
