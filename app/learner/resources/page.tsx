'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/learner/Sidebar';
import {
    Folder,
    FileText,
    ArrowLeft,
    Video,
    Music,
    Search,
    MoreVertical,
    Download,
    Clock,
    File,
    ChevronRight,
    LayoutGrid,
    List as ListIcon
} from 'lucide-react';

// Types
type ResourceType = 'folder' | 'document' | 'video' | 'audio';

type ResourceItem = {
    id: string;
    title: string;
    type: ResourceType;
    items?: ResourceItem[]; // For folders
    size?: string;
    updated?: string;
    author?: string;
};

const ResourcesPage = () => {
    // State for Data
    const [courseMaterials, setCourseMaterials] = useState<ResourceItem[]>([]);
    const [studyGuides, setStudyGuides] = useState<ResourceItem[]>([]);
    const [lectureNotes, setLectureNotes] = useState<ResourceItem[]>([]);

    useEffect(() => {
        import('@/app/actions/data').then(({ getResourcesData }) => {
            getResourcesData().then(data => {
                if (data) {
                    if (data.courseMaterials) setCourseMaterials(data.courseMaterials);
                    if (data.studyGuides) setStudyGuides(data.studyGuides);
                    if (data.lectureNotes) setLectureNotes(data.lectureNotes);
                }
            });
        });
    }, []);

    // State
    const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const activeFolder = courseMaterials.find(c => c.id === activeFolderId);

    // Helpers
    const getIcon = (type: ResourceType) => {
        switch (type) {
            case 'folder': return <Folder className="text-blue-500 fill-blue-50" size={20} />;
            case 'video': return <Video className="text-red-500" size={20} />;
            case 'audio': return <Music className="text-purple-500" size={20} />;
            default: return <FileText className="text-gray-500" size={20} />;
        }
    };

    const renderGridItem = (item: ResourceItem, onClick?: () => void) => (
        <div
            key={item.id}
            onClick={onClick}
            className="group bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer flex flex-col justify-between h-32"
        >
            <div className="flex justify-between items-start">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    {getIcon(item.type)}
                </div>
                <button className="text-gray-300 hover:text-gray-600">
                    <MoreVertical size={16} />
                </button>
            </div>
            <div>
                <h4 className="font-semibold text-gray-800 text-sm truncate mb-1">{item.title}</h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span>{item.size || '0 KB'}</span>
                    <span>•</span>
                    <span>{item.updated}</span>
                </div>
            </div>
        </div>
    );

    const renderListItem = (item: ResourceItem, onClick?: () => void) => (
        <div
            key={item.id}
            onClick={onClick}
            className="group flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-b border-gray-50 last:border-0"
        >
            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50">
                {getIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6 font-medium text-gray-800 text-sm truncate">{item.title}</div>
                <div className="col-span-2 text-xs text-gray-500">{item.author || '-'}</div>
                <div className="col-span-2 text-xs text-gray-500">{item.updated}</div>
                <div className="col-span-2 text-xs text-gray-500 text-right">{item.size || '-'}</div>
            </div>
            <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <Download size={16} />
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-white flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-8 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Header */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search files..."
                                        className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-all"
                                    />
                                </div>
                                <div className="h-4 w-px bg-gray-200 mx-2"></div>
                                <div className="flex bg-gray-100 p-1 rounded-lg">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <LayoutGrid size={16} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <ListIcon size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span
                                onClick={() => setActiveFolderId(null)}
                                className={`cursor-pointer hover:text-blue-600 transition-colors ${!activeFolder ? 'font-semibold text-gray-900' : ''}`}
                            >
                                Documents
                            </span>
                            {activeFolder && (
                                <>
                                    <ChevronRight size={14} />
                                    <span className="font-semibold text-gray-900">{activeFolder.title}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[70vh] p-6">

                        {activeFolder ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <button
                                        onClick={() => setActiveFolderId(null)}
                                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                    <h2 className="text-lg font-bold text-gray-900">{activeFolder.title}</h2>
                                </div>

                                {activeFolder.items && activeFolder.items.length > 0 ? (
                                    viewMode === 'grid' ? (
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                            {activeFolder.items.map(item => renderGridItem(item))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            <div className="grid grid-cols-12 gap-4 px-3 py-2 text-xs font-semibold text-gray-400 border-b border-gray-100 mb-2">
                                                <div className="col-span-6 pl-12">Name</div>
                                                <div className="col-span-2">Author</div>
                                                <div className="col-span-2">Date Modified</div>
                                                <div className="col-span-2 text-right">Size</div>
                                            </div>
                                            {activeFolder.items.map(item => renderListItem(item))}
                                        </div>
                                    )
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                                        <Folder className="w-16 h-16 mb-4 text-gray-200" />
                                        <p>This folder is empty</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                                {/* Section */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Folders</h3>
                                    {viewMode === 'grid' ? (
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                            {courseMaterials.map(item => renderGridItem(item, () => setActiveFolderId(item.id)))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            <div className="grid grid-cols-12 gap-4 px-3 py-2 text-xs font-semibold text-gray-400 border-b border-gray-100 mb-2">
                                                <div className="col-span-6 pl-12">Name</div>
                                                <div className="col-span-2"></div>
                                                <div className="col-span-2">Last Modified</div>
                                                <div className="col-span-2 text-right">Size</div>
                                            </div>
                                            {courseMaterials.map(item => renderListItem(item, () => setActiveFolderId(item.id)))}
                                        </div>
                                    )}
                                </div>

                                {/* Recent Files Section */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Recent Files</h3>
                                    {viewMode === 'grid' ? (
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                            {[...studyGuides, ...lectureNotes].slice(0, 5).map(item => renderGridItem(item))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            {[...studyGuides, ...lectureNotes].slice(0, 5).map(item => renderListItem(item))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResourcesPage;
