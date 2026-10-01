'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/mentor/Sidebar';
import { Search, Plus, Users, MessageSquare, ArrowRight, Globe, Lock, ThumbsUp, Share2, MoreHorizontal, Image as ImageIcon, Send, Clock, Briefcase, FileText, Smile, Trash2, Edit2, X } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

// Types
interface Comment {
    id: string;
    author: string;
    avatar: string;
    text: string;
    timestamp: string;
}

interface Post {
    id: string;
    author: string;
    authorRole: string;
    avatar: string;
    content: string;
    image?: string;
    likes: number;
    commentsSize: number;
    shares: number;
    comments: Comment[];
    timestamp: string;
    isLiked?: boolean;
}

const CommunityPage = () => {
    // State
    const [activeTab, setActiveTab] = useState<'feed' | 'groups'>('feed');
    const [newPostContent, setNewPostContent] = useState('');
    const [isInputExpanded, setIsInputExpanded] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [attachmentUrl, setAttachmentUrl] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [editPostContent, setEditPostContent] = useState('');
    const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
    const [showComments, setShowComments] = useState<Record<string, boolean>>({});

    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupDesc, setNewGroupDesc] = useState('');

    // Groups Data (Finance/Business Themed)
    const [posts, setPosts] = useState<Post[]>([
        {
            id: '1',
            author: 'Sarah Jenkins',
            authorRole: 'Investment Analyst @ 42 Capital',
            avatar: '/images/instructor-mark.png',
            content: 'Market volatility is high this week. Our latest analysis suggests a shift towards defensive assets. Here is a breakdown of the sector performance for Q3. 📊 #Finance #Investing #MarketUpdate',
            image: '/images/creative-arts-course.png',
            likes: 124,
            commentsSize: 45,
            shares: 12,
            comments: [
                { id: 'c1', author: 'Mark Doe', avatar: '/images/instructor-mark.png', text: 'Great insights Sarah! Agreed on the defensive shift.', timestamp: '2h ago' }
            ],
            timestamp: '2h',
            isLiked: false
        },
        {
            id: '2',
            author: 'David Chen',
            authorRole: 'Founder & CEO @ FinTech Solutions',
            avatar: '/images/meeting-room.png',
            content: 'Excited to announce our Series A funding round! We are looking for talented engineers and product managers to join our mission of democratizing finance. 🚀 #FinTech #Hiring #StartupLife',
            image: '/images/meeting-room.png',
            likes: 856,
            commentsSize: 120,
            shares: 204,
            comments: [],
            timestamp: '5h',
            isLiked: true
        }
    ]);

    const [myCommunities, setMyCommunities] = useState([
        { id: '1', title: 'Global Markets Study', members: 1250, description: 'Daily analysis and discussions on global market trends.', color: 'bg-blue-50', category: 'Analysis' },
        { id: '2', title: 'FinTech Founders Network', members: 420, description: 'A community for founders building the future of finance.', color: 'bg-green-50', category: 'Networking' },
        { id: '3', title: 'Investment Banking Prep', members: 890, description: 'Resources and networking for IB aspirants.', color: 'bg-gray-50', category: 'Career' }
    ]);

    const [discoverCommunities, setDiscoverCommunities] = useState([
        { id: '101', title: 'Crypto Assets & Blockchain', members: 3500, description: 'Deep dive into blockchain tech and crypto markets.', open: true, category: 'Tech' },
        { id: '102', title: 'Private Equity Circle', members: 150, description: 'Exclusive group for PE professionals.', open: false, category: 'Exclusive' },
        { id: '103', title: 'Algo Trading Strategies', members: 2400, description: 'Discussing algorithms and automated trading systems.', open: true, category: 'Trading' },
        { id: '104', title: 'Sustainable Finance', members: 670, description: 'ESG investing and green bonds discussion.', open: true, category: 'Impact' }
    ]);

    // Handlers
    const handlePostSubmit = () => {
        if (!newPostContent.trim() && !attachmentUrl) return;
        const newPost: Post = {
            id: Date.now().toString(),
            author: 'Aryan', // Current User
            authorRole: 'Mentor',
            avatar: '/images/instructor-mark.png',
            content: newPostContent,
            likes: 0,
            comments: [],
            commentsSize: 0,
            shares: 0,
            timestamp: 'Just now',
            isLiked: false,
            image: attachmentUrl
        };
        setPosts([newPost, ...posts]);
        setNewPostContent('');
        setAttachmentUrl('');
        setIsInputExpanded(false);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAttachmentUrl(URL.createObjectURL(file));
            setIsInputExpanded(true);
        }
    };

    const handleDeletePost = (id: string) => {
        setPosts(posts.filter(p => p.id !== id));
    };

    const handleEditPostSubmit = (id: string) => {
        setPosts(posts.map(p => p.id === id ? { ...p, content: editPostContent } : p));
        setEditingPostId(null);
    };

    const handleCommentSubmit = (postId: string) => {
        const text = commentInputs[postId];
        if (!text?.trim()) return;

        setPosts(posts.map(post => {
            if (post.id === postId) {
                const newComment: Comment = {
                    id: Date.now().toString(),
                    author: 'Aryan',
                    avatar: '/images/instructor-mark.png',
                    text: text,
                    timestamp: 'Just now'
                };
                return {
                    ...post,
                    comments: [...post.comments, newComment],
                    commentsSize: post.commentsSize + 1
                };
            }
            return post;
        }));
        setCommentInputs({ ...commentInputs, [postId]: '' });
    };

    const handleCreateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGroupName.trim() || !newGroupDesc.trim()) return;

        const newCommunity = {
            id: Date.now().toString(),
            title: newGroupName,
            members: 1,
            description: newGroupDesc,
            color: 'bg-blue-50',
            category: 'Custom'
        };

        setMyCommunities([newCommunity, ...myCommunities]);
        setIsCreateGroupModalOpen(false);
        setNewGroupName('');
        setNewGroupDesc('');
    };

    const toggleLike = (postId: string) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    isLiked: !post.isLiked
                };
            }
            return post;
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans" >
            {/* Left Sidebar */}
            < div className="fixed left-0 top-0 h-full z-10 w-64 bg-white border-r border-gray-200 hidden md:block" >
                <Sidebar />
            </div >

            {/* Main Content Area */}
            < main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 w-full" >

                {/* Header Section */}
                < div className="mb-8" >
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Community Hub</h1>
                    <p className="text-gray-500 mt-2 text-base font-medium">Connect, share achievements, and grow with your peers.</p>
                </div >

                {/* Tabs */}
                < div className="flex items-center gap-8 border-b border-gray-200 mb-8" >
                    <button
                        onClick={() => setActiveTab('feed')}
                        className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'feed' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Feed
                        {activeTab === 'feed' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-t-full"></span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('groups')}
                        className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'groups' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Your Communities
                        {activeTab === 'groups' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-t-full"></span>}
                    </button>
                </div >

                {activeTab === 'feed' ? (
                    <div className="max-w-4xl mx-auto">
                        {/* Create Post Widget Professional */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                            <div className="flex gap-4 mb-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0 bg-gray-100 border border-gray-200">
                                    <Image src="/images/instructor-mark.png" alt="User" layout="fill" objectFit="cover" />
                                </div>
                                <div className="flex-1">
                                    <button
                                        onClick={() => setIsInputExpanded(true)}
                                        className="w-full text-left bg-white border border-gray-300 hover:bg-gray-50 rounded-md px-4 py-3 text-sm text-gray-500 font-medium transition-colors"
                                    >
                                        Start a post
                                    </button>
                                </div>
                            </div>

                            {/* Input Area (Collapsed by default in real app, but here we show if active or just the buttons) */}
                            {isInputExpanded || newPostContent || attachmentUrl ? (
                                <div className="mb-3 px-2">
                                    <textarea
                                        id="post-input"
                                        autoFocus
                                        value={newPostContent}
                                        onChange={(e) => setNewPostContent(e.target.value)}
                                        placeholder="Share market insights, news, or ask for advice..."
                                        className="w-full bg-transparent p-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none resize-none min-h-[80px]"
                                    />
                                    {attachmentUrl && (
                                        <div className="relative mt-2 inline-block">
                                            <Image src={attachmentUrl} alt="Attached" width={200} height={150} className="rounded-lg object-cover" />
                                            <button
                                                onClick={() => setAttachmentUrl('')}
                                                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : null}

                            <div className="flex items-center justify-between pt-2 px-2 relative">
                                <div className="flex gap-4">
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors">
                                        <ImageIcon size={20} className="text-blue-500" />
                                        <span className="text-sm font-semibold text-gray-600">Media</span>
                                    </button>
                                    <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors">
                                        <Smile size={20} className="text-yellow-500" />
                                        <span className="text-sm font-semibold text-gray-600">Emoji</span>
                                    </button>

                                    {showEmojiPicker && (
                                        <div className="absolute top-12 left-0 bg-white border border-gray-100 shadow-xl rounded-xl p-3 flex gap-2 w-48 flex-wrap z-50">
                                            {['😀', '😂', '❤️', '👍', '🔥', '🎉', '🙌', '✨'].map(emoji => (
                                                <button
                                                    key={emoji}
                                                    onClick={() => { setNewPostContent(prev => prev + emoji); setShowEmojiPicker(false); setIsInputExpanded(true); }}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md text-xl"
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {(newPostContent || attachmentUrl) && (
                                    <button
                                        onClick={handlePostSubmit}
                                        className="px-6 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-bold transition-all"
                                    >
                                        Post
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Feed Stream */}
                        <div className="space-y-4">
                            {posts.map(post => (
                                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                    {/* Post Header */}
                                    <div className="flex items-start justify-between p-4 pb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-100 border border-gray-100">
                                                <Image src={post.avatar} alt={post.author} layout="fill" objectFit="cover" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-900 leading-tight hover:text-blue-600 cursor-pointer hover:underline mb-0.5">{post.author}</h3>
                                                <p className="text-xs text-gray-500 line-clamp-1">{post.authorRole}</p>
                                                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                                                    <span>{post.timestamp}</span>
                                                    <span>•</span>
                                                    <Globe size={10} />
                                                </div>
                                            </div>
                                        </div>
                                        {post.author === 'Aryan' ? (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => { setEditingPostId(post.id); setEditPostContent(post.content); }}
                                                    className="text-gray-400 hover:text-blue-600 p-1.5 rounded-full hover:bg-blue-50 transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="text-gray-400 hover:text-red-600 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="px-4 py-2">
                                        {editingPostId === post.id ? (
                                            <div className="flex flex-col gap-2">
                                                <textarea
                                                    value={editPostContent}
                                                    onChange={(e) => setEditPostContent(e.target.value)}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-sm text-gray-700 focus:outline-none focus:border-blue-300 min-h-[80px]"
                                                />
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => setEditingPostId(null)} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
                                                    <button onClick={() => handleEditPostSubmit(post.id)} className="text-xs bg-blue-600 text-white px-3 py-1 rounded">Save</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                                                {post.content}
                                            </p>
                                        )}
                                    </div>

                                    {/* Post Image (Professional Style: Contained, Rounded) */}
                                    {post.image && (
                                        <div className="px-4 py-2">
                                            <div className="w-full relative bg-gray-50 rounded-md overflow-hidden border border-gray-100">
                                                <Image
                                                    src={post.image}
                                                    alt="Post content"
                                                    width={600}
                                                    height={400}
                                                    className="w-full h-auto object-cover max-h-[500px]"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Stats Bar */}
                                    <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-b border-gray-100 mx-4 mt-2">
                                        <div className="flex items-center gap-1">
                                            <div className="flex -space-x-1">
                                                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white">
                                                    <ThumbsUp size={8} fill="white" />
                                                </div>
                                                {/* <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[8px] text-white">
                                                    <Heart size={8} fill="white" />
                                                </div> */}
                                            </div>
                                            <span className="ml-1 hover:text-blue-600 hover:underline cursor-pointer">{post.likes}</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="hover:text-blue-600 hover:underline cursor-pointer">{post.commentsSize} comments</span>
                                            <span className="hover:text-blue-600 hover:underline cursor-pointer">{post.shares} reposts</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="px-2 py-1 flex items-center justify-between mx-2">
                                        <button
                                            onClick={() => toggleLike(post.id)}
                                            className={`flex items-center justify-center gap-2 flex-1 hover:bg-gray-100 py-3 rounded-md transition-colors ${post.isLiked ? 'text-blue-600' : 'text-gray-600'}`}
                                        >
                                            <ThumbsUp size={18} className={post.isLiked ? 'fill-blue-600' : ''} />
                                            <span className="text-sm font-semibold">Like</span>
                                        </button>
                                        <button
                                            onClick={() => setShowComments({ ...showComments, [post.id]: !showComments[post.id] })}
                                            className="flex items-center justify-center gap-2 flex-1 hover:bg-gray-100 py-3 rounded-md text-gray-600 transition-colors"
                                        >
                                            <MessageSquare size={18} />
                                            <span className="text-sm font-semibold">Comment</span>
                                        </button>
                                        <button className="flex items-center justify-center gap-2 flex-1 hover:bg-gray-100 py-3 rounded-md text-gray-600 transition-colors">
                                            <Share2 size={18} />
                                            <span className="text-sm font-semibold">Share</span>
                                        </button>
                                        <button className="flex items-center justify-center gap-2 flex-1 hover:bg-gray-100 py-3 rounded-md text-gray-600 transition-colors">
                                            <Send size={18} />
                                            <span className="text-sm font-semibold">Send</span>
                                        </button>
                                    </div>

                                    {/* Comments Section */}
                                    {showComments[post.id] && (
                                        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                                            <div className="flex gap-3 mb-4">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
                                                    <Image src="/images/instructor-mark.png" alt="User" layout="fill" objectFit="cover" />
                                                </div>
                                                <div className="flex-1 flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={commentInputs[post.id] || ''}
                                                        onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                                                        onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                                                        placeholder="Add a comment..."
                                                        className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                                                    />
                                                    <button onClick={() => handleCommentSubmit(post.id)} className="text-blue-600 hover:text-blue-800 font-semibold text-sm px-2">Post</button>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {post.comments.map(comment => (
                                                    <div key={comment.id} className="flex gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
                                                            <Image src={comment.avatar} alt={comment.author} layout="fill" objectFit="cover" />
                                                        </div>
                                                        <div className="bg-gray-100 rounded-xl px-3 py-2 text-sm flex-1">
                                                            <div className="font-bold text-gray-900 mb-0.5">{comment.author}</div>
                                                            <div className="text-gray-700">{comment.text}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-300 slide-in-from-bottom-4 max-w-5xl mx-auto">
                        {/* Search Bar for Communities */}
                        <div className="relative mb-8 max-w-2xl">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Find communities..."
                                className="w-full pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-gray-700 transition-all font-medium"
                            />
                        </div>

                        {/* My Communities Section (Professional) */}
                        <section className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Briefcase size={20} className="text-gray-700" />
                                    Professional Groups
                                </h2>
                                <button
                                    onClick={() => setIsCreateGroupModalOpen(true)}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm"
                                >
                                    <Plus size={16} /> Create Group
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myCommunities.map((community, index) => (
                                    <div key={community.id} className="group bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer relative">

                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500">
                                                <Users size={20} />
                                            </div>
                                            <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-sm tracking-wider">{community.category}</span>
                                        </div>

                                        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">{community.title}</h3>
                                        <p className="text-xs text-gray-500 mb-4 h-8 line-clamp-2">{community.description}</p>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <span className="text-xs text-gray-500 font-medium">{community.members.toLocaleString()} members</span>
                                            <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Discover Section */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Globe size={20} className="text-green-500" />
                                    Discover More
                                </h2>
                                <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {discoverCommunities.map((community, index) => (
                                    <div key={community.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-300 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl relative overflow-hidden bg-gray-100">
                                                <Image src={index % 2 === 0 ? "/images/meeting-room.png" : "/images/creative-arts-course.png"} alt="icon" layout="fill" objectFit="cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">{community.title}</h4>
                                                <p className="text-xs text-gray-500 line-clamp-1">{community.description}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><Users size={10} /> {community.members} members</span>
                                                    <span className="text-[10px] text-gray-400 flex items-center gap-1">{community.open ? <Globe size={10} /> : <Lock size={10} />} {community.open ? 'Public' : 'Private'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="px-5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-900 text-xs font-bold transition-colors">
                                            Join
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </main >

            {/* Create Group Modal */}
            {isCreateGroupModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Create a New Group</h2>
                            <button onClick={() => setIsCreateGroupModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateGroup} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Group Name</label>
                                <input
                                    autoFocus
                                    type="text"
                                    value={newGroupName}
                                    onChange={e => setNewGroupName(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                                    placeholder="e.g. Advanced AI Study Group"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={newGroupDesc}
                                    onChange={e => setNewGroupDesc(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none min-h-[100px] text-sm"
                                    placeholder="What is this group about?"
                                />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsCreateGroupModalOpen(false)} className="px-5 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors">Create Group</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div >
    );
};

export default CommunityPage;
