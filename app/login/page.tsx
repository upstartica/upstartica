'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import CloudAnimation from "../components/ui/CloudAnimation";
import { handleGoogleSignIn, handleLinkedInSignIn, handleCredentialsSignIn } from "../actions/auth";


export default function LoginPage() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = await handleCredentialsSignIn(formData);
            if (res?.error) {
                setError(res.error);
            } else {
                window.location.href = res?.redirectTo || '/learner';
            }
        });
    };

    return (
        <div className="flex min-h-screen w-full bg-[#c6c9df]">
            {/* Left Side - Form */}
            <div className="flex w-full lg:w-[35%] flex-col justify-center px-8 md:px-12 lg:px-16 py-12 bg-white lg:rounded-r-[50px]">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Log In</h1>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-[#367c9f] hover:bg-[#4a9bc7] disabled:bg-blue-300 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-500/30 block text-center"
                    >
                        {isPending ? 'Logging In...' : 'Log In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Don&apos;t Have An Account?{" "}
                        <Link href="/signup" className="text-gray-900 font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>

                <div className="mt-6">
                    <Link href="/mentor-login">
                        <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-gray-700 font-medium">
                            Mentor Login
                        </button>
                    </Link>
                </div>

                <div className="my-8 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-sm">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => handleGoogleSignIn('learner')}
                        className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Log In With Google
                    </button>
                    <button
                        onClick={() => handleLinkedInSignIn('learner')}
                        className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                        <svg className="w-5 h-5 mr-2" fill="#0077b5" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        Log In With Linkedin
                    </button>
                </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:w-[65%] lg:flex items-center justify-center bg-[#c6c9df] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/signup-bg-pattern.png')] opacity-10"></div>
                <CloudAnimation />
                <div className="relative z-10 w-3/4 h-3/4 flex items-center justify-center">
                    <Image
                        src="/images/auth-illustration.png"
                        alt="Login Illustration"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
