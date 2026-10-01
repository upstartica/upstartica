import React from 'react';
import './Hero.css';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    Learn to start your own business
                </h1>
                <p className="hero-description">
                    Select desired courses from online categories, get individual assistance from instructors and master your new skills
                </p>

                <div className="hero-cta-wrapper">
                    <Link href="/courses">
                        <button className="explore-btn">
                            Explore Courses
                        </button>
                    </Link>
                </div>

                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-value">Worldwide</span>
                        <span className="stat-label">Candidates</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">Tailored</span>
                        <span className="stat-label">Courses</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">100%</span>
                        <span className="stat-label">Guaranteed growth</span>
                    </div>
                </div>

                <p className="hero-footer-text">
                    Learn from Top Business driving instructors
                </p>
            </div>

            <div className="hero-image-container">
                {/* Using a placeholder or the generated image path here. 
            For now, I'll assume the generated image will be placed in public or I'll use a placeholder.
            Since I can't easily move the generated artifact to public in this environment without a command, 
            I will use a standard placeholder or the artifact path if I can. 
            For a real app, this should be in public/. 
            I'll use a colored div as placeholder if image isn't ready, but I'll try to use a standard Next.js image approach.
        */}
                <div className="hero-image-placeholder">
                    {/* In a real scenario, <Image src="/hero-image.png" ... /> */}
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" alt="Business learning" className="hero-img" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
