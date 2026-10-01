import { NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';

export async function GET() {
    try {
        // 1. Dashboard Fake Stats (Learner Directory)
        const dashboardStats = {
            featuredCourses: ['Product Design', 'Web Development', 'Data Science'],
            continueWatching: [
                { id: 1, title: "Beginner's Guide To Becoming A Professional Frontend Developer", progress: 66, instructor: "Aryan", category: "FRONTEND" },
                { id: 2, title: "Advanced React Patterns", progress: 30, instructor: "Sarah", category: "REACT" },
                { id: 3, title: "UI/UX Masterclass", progress: 10, instructor: "David", category: "DESIGN" }
            ],
            mentors: [
                { name: 'Prashant Kumar', date: '25/2/2023', course: 'Understanding Concept Of React', category: 'FRONTEND' },
                { name: 'Ravi Kumar', date: '25/2/2023', course: 'Advanced State Management', category: 'REACT' }
            ]
        };
        await uploadToR2('learner/dashboard.json', JSON.stringify(dashboardStats), 'application/json');

        // 2. Tasks / Assignments (Learner Directory)
        const assignments = [
            { id: '1', title: 'Market Analysis Report', course: 'Financial Markets 101', dueDate: 'Today, 11:59 PM', status: 'pending', points: 100, description: 'Analyze the current trends in the S&P 500...' },
            { id: '2', title: 'SWOT Analysis', course: 'Business Strategy', dueDate: 'Tomorrow, 5:00 PM', status: 'pending', points: 50, description: 'Perform a SWOT analysis for a chosen tech startup.' },
            { id: '3', title: 'Calculus Problem Set 3', course: 'Introduction to Calculus', dueDate: 'Yesterday', status: 'overdue', points: 30, description: 'Solve problems 1-15 in Chapter 4 of the textbook.' },
            { id: '4', title: 'History Essay', course: 'World History', dueDate: 'Completed', status: 'submitted', points: 100, grade: '95/100', description: 'Write an essay on the industrial revolution.' }
        ];
        await uploadToR2('learner/tasks.json', JSON.stringify(assignments), 'application/json');

        // 3. Community Hub (Learner Directory)
        const communityData = {
            posts: [
                {
                    id: '1', author: 'Sarah Jenkins', authorRole: 'Investment Analyst', avatar: '/images/instructor-mark.png',
                    content: 'Market volatility is high this week. Our latest analysis suggests a shift towards defensive assets.', image: '/images/creative-arts-course.png',
                    likes: 124, commentsSize: 45, shares: 12, comments: [{ id: 'c1', author: 'Mark Doe', avatar: '/images/instructor-mark.png', text: 'Great insights Sarah!', timestamp: '2h ago' }],
                    timestamp: '2h', isLiked: false
                },
                {
                    id: '2', author: 'David Chen', authorRole: 'Founder @ FinTech Solutions', avatar: '/images/meeting-room.png',
                    content: 'Excited to announce our Series A funding round!', image: '/images/meeting-room.png',
                    likes: 856, commentsSize: 120, shares: 204, comments: [], timestamp: '5h', isLiked: true
                }
            ],
            myCommunities: [
                { id: '1', title: 'Global Markets Study', members: 1250, description: 'Daily analysis and discussions.', open: true, category: 'Analysis' },
                { id: '2', title: 'FinTech Founders Network', members: 420, description: 'A community for founders.', open: false, category: 'Networking' }
            ],
            discoverCommunities: [
                { id: '101', title: 'Crypto Assets & Blockchain', members: 3500, description: 'Deep dive into blockchain tech.', open: true, category: 'Tech' },
                { id: '102', title: 'Private Equity Circle', members: 150, description: 'Exclusive group for PE professionals.', open: false, category: 'Exclusive' }
            ]
        };
        await uploadToR2('learner/community.json', JSON.stringify(communityData), 'application/json');

        // 4. Resources (Learner Directory)
        const resourcesData = {
            courseMaterials: [
                {
                    id: '1', title: 'Financial Markets 101', type: 'folder', updated: '2 hours ago', size: '1.2 GB',
                    items: [
                        { id: '1-1', title: 'Syllabus.pdf', type: 'document', size: '2.4 MB', updated: 'Yesterday', author: 'Dr. Smith' },
                        { id: '1-2', title: 'Lecture 1.mp4', type: 'video', size: '450 MB', updated: '2 days ago', author: 'Dr. Smith' }
                    ]
                },
                { id: '2', title: 'Business Strategy', type: 'folder', updated: 'Yesterday', size: '850 MB', items: [] }
            ],
            studyGuides: [
                { id: 'sg-1', title: 'Accounting Basics Guide', type: 'document', size: '1.2 MB', updated: '2 days ago', author: 'Department' }
            ],
            lectureNotes: [
                { id: 'ln-1', title: 'Economics Lecture 1', type: 'document', size: '450 KB', updated: 'Today', author: 'Prof' }
            ]
        };
        await uploadToR2('learner/resources.json', JSON.stringify(resourcesData), 'application/json');

        // 5. Meetings (Learner Directory)
        const todayObj = new Date();
        const tomorrowObj = new Date();
        tomorrowObj.setDate(tomorrowObj.getDate() + 1);
        const formatDate = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        const meetings = [
            { title: "Weekly Sync", scheduledDate: formatDate(todayObj), scheduledTime: "10:00 AM", attendees: 5, meetCode: "abc-xyz", password: "" },
            { title: "Project Review", scheduledDate: formatDate(tomorrowObj), scheduledTime: "2:00 PM", attendees: 12, meetCode: "def-uvw", password: "pass" },
        ];
        await uploadToR2('learner/meetings.json', JSON.stringify(meetings), 'application/json');

        // 6. Articles and Public Content (Public Directory)
        const articles = [
            { id: '1', title: 'Effective Classroom Management', description: 'Strategies for maintaining a productive learning environment.', image: '/images/creative-arts-course.png', category: 'Teaching', readTime: '5 min' },
            { id: '2', title: 'Integrating Technology in Education', description: 'Tools and methods to enhance teaching with technology.', image: '/images/meeting-room.png', category: 'EdTech', readTime: '8 min' }
        ];
        await uploadToR2('Public/articles.json', JSON.stringify(articles), 'application/json');

        // 7. Mentor Section Seed (Mentor Directory)
        const mentorDashboard = {
            studentsAssigned: 15,
            pendingReviews: 4,
            upcomingSessions: 2
        };
        await uploadToR2('mentor/dashboard.json', JSON.stringify(mentorDashboard), 'application/json');

        // 8. Mentor Articles (Mentor Directory)
        const mentorArticles = [
            { id: '1', title: 'Effective Classroom Management', description: 'Strategies for maintaining a productive learning environment.', image: '/images/creative-arts-course.png', category: 'Teaching', readTime: '5 min' },
            { id: '2', title: 'Integrating Technology in Education', description: 'Tools and methods to enhance teaching with technology.', image: '/images/meeting-room.png', category: 'EdTech', readTime: '8 min' },
            { id: '3', title: 'Understanding Student Learning Styles', description: 'Identifying and catering to different student learning preferences.', image: '/images/instructor-mark.png', category: 'Psychology', readTime: '6 min' },
            { id: '4', title: 'Creating Engaging Lesson Plans', description: 'Tips for designing lessons that captivate and educate.', image: '/images/creative-arts-course.png', category: 'Planning', readTime: '4 min' },
            { id: '5', title: 'The Future of Online Learning', description: 'Trends shaping the future of digital education.', image: '/images/meeting-room.png', category: 'Trends', readTime: '7 min' }
        ];
        await uploadToR2('mentor/articles.json', JSON.stringify(mentorArticles), 'application/json');

        return NextResponse.json({ success: true, message: 'Data perfectly structured in Public, learner, and mentor directories.' });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
