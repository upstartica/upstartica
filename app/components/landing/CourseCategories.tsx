import React from 'react';
import './CourseCategories.css';
import { Landmark, BadgeDollarSign } from 'lucide-react';
import Link from 'next/link';

const CourseCategories = () => {
    return (
        <section className="categories-section">
            <h2 className="categories-title">Course Categories</h2>

            <div className="categories-container">
                {/* Entrepreneurship Card */}
                <div className="category-card-wrapper">
                    <div className="category-icon-circle">
                        <Landmark size={48} className="category-icon" />
                    </div>
                    <div className="category-card">
                        <h3 className="category-name">Entrepreneurship</h3>
                        <p className="category-desc">
                            Browse through the selection of courses both online and on-site
                        </p>
                    </div>
                    <div className="category-card-shadow"></div>
                </div>

                {/* Financial Education Card */}
                <div className="category-card-wrapper">
                    <div className="category-icon-circle">
                        <BadgeDollarSign size={48} className="category-icon" />
                    </div>
                    <div className="category-card">
                        <h3 className="category-name">Financial Education</h3>
                        <p className="category-desc">
                            Browse through the selection of courses both online and on-site
                        </p>
                    </div>
                    <div className="category-card-shadow"></div>
                </div>
            </div>

            <div className="explore-more-wrapper">
                <Link href="/courses">
                    <button className="explore-more-btn">
                        Explore More
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default CourseCategories;
