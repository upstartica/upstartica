'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    { q: "How do I add a new administrator?", a: "To add a new admin, go to the People section, click 'Add Person', and ensure you select 'Admin' from the Role dropdown menu." },
    { q: "Can I export timesheet data?", a: "Yes, navigate to the Reports section and select 'Detailed timesheet'. You can export the generated report as CSV or PDF." },
    { q: "How do I reset a user's password?", a: "Go to People, find the user, click on their profile, and select 'Security'. You'll find a 'Send Password Reset' option there." },
    { q: "Why can't I see the 'Financials' tab?", a: "Access to the Financials tab is restricted to 'Super Admin' and 'Finance' roles. Please check your permissions with your manager." }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                        <button
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        >
                            <span className="font-medium text-gray-700">{faq.q}</span>
                            {openIndex === idx ? <Minus size={20} className="text-blue-500" /> : <Plus size={20} className="text-gray-400" />}
                        </button>
                        {openIndex === idx && (
                            <div className="px-4 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-50 mt-2 pt-2">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
