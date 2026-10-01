'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, X } from 'lucide-react';
import Link from 'next/link';
import './contact.css';

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [submissionToken, setSubmissionToken] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (result.success) {
                setSubmissionToken(result.tokenId);
            } else {
                alert('Failed to submit form. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <div className="contact-hero">
                <div className="container">
                    <h1 className="contact-title">Get in Touch</h1>
                    <p className="contact-subtitle">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </div>

            <div className="container contact-content">
                <div className="contact-grid">
                    {/* Contact Form */}
                    <div className="contact-form-section">
                        <h2 className="section-title">Send us a Message</h2>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="john.doe@example.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="How can we help you?"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    placeholder="Tell us more about your inquiry..."
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn" disabled={isLoading}>
                                <Send className="btn-icon" />
                                {isLoading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="contact-info-section">
                        <h2 className="section-title">Contact Information</h2>
                        <p className="info-description">
                            Reach out to us through any of these channels. We're here to help!
                        </p>

                        <div className="info-cards">
                            <div className="info-card">
                                <div className="info-icon">
                                    <Mail />
                                </div>
                                <div className="info-content">
                                    <h3>Email Us</h3>
                                    <p>support@businessedu.com</p>
                                    <p className="secondary">info@businessedu.com</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <Phone />
                                </div>
                                <div className="info-content">
                                    <h3>Call Us</h3>
                                    <p>+1 (555) 123-4567</p>
                                    <p className="secondary">Mon-Fri, 9AM-6PM EST</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <MapPin />
                                </div>
                                <div className="info-content">
                                    <h3>Visit Us</h3>
                                    <p>123 Business Avenue</p>
                                    <p className="secondary">New York, NY 10001</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <Clock />
                                </div>
                                <div className="info-content">
                                    <h3>Business Hours</h3>
                                    <p>Monday - Friday: 9AM - 6PM</p>
                                    <p className="secondary">Saturday: 10AM - 4PM</p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Link */}
                        <div className="faq-section">
                            <MessageSquare className="faq-icon" />
                            <div>
                                <h3>Looking for quick answers?</h3>
                                <p>Check out our <Link href="/faq" className="faq-link">Frequently Asked Questions</Link></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="map-section">
                    <h2 className="section-title text-center">Find Us Here</h2>
                    <div className="map-container">
                        <div className="map-placeholder">
                            <MapPin className="map-icon" />
                            <p>123 Business Avenue, New York, NY 10001</p>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="map-link"
                            >
                                Open in Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Token Modal */}
            {submissionToken && (
                <div className="modal-overlay">
                    <div className="modal-content text-center">
                        <button 
                            onClick={() => setSubmissionToken(null)}
                            className="modal-close-btn"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <h3 className="section-title" style={{ marginBottom: '16px' }}>Submission Successful!</h3>
                        <p className="info-description" style={{ marginBottom: '24px' }}>
                            Thank you for contacting us. Please save your tracking token below:
                        </p>
                        <div className="token-display">
                            <span>{submissionToken}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
