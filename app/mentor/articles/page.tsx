'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/mentor/Sidebar';
import { Search, ChevronDown, ChevronUp, BookOpen, Clock, Tag, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ArticlesPage = () => {
    // Mock Data
    const articles = [
        {
            id: '1',
            title: 'Effective Classroom Management',
            description: 'Strategies for maintaining a productive learning environment.',
            image: '/images/creative-arts-course.png', // Using available mock images
            category: 'Teaching',
            readTime: '5 min'
        },
        {
            id: '2',
            title: 'Integrating Technology in Education',
            description: 'Tools and methods to enhance teaching with technology.',
            image: '/images/meeting-room.png',
            category: 'EdTech',
            readTime: '8 min'
        },
        {
            id: '3',
            title: 'Understanding Student Learning Styles',
            description: 'Identifying and catering to different student learning preferences.',
            image: '/images/instructor-mark.png',
            category: 'Psychology',
            readTime: '6 min'
        },
        {
            id: '4',
            title: 'Creating Engaging Lesson Plans',
            description: 'Tips for designing lessons that captivate and educate.',
            image: '/images/creative-arts-course.png',
            category: 'Planning',
            readTime: '4 min'
        },
        {
            id: '5',
            title: 'The Future of Online Learning',
            description: 'Trends shaping the future of digital education.',
            image: '/images/meeting-room.png',
            category: 'Trends',
            readTime: '7 min'
        }
    ];

    // Double the articles for seamless looping
    const carouselArticles = [...articles, ...articles];

    const faqs = [
        {
            question: 'How do I track student performance analytics?',
            answer: 'You can access detailed student performance analytics through the "Tasks" tab. Click on a specific task to view submission grades, completion rates, and individual student progress over time.'
        },
        {
            question: 'What are effective strategies for mentorship?',
            answer: 'Effective mentorship involves regular check-ins, setting clear goals, and providing constructive feedback. Use the "Room" feature for communication and share relevant resources from the "Resources" tab to support their learning journey.'
        },
        {
            question: 'How can I schedule one-on-one sessions?',
            answer: 'You can use the "Inbox" to coordinate times with students or utilize the "Room" for ad-hoc video calls. We are also working on a dedicated calendar integration to streamline scheduling directly from your dashboard.'
        }
    ];

    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-8 bg-gray-50/50 min-h-screen overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Article Hub</h1>
                            <p className="text-gray-500">Explore articles, FAQs, and more to enhance your teaching experience.</p>
                        </div>
                        <Link href="/mentor/articles/create">
                            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                                <Plus size={18} />
                                <span>Create New Article</span>
                            </button>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for articles or topics..."
                            className="w-full pl-12 pr-6 py-3 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-gray-700"
                        />
                    </div>

                    {/* Featured Articles Carousel */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Featured Articles</h2>

                        {/* Carousel Window */}
                        <div className="relative w-full overflow-hidden mask-gradient-x">
                            {/* The scrolling track */}
                            <div className="flex gap-6 w-max animate-scroll hover:[animation-play-state:paused]">
                                {carouselArticles.map((article, index) => (
                                    <div
                                        key={`${article.id}-${index}`}
                                        className="w-80 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex-shrink-0 overflow-hidden cursor-pointer group"
                                    >
                                        <div className="h-40 relative overflow-hidden bg-gray-100">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">{article.category}</span>
                                                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                                    <Clock size={10} />
                                                    {article.readTime}
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{article.title}</h3>
                                            <p className="text-xs text-gray-500 line-clamp-2">{article.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="max-w-4xl">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-semibold text-gray-800">{faq.question}</span>
                                        {openFaqIndex === index ? (
                                            <ChevronUp className="text-gray-400" size={20} />
                                        ) : (
                                            <ChevronDown className="text-gray-400" size={20} />
                                        )}
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
};

export default ArticlesPage;
