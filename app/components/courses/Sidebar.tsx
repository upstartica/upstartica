import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-section">
                <h3 className="sidebar-title">Courses</h3>
                <ul className="sidebar-list">
                    <li><a href="#" className="sidebar-link">All Consultancy</a></li>
                    <li><a href="#" className="sidebar-link active">Online Consultancy</a></li>
                    <li><a href="#" className="sidebar-link">Entrepreneurship Consultancy</a></li>
                    <li><a href="#" className="sidebar-link">Finance Counsultancy</a></li>
                </ul>
            </div>

            <div className="sidebar-section">
                <h3 className="sidebar-title">Filters</h3>

                <div className="filter-group">
                    <h4 className="filter-subtitle">Department</h4>
                    <label className="checkbox-label">
                        <input type="checkbox" /> Management
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" /> Finances
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" /> Sales
                    </label>
                </div>

                <div className="filter-group">
                    <h4 className="filter-subtitle">Categories</h4>
                    <label className="checkbox-label">
                        <input type="checkbox" /> Entrepreuners
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" /> Finances
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" /> Development
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" /> Technicality
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" /> Taxations
                    </label>
                </div>

                <div className="filter-group">
                    <h4 className="filter-subtitle">Sort By</h4>
                    <label className="radio-label">
                        <input type="radio" name="sort" defaultChecked /> Popular
                    </label>
                    <label className="radio-label">
                        <input type="radio" name="sort" /> Newest
                    </label>
                    <label className="radio-label">
                        <input type="radio" name="sort" /> Price: High to Low
                    </label>
                    <label className="radio-label">
                        <input type="radio" name="sort" /> Price: Low to High
                    </label>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
