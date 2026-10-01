'use client';

import Image from "next/image";
import Link from "next/link";
import CloudAnimation from "../../components/ui/CloudAnimation";

import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#c6c9df]">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/signup-bg-pattern.png')] opacity-10"></div>

            {/* Custom Admin Navbar */}
            <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-4 bg-transparent">
                <Link href="/" className="text-[1.1rem] font-semibold text-[#0056b3]">
                    Powerpreneurs
                </Link>
                <div className="flex gap-6">
                    <Link href="/support" className="text-gray-600 hover:text-[#0056b3] transition-colors text-sm font-medium">
                        Support
                    </Link>
                    <Link href="/contact" className="text-gray-600 hover:text-[#0056b3] transition-colors text-sm font-medium">
                        Contact
                    </Link>
                </div>
            </nav>

            <CloudAnimation />

            {/* Centered Form */}
            <div className="relative z-20 w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 mx-4">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
                </div>

                <form
                    className="space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        router.push('/admin');
                    }}
                >
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 bg-white/50"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 bg-white/50"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#367c9f] hover:bg-[#4a9bc7] text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-500/30"
                    >
                        Log In
                    </button>
                </form>


            </div>
        </div>
    );
}
