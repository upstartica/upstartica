import React from 'react';
import Link from 'next/link';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <Link href="/" className="footer-logo">
                        <span className="logo-box">Power</span>preneur
                    </Link>
                </div>

                <div className="footer-links-group">
                    <h4 className="footer-heading">Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link href="/entrepreneurship">Entrepreneurship courses</Link></li>
                        <li><Link href="/finance">Finance Courses</Link></li>
                    </ul>
                </div>

                <div className="footer-links-group">
                    <h4 className="footer-heading">Community</h4>
                    <ul className="footer-links">
                        <li><Link href="/notes">Notes</Link></li>
                        <li><Link href="/articles">Articles</Link></li>
                        <li><Link href="/mentors">Mentors</Link></li>
                        <li><Link href="/support">Customer Support</Link></li>
                    </ul>
                </div>

                <div className="footer-links-group">
                    <h4 className="footer-heading">About Us</h4>
                    <ul className="footer-links">
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/terms">Terms and Conditions</Link></li>
                        <li><Link href="/refund">Refund Policy</Link></li>
                    </ul>
                </div>

                <div className="footer-links-group">
                    <h4 className="footer-heading">Social Links</h4>
                    <div className="social-icons">
                        {/* Add social icons here if needed */}
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>2025 | Powerpreneurs. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
