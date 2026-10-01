import React from 'react';
import './FeaturedConsultancy.css';

const FeaturedConsultancy = () => {
    return (
        <section className="consultancy-section">
            <div className="consultancy-header">
                <h2 className="consultancy-title">Featured Consultancy</h2>
                <p className="consultancy-desc">
                    Browse through the selection of courses both online and on-site
                </p>
            </div>

            <div className="consultancy-buttons">
                <button className="consultancy-btn active">Online Consultancy</button>
                <button className="consultancy-btn">Finance Consultancy</button>
                <button className="consultancy-btn">Entrepreneurship Consultancy</button>
            </div>
        </section>
    );
};

export default FeaturedConsultancy;
