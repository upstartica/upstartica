import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { findArticleById } from '@/lib/r2';
import ArticleInteractions from './ArticleInteractions';

export default async function ArticleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const articleId = parseInt(id, 10);
    const article = await findArticleById(articleId);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero Image */}
            <div className="relative w-full h-[400px] md:h-[500px]">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 container mx-auto px-4 md:px-8 flex flex-col justify-end pb-12 text-white">
                    <Link href="/articles" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors w-fit">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Articles
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight max-w-4xl">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-white/90">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="lg:w-2/3">
                    <div
                        className="prose prose-lg max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Interaction Bar */}
                    <ArticleInteractions initialLikes={article.likes} initialComments={article.comments} />

                    {/* Comments Section */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments ({article.comments})</h3>
                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <textarea
                                placeholder="Leave a comment..."
                                className="w-full bg-white border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                            ></textarea>
                            <div className="flex justify-end mt-4">
                                <button className="bg-[#367c9f] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2c6684] transition-colors">
                                    Post Comment
                                </button>
                            </div>
                        </div>

                        {/* Dummy Comments */}
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                                        alt="Alice Cooper"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-gray-900">Alice Cooper</span>
                                        <span className="text-sm text-gray-500">2 days ago</span>
                                    </div>
                                    <p className="text-gray-700">This was such an insightful article! I've been struggling with classroom management, and these tips are exactly what I needed.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
                                        alt="John Smith"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-gray-900">John Smith</span>
                                        <span className="text-sm text-gray-500">5 days ago</span>
                                    </div>
                                    <p className="text-gray-700">Great read. I especially liked the section on positive reinforcement. It really works wonders.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar (Optional - Related Articles or Ads) */}
                <div className="lg:w-1/3 space-y-8">
                    <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-4">Related Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Teaching', 'Education', 'Classroom', 'Students', 'Learning', 'Technology'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-500 hover:text-blue-500 cursor-pointer transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
