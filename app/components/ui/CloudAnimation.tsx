'use client';

import React, { useEffect, useState } from 'react';

const CloudAnimation = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateX(-100%) translateY(0); }
                    50% { transform: translateX(50vw) translateY(-20px); }
                    100% { transform: translateX(100vw) translateY(0); }
                }
                @keyframes drift {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100vw); }
                }
                .cloud {
                    position: absolute;
                    opacity: 0.6;
                    animation: drift linear infinite;
                }
                .cloud-1 { top: 10%; left: -20%; animation-duration: 45s; animation-delay: 0s; transform: scale(0.8); }
                .cloud-2 { top: 30%; left: -20%; animation-duration: 35s; animation-delay: -15s; transform: scale(1.2); }
                .cloud-3 { top: 60%; left: -20%; animation-duration: 40s; animation-delay: -5s; transform: scale(0.9); }
                .cloud-4 { top: 15%; left: -20%; animation-duration: 50s; animation-delay: -25s; transform: scale(0.6); }
                .cloud-5 { top: 75%; left: -20%; animation-duration: 38s; animation-delay: -10s; transform: scale(1.1); }
                
                /* New Clouds */
                .cloud-6 { top: 5%; left: -20%; animation-duration: 55s; animation-delay: -5s; transform: scale(0.7); }
                .cloud-7 { top: 40%; left: -20%; animation-duration: 42s; animation-delay: -20s; transform: scale(1.0); }
                .cloud-8 { top: 85%; left: -20%; animation-duration: 48s; animation-delay: -8s; transform: scale(0.8); }
                .cloud-9 { top: 20%; left: -20%; animation-duration: 36s; animation-delay: -30s; transform: scale(1.15); }
                .cloud-10 { top: 55%; left: -20%; animation-duration: 52s; animation-delay: -12s; transform: scale(0.65); }
            `}</style>

            {/* Cloud 1 */}
            <svg className="cloud cloud-1" width="200" height="100" viewBox="0 0 200 100" fill="white">
                <path d="M25,60 a20,20 0 0,1 0,-40 a30,30 0 0,1 50,-10 a25,25 0 0,1 35,10 a25,25 0 0,1 35,-5 a20,20 0 0,1 20,20 a20,20 0 0,1 -10,35 z" />
            </svg>

            {/* Cloud 2 */}
            <svg className="cloud cloud-2" width="250" height="120" viewBox="0 0 250 120" fill="white">
                <path d="M30,70 a25,25 0 0,1 0,-50 a35,35 0 0,1 60,-15 a30,30 0 0,1 40,10 a30,30 0 0,1 40,-5 a25,25 0 0,1 25,25 a25,25 0 0,1 -15,45 z" />
            </svg>

            {/* Cloud 3 */}
            <svg className="cloud cloud-3" width="180" height="90" viewBox="0 0 180 90" fill="white">
                <path d="M20,50 a15,15 0 0,1 0,-30 a25,25 0 0,1 45,-5 a20,20 0 0,1 30,5 a20,20 0 0,1 30,-5 a15,15 0 0,1 15,15 a15,15 0 0,1 -10,25 z" />
            </svg>

            {/* Cloud 4 */}
            <svg className="cloud cloud-4" width="220" height="110" viewBox="0 0 220 110" fill="white">
                <path d="M25,65 a20,20 0 0,1 0,-40 a30,30 0 0,1 50,-10 a25,25 0 0,1 35,10 a25,25 0 0,1 35,-5 a20,20 0 0,1 20,20 a20,20 0 0,1 -10,35 z" />
            </svg>

            {/* Cloud 5 */}
            <svg className="cloud cloud-5" width="240" height="115" viewBox="0 0 240 115" fill="white">
                <path d="M30,70 a25,25 0 0,1 0,-50 a35,35 0 0,1 60,-15 a30,30 0 0,1 40,10 a30,30 0 0,1 40,-5 a25,25 0 0,1 25,25 a25,25 0 0,1 -15,45 z" />
            </svg>

            {/* New Clouds */}
            {/* Cloud 6 */}
            <svg className="cloud cloud-6" width="190" height="95" viewBox="0 0 190 95" fill="white">
                <path d="M20,55 a18,18 0 0,1 0,-35 a28,28 0 0,1 45,-8 a22,22 0 0,1 30,8 a22,22 0 0,1 30,-4 a18,18 0 0,1 18,18 a18,18 0 0,1 -8,30 z" />
            </svg>

            {/* Cloud 7 */}
            <svg className="cloud cloud-7" width="230" height="110" viewBox="0 0 230 110" fill="white">
                <path d="M28,68 a22,22 0 0,1 0,-45 a32,32 0 0,1 55,-12 a28,28 0 0,1 38,8 a28,28 0 0,1 38,-4 a22,22 0 0,1 22,22 a22,22 0 0,1 -12,40 z" />
            </svg>

            {/* Cloud 8 */}
            <svg className="cloud cloud-8" width="200" height="100" viewBox="0 0 200 100" fill="white">
                <path d="M25,60 a20,20 0 0,1 0,-40 a30,30 0 0,1 50,-10 a25,25 0 0,1 35,10 a25,25 0 0,1 35,-5 a20,20 0 0,1 20,20 a20,20 0 0,1 -10,35 z" />
            </svg>

            {/* Cloud 9 */}
            <svg className="cloud cloud-9" width="260" height="125" viewBox="0 0 260 125" fill="white">
                <path d="M32,72 a28,28 0 0,1 0,-52 a38,38 0 0,1 62,-18 a32,32 0 0,1 42,12 a32,32 0 0,1 42,-6 a28,28 0 0,1 28,28 a28,28 0 0,1 -18,48 z" />
            </svg>

            {/* Cloud 10 */}
            <svg className="cloud cloud-10" width="180" height="90" viewBox="0 0 180 90" fill="white">
                <path d="M20,50 a15,15 0 0,1 0,-30 a25,25 0 0,1 45,-5 a20,20 0 0,1 30,5 a20,20 0 0,1 30,-5 a15,15 0 0,1 15,15 a15,15 0 0,1 -10,25 z" />
            </svg>
        </div >
    );
};

export default CloudAnimation;
