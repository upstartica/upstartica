"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Edit2, Trash2, X, Check } from "lucide-react";
import { CommentData } from "@/app/data/coursesData";

export default function CourseComments({
    initialComments,
    courseId,
}: {
    initialComments: CommentData[];
    courseId: number;
}) {
    const [comments, setComments] = useState<CommentData[]>(initialComments || []);
    const [newComment, setNewComment] = useState("");
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editText, setEditText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdateComments = async (updatedComments: CommentData[]) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/courses/${courseId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comments: updatedComments }),
            });
            if (!res.ok) throw new Error("Failed to update comments");
            setComments(updatedComments);
        } catch (error) {
            console.error("Error updating comments:", error);
            alert("Failed to update comments.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddComment = () => {
        if (!newComment.trim() || !newName.trim()) return;
        const newC: CommentData = {
            id: Date.now().toString(),
            name: newName,
            time: "Just now",
            text: newComment,
            role: "Student",
            avatar: "/images/instructor-mark.png",
        };
        const updated = [newC, ...comments];
        handleUpdateComments(updated);
        setNewComment("");
        setNewName("");
    };

    const handleDeleteComment = (id: string) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;
        const updated = comments.filter((c) => c.id !== id);
        handleUpdateComments(updated);
    };

    const startEditing = (comment: CommentData) => {
        setEditingId(comment.id);
        setEditName(comment.name);
        setEditText(comment.text);
    };

    const saveEdit = () => {
        if (!editingId || !editText.trim() || !editName.trim()) return;
        const updated = comments.map((c) =>
            c.id === editingId ? { ...c, name: editName, text: editText } : c
        );
        handleUpdateComments(updated);
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Comments</h3>

            {/* Add Comment Form */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="text-md font-bold text-gray-800 mb-3">Add a Comment</h4>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff9b50]"
                        disabled={loading}
                    />
                    <textarea
                        placeholder="Write your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff9b50] resize-none"
                        rows={3}
                        disabled={loading}
                    ></textarea>
                    <button
                        onClick={handleAddComment}
                        disabled={loading || !newComment.trim() || !newName.trim()}
                        className="bg-[#367c9f] text-white px-4 py-2 rounded-md hover:bg-[#2c6684] disabled:opacity-50 transition-colors"
                    >
                        {loading ? "Posting..." : "Post Comment"}
                    </button>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.length === 0 ? (
                    <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="bg-[#ff9b50] p-4 rounded-xl relative group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden relative flex-shrink-0">
                                    <Image
                                        src={comment.avatar || `/images/instructor-mark.png`}
                                        alt={comment.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    {editingId === comment.id ? (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="w-full px-2 py-1 text-sm border rounded"
                                            />
                                            <textarea
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                className="w-full px-2 py-1 text-sm border rounded resize-none"
                                                rows={2}
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={saveEdit}
                                                    disabled={loading}
                                                    className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    disabled={loading}
                                                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-gray-900 truncate pr-2">
                                                    {comment.name}
                                                </h4>
                                                <span className="text-xs text-gray-800 whitespace-nowrap">
                                                    {comment.time}
                                                </span>
                                            </div>
                                            <p className="text-gray-900 text-sm break-words">
                                                {comment.text}
                                            </p>
                                            {comment.role && (
                                                <p className="text-xs text-gray-800 mt-1 italic">
                                                    {comment.role}
                                                </p>
                                            )}
                                            {/* Action Buttons */}
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                <button
                                                    onClick={() => startEditing(comment)}
                                                    className="p-1.5 bg-white/50 hover:bg-white/80 rounded-full text-gray-700 transition"
                                                    title="Edit Comment"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition"
                                                    title="Delete Comment"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
