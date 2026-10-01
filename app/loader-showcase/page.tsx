'use client';


export default function LoaderShowcase() {
    return (
        <div className="min-h-screen bg-gray-50 p-8 pt-24">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Loader Design Options</h1>
                <p className="text-gray-600 mb-12">Please choose the style you prefer for your website.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Option 1: The Modern Spinner (Current) */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
                        <h3 className="mb-8 text-sm font-semibold text-gray-400 uppercase tracking-wider">Option 1: Modern Ring</h3>
                        <div className="relative flex items-center justify-center w-24 h-24">
                            <div className="absolute w-full h-full border-4 border-blue-100 rounded-full animate-ping opacity-75"></div>
                            <div className="absolute w-20 h-20 border-4 border-t-blue-600 border-r-blue-400 border-b-blue-200 border-l-transparent rounded-full animate-spin"></div>
                            <div className="absolute w-12 h-12 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">P</span>
                            </div>
                        </div>
                        <p className="mt-8 text-blue-600 font-medium animate-pulse">Loading...</p>
                    </div>

                    {/* Option 2: Minimalist Pulse */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
                        <h3 className="mb-8 text-sm font-semibold text-gray-400 uppercase tracking-wider">Option 2: Minimalist Pulse</h3>
                        <div className="relative flex items-center justify-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full animate-ping opacity-20 absolute"></div>
                            <div className="w-16 h-16 bg-blue-600 rounded-full animate-pulse opacity-40 absolute delay-75"></div>
                            <div className="w-8 h-8 bg-blue-600 rounded-full shadow-lg shadow-blue-500/50 relative z-10"></div>
                        </div>
                        <p className="mt-8 text-gray-400 font-medium tracking-[0.2em] text-sm">POWERPRENEURS</p>
                    </div>

                    {/* Option 3: Bouncing Morph */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
                        <h3 className="mb-8 text-sm font-semibold text-gray-400 uppercase tracking-wider">Option 3: Kinetic Dots</h3>
                        <div className="flex space-x-3">
                            <div className="w-4 h-4 bg-blue-600 rounded-full animate-[bounce_1s_infinite_-0.3s]"></div>
                            <div className="w-4 h-4 bg-blue-400 rounded-full animate-[bounce_1s_infinite_-0.15s]"></div>
                            <div className="w-4 h-4 bg-blue-200 rounded-full animate-[bounce_1s_infinite]"></div>
                        </div>
                        <p className="mt-8 text-gray-500 font-medium">Please wait a moment</p>
                    </div>

                    {/* Option 4: Gradient Progress */}
                    <div className="bg-[#0f172a] p-8 rounded-2xl shadow-sm border border-gray-800 flex flex-col items-center justify-center min-h-[300px]">
                        <h3 className="mb-8 text-sm font-semibold text-gray-500 uppercase tracking-wider">Option 4: Dark Mode Future</h3>
                        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-[shimmer_2s_infinite] -translate-x-full transition-transform" style={{
                                animation: 'slideRight 1.5s ease-in-out infinite'
                            }}></div>
                        </div>
                        <style jsx>{`
                @keyframes slideRight {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
                        <p className="mt-4 text-cyan-400 text-xs font-mono tracking-widest">INITIALIZING...</p>
                    </div>

                    {/* Option 5: Hexagon Tech */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
                        <h3 className="mb-8 text-sm font-semibold text-gray-400 uppercase tracking-wider">Option 5: Tech Hexagon</h3>
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 border-4 border-blue-100 transform rotate-45 rounded-xl"></div>
                            <div className="absolute inset-0 border-4 border-blue-600 transform rotate-45 rounded-xl animate-[spin_3s_linear_infinite]"></div>
                            <div className="absolute inset-4 bg-blue-50 transform rotate-45 rounded animate-pulse"></div>
                        </div>
                        <p className="mt-8 text-blue-900 font-bold uppercase tracking-wide text-xs">Loading Assets</p>
                    </div>

                    {/* Option 6: Glass & Blur */}
                    <div className="bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809')] bg-cover bg-center p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <h3 className="mb-8 text-sm font-semibold text-gray-800 uppercase tracking-wider">Option 6: Glass Effect</h3>
                            <div className="w-12 h-12 border-4 border-white border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
