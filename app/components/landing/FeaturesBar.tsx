import React from 'react';
import './FeaturesBar.css';
import { MonitorPlay, Star, Puzzle } from 'lucide-react';

const FeaturesBar = () => {
    return (
        <section className="features-bar">
            <div className="features-container">
                <div className="feature-item">
                    <div className="feature-icon-wrapper">
                        <MonitorPlay size={28} className="feature-icon" />
                    </div>
                    <div className="feature-text">
                        <h3 className="feature-title">Best Course Providers</h3>
                        <p className="feature-desc">
                            We monitor and choose the instructors with best skills
                        </p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="feature-icon-wrapper">
                        <Star size={28} className="feature-icon" />
                    </div>
                    <div className="feature-text">
                        <h3 className="feature-title">High Quality Video Courses</h3>
                        <p className="feature-desc">
                            High Quality Online courses are crafted with help of our mentoring team
                        </p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="feature-icon-wrapper">
                        <Puzzle size={28} className="feature-icon" />
                    </div>
                    <div className="feature-text">
                        <h3 className="feature-title">Driving personal as well as professional growth</h3>
                        <p className="feature-desc">
                            Candidates learn skills and techniques from experienced mentors, ensuring personal growth
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesBar;
