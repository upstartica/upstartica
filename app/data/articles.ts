export interface Article {
    id: number;
    title: string;
    description: string;
    content: string;
    image: string;
    author: string;
    date: string;
    likes: number;
    comments: number;
}

export const articles: Article[] = [
    {
        id: 1,
        title: 'Effective Classroom Management Techniques',
        description: 'Strategies for maintaining a productive learning environment.',
        content: `
            <p>Classroom management is one of the most challenging aspects of teaching, yet it is crucial for creating an environment where learning can flourish. Effective classroom management goes beyond just discipline; it involves building relationships, setting clear expectations, and engaging students in the learning process.</p>
            
            <h3>1. Establish Clear Rules and Routines</h3>
            <p>From the very first day of school, it is important to establish clear rules and routines. Students need to know what is expected of them in terms of behavior and academic work. Involve students in creating these rules to give them a sense of ownership.</p>

            <h3>2. Build Positive Relationships</h3>
            <p>Building positive relationships with your students is the foundation of effective classroom management. When students feel respected and valued, they are more likely to behave well and engage in learning. Take the time to get to know your students' interests and backgrounds.</p>

            <h3>3. Use Positive Reinforcement</h3>
            <p>Positive reinforcement is a powerful tool for encouraging good behavior. Acknowledge and praise students when they follow the rules or make a good effort. This can be as simple as a verbal compliment, a sticker, or a note home to parents.</p>

            <h3>4. Be Consistent</h3>
            <p>Consistency is key. If you have a rule, you must enforce it every time. If you are inconsistent, students will be confused and may test the limits. Make sure the consequences for breaking rules are fair and predictable.</p>
        `,
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2604&auto=format&fit=crop',
        author: 'Sarah Jenkins',
        date: 'Oct 15, 2023',
        likes: 124,
        comments: 45
    },
    {
        id: 2,
        title: 'Integrating Technology in Education',
        description: 'Tools and methods to enhance teaching with technology.',
        content: `
            <p>Technology has revolutionized the way we live and work, and it is also transforming education. Integrating technology into the classroom can enhance teaching and learning, making it more engaging and effective.</p>

            <h3>Benefits of Technology in Education</h3>
            <p>There are many benefits to using technology in the classroom. It can provide students with access to a wealth of information, allow for personalized learning, and foster collaboration and creativity. Technology can also help teachers to track student progress and provide timely feedback.</p>

            <h3>Tools for the Classroom</h3>
            <p>There are countless educational apps and tools available for teachers. Interactive whiteboards, tablets, and online learning platforms are just a few examples. When choosing technology tools, it is important to select ones that align with your learning goals and are appropriate for your students' age and ability levels.</p>
        `,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop',
        author: 'Mark Thompson',
        date: 'Nov 02, 2023',
        likes: 89,
        comments: 23
    },
    {
        id: 3,
        title: 'Understanding Student Learning Styles',
        description: 'Identifying and catering to different student learning preferences.',
        content: `
            <p>Every student learns differently. Some are visual learners, while others are auditory or kinesthetic learners. Understanding these different learning styles can help teachers to differentiate instruction and meet the needs of all students.</p>

            <h3>Visual Learners</h3>
            <p>Visual learners learn best by seeing. They benefit from using charts, graphs, diagrams, and videos. They also like to take notes and use color-coding.</p>

            <h3>Auditory Learners</h3>
            <p>Auditory learners learn best by hearing. They benefit from listening to lectures, participating in discussions, and using audiobooks. They may also like to read aloud to themselves.</p>

            <h3>Kinesthetic Learners</h3>
            <p>Kinesthetic learners learn best by doing. They benefit from hands-on activities, experiments, and movement. They may have trouble sitting still for long periods of time.</p>
        `,
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2622&auto=format&fit=crop',
        author: 'Dr. Emily Chen',
        date: 'Sep 28, 2023',
        likes: 210,
        comments: 67
    },
    {
        id: 4,
        title: 'Creating Engaging Lesson Plans',
        description: 'Tips for designing lessons that captivate and educate.',
        content: `
            <p>A well-planned lesson is the key to a successful class. Engaging lesson plans capture students' attention and keep them motivated to learn.</p>

            <h3>Start with a Hook</h3>
            <p>Begin your lesson with something that will grab your students' interest. This could be a question, a story, a video, or a demonstration. The goal is to make them curious about what they are going to learn.</p>

            <h3>Use a Variety of Activities</h3>
            <p>Don't just lecture for the entire class period. Mix things up with a variety of activities, such as group work, discussions, games, and hands-on projects. This will help to keep students engaged and prevent boredom.</p>
        `,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop',
        author: 'Jessica Williams',
        date: 'Dec 05, 2023',
        likes: 156,
        comments: 34
    },
    {
        id: 5,
        title: 'The Future of Online Learning',
        description: 'Exploring trends and predictions for the digital classroom.',
        content: `
            <p>Online learning has grown exponentially in recent years, and it shows no signs of slowing down. As technology continues to advance, we can expect to see even more innovative and immersive online learning experiences.</p>

            <h3>Artificial Intelligence</h3>
            <p>AI is already being used to personalize learning and provide feedback to students. In the future, AI tutors could provide one-on-one support to students, helping them to master difficult concepts.</p>

            <h3>Virtual Reality</h3>
            <p>VR has the potential to transport students to different times and places, making learning more immersive and engaging. Imagine taking a virtual field trip to ancient Rome or exploring the human body from the inside out.</p>
        `,
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2574&auto=format&fit=crop',
        author: 'David Miller',
        date: 'Jan 12, 2024',
        likes: 342,
        comments: 112
    },
    {
        id: 6,
        title: 'Mindfulness in the Classroom',
        description: 'Techniques to help students stay focused and calm.',
        content: `
            <p>Mindfulness is the practice of paying attention to the present moment without judgment. It has been shown to reduce stress, improve focus, and increase emotional regulation. Bringing mindfulness into the classroom can benefit both students and teachers.</p>

            <h3>Simple Mindfulness Activities</h3>
            <p>There are many simple mindfulness activities that you can do with your students. For example, you can start class with a few minutes of deep breathing or guided imagery. You can also encourage students to take "mindful breaks" throughout the day to stretch or check in with their feelings.</p>
        `,
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2602&auto=format&fit=crop',
        author: 'Lisa Garcia',
        date: 'Feb 20, 2024',
        likes: 178,
        comments: 56
    }
];

export function getArticleById(id: string | number): Article | undefined {
    const articleId = typeof id === 'string' ? parseInt(id, 10) : id;
    return articles.find(article => article.id === articleId);
}
