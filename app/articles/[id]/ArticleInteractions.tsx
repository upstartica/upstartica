"use client";

import React, { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export default function ArticleInteractions({
    initialLikes,
    initialComments,
}: {
    initialLikes: number;
    initialComments: number;
}) {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikes);

    const handleLike = () => {
        setLiked(!liked);
        setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    return (
        <div className="mt-12 py-6 border-t border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        liked ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                    <span className="font-medium">{likesCount} Likes</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{initialComments} Comments</span>
                </button>
            </div>
            <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
            >
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share</span>
            </button>
        </div>
    );
}
