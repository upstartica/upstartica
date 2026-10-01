'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Smile, Frown, ArrowRight, ArrowLeft } from 'lucide-react';

const mockQuizzes = [
    { date: '24 Apr', training: 'Venture Capital Basics', quizName: 'VC Quiz 1', passedDate: '25 Apr', singlePass: 'No', passed: true },
    { date: '16 Feb', training: 'Market Research Fundamentals', quizName: 'Market Quiz 1', passedDate: '16 Feb', singlePass: 'No', passed: true },
    { date: '16 Feb', training: 'Financial Modeling 101', quizName: 'Finance Quiz 1', passedDate: '16 Feb', singlePass: 'No', passed: true },
    { date: '11 Feb', training: 'Startup Legal Frameworks', quizName: 'Legal Quiz 1', passedDate: '12 Feb', singlePass: 'No', passed: false },
    { date: '03 Feb', training: 'Pitch Deck Creation', quizName: 'Pitch Quiz 1', passedDate: '03 Feb', singlePass: 'No', passed: true },
    { date: '01 Feb', training: 'Team Management for Founders', quizName: 'HR Quiz 1', passedDate: '02 Feb', singlePass: 'No', passed: true },
];

const mockAssessments = [
    { date: '24 Apr', quizName: 'Advanced Valuation Methods', singlePass: 'Yes', quizTime: '60 mins', qsCount: '49' },
    { date: '16 Feb', quizName: 'Macroeconomics for Business', singlePass: 'Yes', quizTime: '30 mins', qsCount: '15' },
    { date: '16 Feb', quizName: 'Investment Strategies', singlePass: 'No', quizTime: '45 mins', qsCount: '21' },
    { date: '11 Feb', quizName: 'Business Plan Development', singlePass: 'Yes', quizTime: '90 mins', qsCount: '33' },
    { date: '03 Feb', quizName: 'Customer Acquisition Cost Analysis', singlePass: 'No', quizTime: '45 mins', qsCount: '21' },
    { date: '01 Feb', quizName: 'IPO Readiness Assessment', singlePass: 'Yes', quizTime: '60 mins', qsCount: '54' },
];

const QuizzesView = () => {
    const [quizYear, setQuizYear] = useState(2025);
    const [assessYear, setAssessYear] = useState(2025);
    const [isQuizzesExpanded, setIsQuizzesExpanded] = useState(true);
    const [isAssessmentsExpanded, setIsAssessmentsExpanded] = useState(true);

    return (
        <div className="space-y-12 pb-12">
            {/* Quizzes Section */}
            <div className="bg-white">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                        <h2 className="text-lg font-bold text-gray-800">Quizzes:</h2>
                        <div className="flex items-center bg-gray-100 rounded-lg">
                            <button
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-l-lg transition-colors"
                                onClick={() => setQuizYear(y => y - 1)}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="px-6 text-sm font-medium text-gray-700">{quizYear}</span>
                            <button
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-r-lg transition-colors"
                                onClick={() => setQuizYear(y => y + 1)}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsQuizzesExpanded(!isQuizzesExpanded)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    >
                        {isQuizzesExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </button>
                </div>

                {isQuizzesExpanded && (
                    <div>
                        <div className="grid grid-cols-[0.8fr_3fr_1fr_1fr_1fr_0.5fr] gap-4 bg-gray-300 px-6 py-3 rounded-md mb-2 text-xs font-semibold text-gray-600">
                            <div>Date</div>
                            <div>Training</div>
                            <div>Quiz name</div>
                            <div>Passed date</div>
                            <div>Single pass</div>
                            <div className="text-right"></div>
                        </div>
                        <div className="space-y-1">
                            {mockQuizzes.map((quiz, index) => (
                                <div key={index} className={`grid grid-cols-[0.8fr_3fr_1fr_1fr_1fr_0.5fr] gap-4 px-6 py-4 rounded-md items-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <div className="text-sm font-medium text-gray-600">{quiz.date}</div>
                                    <div className="text-sm font-medium text-gray-800">{quiz.training}</div>
                                    <div className="text-sm font-medium text-gray-600">{quiz.quizName}</div>
                                    <div className="text-sm font-medium text-gray-600">{quiz.passedDate}</div>
                                    <div className="text-sm font-medium text-gray-600">{quiz.singlePass}</div>
                                    <div className="flex justify-end">
                                        {quiz.passed ?
                                            <Smile className="text-green-500 w-6 h-6" /> :
                                            <Frown className="text-red-500 w-6 h-6" />
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Assessments Section */}
            <div className="bg-white">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                        <h2 className="text-lg font-bold text-gray-800">Assessments</h2>
                        <div className="flex items-center bg-gray-100 rounded-lg">
                            <button
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-l-lg transition-colors"
                                onClick={() => setAssessYear(y => y - 1)}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="px-6 text-sm font-medium text-gray-700">{assessYear}</span>
                            <button
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-r-lg transition-colors"
                                onClick={() => setAssessYear(y => y + 1)}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsAssessmentsExpanded(!isAssessmentsExpanded)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    >
                        {isAssessmentsExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </button>
                </div>

                {isAssessmentsExpanded && (
                    <div>
                        <div className="grid grid-cols-[1fr_4fr_1fr_1fr_1fr] gap-4 bg-gray-300 px-6 py-3 rounded-md mb-2 text-xs font-semibold text-gray-600">
                            <div>Date</div>
                            <div>Quiz name</div>
                            <div>Single pass</div>
                            <div>Quiz time</div>
                            <div>Qs count</div>
                        </div>
                        <div className="space-y-1">
                            {mockAssessments.map((assess, index) => (
                                <div key={index} className={`grid grid-cols-[1fr_4fr_1fr_1fr_1fr] gap-4 px-6 py-4 rounded-md items-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <div className="text-sm font-medium text-gray-600">{assess.date}</div>
                                    <div className="text-sm font-medium text-gray-800">{assess.quizName}</div>
                                    <div className="text-sm font-medium text-gray-600">{assess.singlePass}</div>
                                    <div className="text-sm font-medium text-gray-600">{assess.quizTime}</div>
                                    <div className="text-sm font-medium text-gray-600">{assess.qsCount}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <button className="flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50 gap-1 mr-2" disabled>
                    <ArrowLeft size={16} /> Previous
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-[#3B82F6] text-white rounded font-medium">1</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">2</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">3</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">4</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">5</button>
                <span className="px-1 text-gray-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">31</button>
                <button className="flex items-center text-blue-500 hover:text-blue-600 gap-1 ml-2 font-medium">
                    Next <ArrowRight size={16} />
                </button>
                <button className="flex items-center text-blue-500 hover:text-blue-600 gap-1 ml-4 font-medium">
                    <ArrowRight size={16} className="rotate-90" /> Show all
                </button>
            </div>
        </div>
    );
};

export default QuizzesView;
