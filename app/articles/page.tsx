import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { getArticlesFromR2 } from '@/lib/r2';
import { Article } from '@/app/data/articles';

export default async function ArticlesPage() {
    const articles = await getArticlesFromR2();
    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="container mx-auto px-4 md:px-8 pt-12">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Article Hub</h1>
                    <p className="text-gray-600 text-lg">
                        Explore articles, FAQs, and more to enhance your teaching experience.
                    </p>
                </div>

                {/* Search Section */}
                <div className="mb-12">
                    <div className="relative w-full max-w-3xl bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-11 pr-4 py-4 bg-transparent rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            placeholder="Search for articles or topics"
                        />
                    </div>
                </div>

                {/* Featured Articles Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article: Article) => (
                            <Link href={`/articles/${article.id}`} key={article.id} className="group cursor-pointer block">
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-100">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                    {article.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
