export interface CommentData {
    id: string;
    name: string;
    time: string;
    text: string;
    role?: string;
    avatar?: string;
}

// Course data with detailed information for each course
export interface CourseData {
    id: number;
    title: string;
    image: string;
    hours: number;
    author: string;
    description: string;
    students: number;
    rating: number;
    stars: number;
    price: number;
    // Detailed course information
    fullDescription: string;
    whoIsThisFor: string;
    requirements: string[];
    lessons: number;
    downloadableResources: number;
    exercises: number;
    instructorName: string;
    instructorBio: string;
    instructorImage: string;
    videoPreview: string;
    contextImage: string;
    comments: CommentData[];
}

export const coursesData: CourseData[] = [
    {
        id: 1,
        title: 'Entrepreneurship (Basic)',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop',
        hours: 60,
        author: 'John Smith',
        description: 'Learn the fundamentals of entrepreneurship and how to start your own business from scratch',
        students: 250,
        rating: 98,
        stars: 5,
        price: 17.99,
        fullDescription: 'Want to start your own business but don\'t know where to begin? This comprehensive course will guide you through the fundamentals of entrepreneurship, from ideation to execution. Learn how to identify market opportunities, create a business plan, secure funding, and launch your venture successfully.',
        whoIsThisFor: 'This course is perfect for aspiring entrepreneurs, business students, and anyone looking to turn their ideas into reality. No prior business experience required!',
        requirements: [
            'A computer with internet access',
            'Notebook and pen for taking notes',
            'Willingness to learn and take action',
            'Basic understanding of business concepts (helpful but not required)'
        ],
        lessons: 25,
        downloadableResources: 16,
        exercises: 12,
        instructorName: 'John Smith',
        instructorBio: 'John Smith is a successful serial entrepreneur with over 15 years of experience building and scaling businesses. He has founded 3 successful startups and mentored hundreds of aspiring entrepreneurs.',
        instructorImage: '/images/instructor-mark.png',
        videoPreview: '/images/course-video-cover.png',
        contextImage: '/images/meeting-room.png',
        comments: [
            { id: "c1", name: "Nini", time: "24 weeks ago", text: "This course has been amazing! Totally recommend it!", role: "Student is Ambassador Alumni", avatar: "/images/instructor-mark.png" },
            { id: "c2", name: "Tako5", time: "5 weeks ago", text: "Amazing! The Instructor is awesome. I got private assistance from them.", avatar: "/images/instructor-mark.png" },
            { id: "c3", name: "Julia", time: "5 weeks ago", text: "I didn't expect this foundation in business this fast but this exceeded my expectations!", avatar: "/images/instructor-mark.png" }
        ]
    },
    {
        id: 2,
        title: 'Entrepreneurship (Intermediate)',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop',
        hours: 35,
        author: 'Sarah Johnson',
        description: 'Take your business to the next level with advanced strategies for growth and scaling',
        students: 540,
        rating: 95,
        stars: 5,
        price: 17.99,
        fullDescription: 'Ready to scale your business? This intermediate course covers advanced entrepreneurship topics including growth hacking, team building, fundraising strategies, and sustainable scaling. Learn from real-world case studies and apply proven frameworks to accelerate your business growth.',
        whoIsThisFor: 'This course is designed for entrepreneurs who have already launched their business and are looking to scale. Ideal for startup founders, business owners, and growth managers.',
        requirements: [
            'Completed Entrepreneurship (Basic) or equivalent experience',
            'An existing business or business idea',
            'Access to business metrics and data',
            'Commitment to implementing learned strategies'
        ],
        lessons: 18,
        downloadableResources: 14,
        exercises: 10,
        instructorName: 'Sarah Johnson',
        instructorBio: 'Sarah Johnson is a growth strategist who has helped over 50 startups scale from seed stage to Series A and beyond. She specializes in sustainable growth strategies and team development.',
        instructorImage: '/images/instructor-mark.png',
        videoPreview: '/images/course-video-cover.png',
        contextImage: '/images/meeting-room.png',
        comments: [
            { id: "c1", name: "Nini", time: "24 weeks ago", text: "This course has been amazing! Totally recommend it!", role: "Student is Ambassador Alumni", avatar: "/images/instructor-mark.png" },
            { id: "c2", name: "Tako5", time: "5 weeks ago", text: "Amazing! The Instructor is awesome. I got private assistance from them.", avatar: "/images/instructor-mark.png" },
            { id: "c3", name: "Julia", time: "5 weeks ago", text: "I didn't expect this foundation in business this fast but this exceeded my expectations!", avatar: "/images/instructor-mark.png" }
        ]
    },
    {
        id: 3,
        title: 'Entrepreneurship (Advanced)',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop',
        hours: 35,
        author: 'Michael Chen',
        description: 'Master advanced entrepreneurship techniques including exit strategies, M&A, and building unicorn companies',
        students: 384,
        rating: 100,
        stars: 5,
        price: 17.99,
        fullDescription: 'Elevate your entrepreneurial journey to the highest level. This advanced course covers sophisticated topics like exit strategies, mergers and acquisitions, building unicorn companies, and creating lasting business legacies. Learn from industry titans and apply elite-level strategies.',
        whoIsThisFor: 'This course is for experienced entrepreneurs, CEOs, and business leaders who are ready to take their ventures to the next level or plan strategic exits.',
        requirements: [
            'Completed Entrepreneurship (Intermediate) or 5+ years of business experience',
            'A scaling business or multiple business ventures',
            'Understanding of financial statements and business metrics',
            'Strategic mindset and long-term vision'
        ],
        lessons: 20,
        downloadableResources: 18,
        exercises: 15,
        instructorName: 'Michael Chen',
        instructorBio: 'Michael Chen is a venture capitalist and former CEO who has successfully exited 2 companies for over $100M combined. He now mentors elite entrepreneurs and invests in high-growth startups.',
        instructorImage: '/images/instructor-mark.png',
        videoPreview: '/images/course-video-cover.png',
        contextImage: '/images/meeting-room.png',
        comments: [
            { id: "c1", name: "Nini", time: "24 weeks ago", text: "This course has been amazing! Totally recommend it!", role: "Student is Ambassador Alumni", avatar: "/images/instructor-mark.png" },
            { id: "c2", name: "Tako5", time: "5 weeks ago", text: "Amazing! The Instructor is awesome. I got private assistance from them.", avatar: "/images/instructor-mark.png" },
            { id: "c3", name: "Julia", time: "5 weeks ago", text: "I didn't expect this foundation in business this fast but this exceeded my expectations!", avatar: "/images/instructor-mark.png" }
        ]
    },
    {
        id: 4,
        title: 'Finances Handling',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2626&auto=format&fit=crop',
        hours: 40,
        author: 'David Martinez',
        description: 'Master personal and business finance management, budgeting, and financial planning',
        students: 325,
        rating: 98,
        stars: 5,
        price: 17.99,
        fullDescription: 'Take control of your finances with this comprehensive course on financial management. Learn how to create budgets, manage cash flow, make smart investment decisions, and build long-term wealth. Perfect for both personal finance and business financial management.',
        whoIsThisFor: 'This course is suitable for anyone looking to improve their financial literacy, from individuals managing personal finances to business owners handling company finances.',
        requirements: [
            'Basic math skills',
            'Calculator or spreadsheet software',
            'Bank account statements (for practical exercises)',
            'Willingness to track and analyze spending'
        ],
        lessons: 22,
        downloadableResources: 20,
        exercises: 16,
        instructorName: 'David Martinez',
        instructorBio: 'David Martinez is a certified financial planner with 20 years of experience helping individuals and businesses achieve financial success. He has managed over $500M in assets and taught thousands of students.',
        instructorImage: '/images/instructor-mark.png',
        videoPreview: '/images/course-video-cover.png',
        contextImage: '/images/meeting-room.png',
        comments: [
            { id: "c1", name: "Nini", time: "24 weeks ago", text: "This course has been amazing! Totally recommend it!", role: "Student is Ambassador Alumni", avatar: "/images/instructor-mark.png" },
            { id: "c2", name: "Tako5", time: "5 weeks ago", text: "Amazing! The Instructor is awesome. I got private assistance from them.", avatar: "/images/instructor-mark.png" },
            { id: "c3", name: "Julia", time: "5 weeks ago", text: "I didn't expect this foundation in business this fast but this exceeded my expectations!", avatar: "/images/instructor-mark.png" }
        ]
    },
    {
        id: 5,
        title: 'Tax Management',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2626&auto=format&fit=crop',
        hours: 56,
        author: 'Emily Rodriguez',
        description: 'Navigate tax laws, maximize deductions, and ensure compliance for individuals and businesses',
        students: 875,
        rating: 95,
        stars: 5,
        price: 17.99,
        fullDescription: 'Demystify taxes with this comprehensive course on tax management. Learn how to navigate complex tax laws, maximize deductions, plan for tax efficiency, and ensure compliance. Covers both personal and business taxation strategies.',
        whoIsThisFor: 'This course is ideal for business owners, freelancers, self-employed individuals, and anyone looking to optimize their tax situation legally and ethically.',
        requirements: [
            'Basic understanding of income and expenses',
            'Access to tax documents (for practical exercises)',
            'Calculator or tax software',
            'Willingness to learn tax terminology'
        ],
        lessons: 28,
        downloadableResources: 24,
        exercises: 18,
        instructorName: 'Emily Rodriguez',
        instructorBio: 'Emily Rodriguez is a CPA and tax strategist with 18 years of experience helping clients save millions in taxes. She specializes in small business taxation and strategic tax planning.',
        instructorImage: '/images/instructor-mark.png',
        videoPreview: '/images/course-video-cover.png',
        contextImage: '/images/meeting-room.png',
        comments: [
            { id: "c1", name: "Nini", time: "24 weeks ago", text: "This course has been amazing! Totally recommend it!", role: "Student is Ambassador Alumni", avatar: "/images/instructor-mark.png" },
            { id: "c2", name: "Tako5", time: "5 weeks ago", text: "Amazing! The Instructor is awesome. I got private assistance from them.", avatar: "/images/instructor-mark.png" },
            { id: "c3", name: "Julia", time: "5 weeks ago", text: "I didn't expect this foundation in business this fast but this exceeded my expectations!", avatar: "/images/instructor-mark.png" }
        ]
    },
    {
        id: 6,
        title: 'Combined Finance Consulting',
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2671&auto=format&fit=crop',
        hours: 27,
        author: 'Robert Thompson',
        description: 'Comprehensive financial consulting covering investment, retirement planning, and wealth management',
        students: 675,
        rating: 100,
        stars: 5,
        price: 17.99,
        fullDescription: 'Get a complete financial education with this all-in-one consulting course. Covers investment strategies, retirement planning, wealth management, estate planning, and more. Learn how to build and protect your wealth for generations.',
        whoIsThisFor: 'This course is perfect for individuals and families looking to build comprehensive financial plans, as well as aspiring financial consultants.',
        requirements: [
            'Basic financial literacy',
            'Understanding of savings and investment concepts',
            'Long-term financial goals',
            'Commitment to financial planning'
        ],
        lessons: 15,
        downloadableResources: 12,
        exercises: 10,
        instructorName: 'Robert Thompson',
        instructorBio: 'Robert Thompson is a wealth management advisor and financial consultant with 25 years of experience. He has helped over 1,000 clients achieve their financial goals and build lasting wealth.',
        instructorImage: '/images/instructor-mark.png',
        videoPreview: '/images/course-video-cover.png',
        contextImage: '/images/meeting-room.png',
        comments: [
            { id: "c1", name: "Nini", time: "24 weeks ago", text: "This course has been amazing! Totally recommend it!", role: "Student is Ambassador Alumni", avatar: "/images/instructor-mark.png" },
            { id: "c2", name: "Tako5", time: "5 weeks ago", text: "Amazing! The Instructor is awesome. I got private assistance from them.", avatar: "/images/instructor-mark.png" },
            { id: "c3", name: "Julia", time: "5 weeks ago", text: "I didn't expect this foundation in business this fast but this exceeded my expectations!", avatar: "/images/instructor-mark.png" }
        ]
    }
];

// Helper function to get course by ID
export function getCourseById(id: number): CourseData | undefined {
    return coursesData.find(course => course.id === id);
}

// Helper function to get similar courses (excluding the current one)
export function getSimilarCourses(currentId: number, limit: number = 2): CourseData[] {
    return coursesData
        .filter(course => course.id !== currentId)
        .slice(0, limit);
}
