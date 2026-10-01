'use client';
import { Mail, Phone } from 'lucide-react';

export default function ContactSupport() {
    return (
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Still need support?</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">Our dedicated support team is available Monday to Friday, 9:00 AM - 6:00 PM EST to assist you with any issues.</p>

            <div className="flex flex-col md:flex-row justify-center gap-6">
                <button className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow text-gray-700 font-medium">
                    <Mail size={20} className="text-blue-500" />
                    support@powerpreneurs.com
                </button>
                <button className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow text-gray-700 font-medium">
                    <Phone size={20} className="text-green-500" />
                    +1 (555) 123-4567
                </button>
            </div>
        </div>
    );
}
