INSERT OR REPLACE INTO articles (
              id, title, description, content, author, date, category, read_time, image
            ) VALUES (
              '1', 'Effective Classroom Management', 'Strategies for maintaining a productive learning environment.',
              '', NULL, NULL,
              'Teaching', '5 min', '/images/creative-arts-course.png'
            );

INSERT OR REPLACE INTO articles (
              id, title, description, content, author, date, category, read_time, image
            ) VALUES (
              '2', 'Integrating Technology in Education', 'Tools and methods to enhance teaching with technology.',
              '', NULL, NULL,
              'EdTech', '8 min', '/images/meeting-room.png'
            );

INSERT OR REPLACE INTO users (
          email, first_name, last_name, password, role, created_at
        ) VALUES (
          'gakkhar.manan11@gmail.com', 'Manan',
          'Gakkhar', '1234567',
          'learner', '2026-04-19T16:39:21.014Z'
        );

INSERT OR REPLACE INTO users (
          email, first_name, last_name, password, role, created_at
        ) VALUES (
          'latabalasocial@gmail.com', 'Lata',
          'Bala', '123456',
          'learner', '2026-06-03T16:06:45.280Z'
        );

INSERT OR REPLACE INTO waitlist (
          doc_id, first_name, last_name, contact_number, email, age,
          foundation_importance_rating, foundational_knowledge_rating,
          business_idea, willing_to_launch_2027, business_potential_reason,
          can_give_three_hours, submitted_at
        ) VALUES (
          'MAN194444', 'Manan', 'Test1',
          '5481515818', 'manangakkhar.1104@gmail.com', 22,
          10, 10, 'Yes I have a greatest and fabulous business idea of a momo stall',
          'Yes', 'Its requires lot lot lot lot lot of money', 'Yes',
          '2026-09-25T11:34:06.804Z'
        );

INSERT OR REPLACE INTO waitlist (
          doc_id, first_name, last_name, contact_number, email, age,
          foundation_importance_rating, foundational_knowledge_rating,
          business_idea, willing_to_launch_2027, business_potential_reason,
          can_give_three_hours, submitted_at
        ) VALUES (
          'MAN632789', 'Manan', 'Gakkhar',
          '8700592976', 'gakkhar.manan11@gmail.com', 22,
          10, 10, 'Yes I have one',
          'Yes', 'Test1 idea', 'Yes',
          '2026-09-25T16:17:45.912Z'
        );

INSERT OR REPLACE INTO contact_submissions (
          id, name, email, subject, message, submitted_at
        ) VALUES (
          '0596654901', '', 'lata@gmail.com',
          'Marketing Agent', 'Test for Lata',
          '2026-04-16T15:39:42.152Z'
        );

INSERT OR REPLACE INTO contact_submissions (
          id, name, email, subject, message, submitted_at
        ) VALUES (
          '1256475296', '', 'gakkhar.manan11@gmail.com',
          'Web Developer', 'test for contact',
          '2026-04-16T15:38:09.317Z'
        );

INSERT OR REPLACE INTO contact_submissions (
          id, name, email, subject, message, submitted_at
        ) VALUES (
          '5520900812', '', 'tesst@gmail.com',
          'Testing', 'jcwn',
          '2026-04-21T15:45:48.244Z'
        );

INSERT OR REPLACE INTO articles (
              id, title, description, content, author, date, category, read_time, image
            ) VALUES (
              '1', 'Effective Classroom Management', 'Strategies for maintaining a productive learning environment.',
              '', NULL, NULL,
              'Teaching', '5 min', '/images/creative-arts-course.png'
            );

INSERT OR REPLACE INTO articles (
              id, title, description, content, author, date, category, read_time, image
            ) VALUES (
              '2', 'Integrating Technology in Education', 'Tools and methods to enhance teaching with technology.',
              '', NULL, NULL,
              'EdTech', '8 min', '/images/meeting-room.png'
            );

INSERT OR REPLACE INTO articles (
            id, title, description, content, author, date, category, read_time, image
          ) VALUES (
            1, 'Effective Classroom Management Techniques', 'Strategies for maintaining a productive learning environment.',
            '
            <p>Classroom management is one of the most challenging aspects of teaching, yet it is crucial for creating an environment where learning can flourish. Effective classroom management goes beyond just discipline; it involves building relationships, setting clear expectations, and engaging students in the learning process.</p>
            
            <h3>1. Establish Clear Rules and Routines</h3>
            <p>From the very first day of school, it is important to establish clear rules and routines. Students need to know what is expected of them in terms of behavior and academic work. Involve students in creating these rules to give them a sense of ownership.</p>

            <h3>2. Build Positive Relationships</h3>
            <p>Building positive relationships with your students is the foundation of effective classroom management. When students feel respected and valued, they are more likely to behave well and engage in learning. Take the time to get to know your students'' interests and backgrounds.</p>

            <h3>3. Use Positive Reinforcement</h3>
            <p>Positive reinforcement is a powerful tool for encouraging good behavior. Acknowledge and praise students when they follow the rules or make a good effort. This can be as simple as a verbal compliment, a sticker, or a note home to parents.</p>

            <h3>4. Be Consistent</h3>
            <p>Consistency is key. If you have a rule, you must enforce it every time. If you are inconsistent, students will be confused and may test the limits. Make sure the consequences for breaking rules are fair and predictable.</p>
        ', 'Sarah Jenkins', 'Oct 15, 2023',
            NULL, NULL, 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2604&auto=format&fit=crop'
          );

INSERT OR REPLACE INTO articles (
            id, title, description, content, author, date, category, read_time, image
          ) VALUES (
            2, 'Integrating Technology in Education', 'Tools and methods to enhance teaching with technology.',
            '
            <p>Technology has revolutionized the way we live and work, and it is also transforming education. Integrating technology into the classroom can enhance teaching and learning, making it more engaging and effective.</p>

            <h3>Benefits of Technology in Education</h3>
            <p>There are many benefits to using technology in the classroom. It can provide students with access to a wealth of information, allow for personalized learning, and foster collaboration and creativity. Technology can also help teachers to track student progress and provide timely feedback.</p>

            <h3>Tools for the Classroom</h3>
            <p>There are countless educational apps and tools available for teachers. Interactive whiteboards, tablets, and online learning platforms are just a few examples. When choosing technology tools, it is important to select ones that align with your learning goals and are appropriate for your students'' age and ability levels.</p>
        ', 'Mark Thompson', 'Nov 02, 2023',
            NULL, NULL, 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop'
          );

INSERT OR REPLACE INTO articles (
            id, title, description, content, author, date, category, read_time, image
          ) VALUES (
            3, 'Understanding Student Learning Styles', 'Identifying and catering to different student learning preferences.',
            '
            <p>Every student learns differently. Some are visual learners, while others are auditory or kinesthetic learners. Understanding these different learning styles can help teachers to differentiate instruction and meet the needs of all students.</p>

            <h3>Visual Learners</h3>
            <p>Visual learners learn best by seeing. They benefit from using charts, graphs, diagrams, and videos. They also like to take notes and use color-coding.</p>

            <h3>Auditory Learners</h3>
            <p>Auditory learners learn best by hearing. They benefit from listening to lectures, participating in discussions, and using audiobooks. They may also like to read aloud to themselves.</p>

            <h3>Kinesthetic Learners</h3>
            <p>Kinesthetic learners learn best by doing. They benefit from hands-on activities, experiments, and movement. They may have trouble sitting still for long periods of time.</p>
        ', 'Dr. Emily Chen', 'Sep 28, 2023',
            NULL, NULL, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2622&auto=format&fit=crop'
          );

INSERT OR REPLACE INTO articles (
            id, title, description, content, author, date, category, read_time, image
          ) VALUES (
            4, 'Creating Engaging Lesson Plans', 'Tips for designing lessons that captivate and educate.',
            '
            <p>A well-planned lesson is the key to a successful class. Engaging lesson plans capture students'' attention and keep them motivated to learn.</p>

            <h3>Start with a Hook</h3>
            <p>Begin your lesson with something that will grab your students'' interest. This could be a question, a story, a video, or a demonstration. The goal is to make them curious about what they are going to learn.</p>

            <h3>Use a Variety of Activities</h3>
            <p>Don''t just lecture for the entire class period. Mix things up with a variety of activities, such as group work, discussions, games, and hands-on projects. This will help to keep students engaged and prevent boredom.</p>
        ', 'Jessica Williams', 'Dec 05, 2023',
            NULL, NULL, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop'
          );

INSERT OR REPLACE INTO articles (
            id, title, description, content, author, date, category, read_time, image
          ) VALUES (
            5, 'The Future of Online Learning', 'Exploring trends and predictions for the digital classroom.',
            '
            <p>Online learning has grown exponentially in recent years, and it shows no signs of slowing down. As technology continues to advance, we can expect to see even more innovative and immersive online learning experiences.</p>

            <h3>Artificial Intelligence</h3>
            <p>AI is already being used to personalize learning and provide feedback to students. In the future, AI tutors could provide one-on-one support to students, helping them to master difficult concepts.</p>

            <h3>Virtual Reality</h3>
            <p>VR has the potential to transport students to different times and places, making learning more immersive and engaging. Imagine taking a virtual field trip to ancient Rome or exploring the human body from the inside out.</p>
        ', 'David Miller', 'Jan 12, 2024',
            NULL, NULL, 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2574&auto=format&fit=crop'
          );

INSERT OR REPLACE INTO articles (
            id, title, description, content, author, date, category, read_time, image
          ) VALUES (
            6, 'Mindfulness in the Classroom', 'Techniques to help students stay focused and calm.',
            '
            <p>Mindfulness is the practice of paying attention to the present moment without judgment. It has been shown to reduce stress, improve focus, and increase emotional regulation. Bringing mindfulness into the classroom can benefit both students and teachers.</p>

            <h3>Simple Mindfulness Activities</h3>
            <p>There are many simple mindfulness activities that you can do with your students. For example, you can start class with a few minutes of deep breathing or guided imagery. You can also encourage students to take "mindful breaks" throughout the day to stretch or check in with their feelings.</p>
        ', 'Lisa Garcia', 'Feb 20, 2024',
            NULL, NULL, 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2602&auto=format&fit=crop'
          );

INSERT OR REPLACE INTO community_posts (
              id, author, author_role, avatar, content, image, likes, shares, comments_json, created_at
            ) VALUES (
              '1', 'Sarah Jenkins', 'Investment Analyst',
              '/images/instructor-mark.png', 'Market volatility is high this week. Our latest analysis suggests a shift towards defensive assets.', '/images/creative-arts-course.png',
              124, 12,
              '[{"id":"c1","author":"Mark Doe","avatar":"/images/instructor-mark.png","text":"Great insights Sarah!","timestamp":"2h ago"}]', '2026-09-30T16:13:58.499Z'
            );

INSERT OR REPLACE INTO community_posts (
              id, author, author_role, avatar, content, image, likes, shares, comments_json, created_at
            ) VALUES (
              '2', 'David Chen', 'Founder @ FinTech Solutions',
              '/images/meeting-room.png', 'Excited to announce our Series A funding round!', '/images/meeting-room.png',
              856, 204,
              '[]', '2026-09-30T16:13:58.499Z'
            );

INSERT OR REPLACE INTO kv_store (key, value, updated_at) VALUES (
          'data/community.json', '{"posts":[{"id":"1","author":"Sarah Jenkins","authorRole":"Investment Analyst","avatar":"/images/instructor-mark.png","content":"Market volatility is high this week. Our latest analysis suggests a shift towards defensive assets.","image":"/images/creative-arts-course.png","likes":124,"commentsSize":45,"shares":12,"comments":[{"id":"c1","author":"Mark Doe","avatar":"/images/instructor-mark.png","text":"Great insights Sarah!","timestamp":"2h ago"}],"timestamp":"2h","isLiked":false},{"id":"2","author":"David Chen","authorRole":"Founder @ FinTech Solutions","avatar":"/images/meeting-room.png","content":"Excited to announce our Series A funding round!","image":"/images/meeting-room.png","likes":856,"commentsSize":120,"shares":204,"comments":[],"timestamp":"5h","isLiked":true}],"myCommunities":[{"id":"1","title":"Global Markets Study","members":1250,"description":"Daily analysis and discussions.","open":true,"category":"Analysis"},{"id":"2","title":"FinTech Founders Network","members":420,"description":"A community for founders.","open":false,"category":"Networking"}],"discoverCommunities":[{"id":"101","title":"Crypto Assets & Blockchain","members":3500,"description":"Deep dive into blockchain tech.","open":true,"category":"Tech"},{"id":"102","title":"Private Equity Circle","members":150,"description":"Exclusive group for PE professionals.","open":false,"category":"Exclusive"}]}', '2026-09-30T16:13:58.499Z'
        );

INSERT OR REPLACE INTO courses (
              id, title, category, image, hours, author, description, full_description,
              students, rating, stars, price
            ) VALUES (
              1, 'Entrepreneurship (Basic)', NULL,
              'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop', 60, 'John Smith',
              'Learn the fundamentals of entrepreneurship and how to start your own business from scratch', 'Want to start your own business but don''t know where to begin? This comprehensive course will guide you through the fundamentals of entrepreneurship, from ideation to execution. Learn how to identify market opportunities, create a business plan, secure funding, and launch your venture successfully.',
              250, 98, 5,
              17.99
            );

INSERT OR REPLACE INTO courses (
              id, title, category, image, hours, author, description, full_description,
              students, rating, stars, price
            ) VALUES (
              2, 'Entrepreneurship (Intermediate)', NULL,
              'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop', 35, 'Sarah Johnson',
              'Take your business to the next level with advanced strategies for growth and scaling', 'Ready to scale your business? This intermediate course covers advanced entrepreneurship topics including growth hacking, team building, fundraising strategies, and sustainable scaling. Learn from real-world case studies and apply proven frameworks to accelerate your business growth.',
              540, 95, 5,
              17.99
            );

INSERT OR REPLACE INTO courses (
              id, title, category, image, hours, author, description, full_description,
              students, rating, stars, price
            ) VALUES (
              3, 'Entrepreneurship (Advanced)', NULL,
              'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop', 35, 'Michael Chen',
              'Master advanced entrepreneurship techniques including exit strategies, M&A, and building unicorn companies', 'Elevate your entrepreneurial journey to the highest level. This advanced course covers sophisticated topics like exit strategies, mergers and acquisitions, building unicorn companies, and creating lasting business legacies. Learn from industry titans and apply elite-level strategies.',
              384, 100, 5,
              17.99
            );

INSERT OR REPLACE INTO courses (
              id, title, category, image, hours, author, description, full_description,
              students, rating, stars, price
            ) VALUES (
              4, 'Finances Handling', NULL,
              'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2626&auto=format&fit=crop', 40, 'David Martinez',
              'Master personal and business finance management, budgeting, and financial planning', 'Take control of your finances with this comprehensive course on financial management. Learn how to create budgets, manage cash flow, make smart investment decisions, and build long-term wealth. Perfect for both personal finance and business financial management.',
              325, 98, 5,
              17.99
            );

INSERT OR REPLACE INTO courses (
              id, title, category, image, hours, author, description, full_description,
              students, rating, stars, price
            ) VALUES (
              5, 'Tax Management', NULL,
              'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2626&auto=format&fit=crop', 56, 'Emily Rodriguez',
              'Navigate tax laws, maximize deductions, and ensure compliance for individuals and businesses', 'Demystify taxes with this comprehensive course on tax management. Learn how to navigate complex tax laws, maximize deductions, plan for tax efficiency, and ensure compliance. Covers both personal and business taxation strategies.',
              875, 95, 5,
              17.99
            );

INSERT OR REPLACE INTO courses (
              id, title, category, image, hours, author, description, full_description,
              students, rating, stars, price
            ) VALUES (
              6, 'Combined Finance Consulting', NULL,
              'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2671&auto=format&fit=crop', 27, 'Robert Thompson',
              'Comprehensive financial consulting covering investment, retirement planning, and wealth management', 'Get a complete financial education with this all-in-one consulting course. Covers investment strategies, retirement planning, wealth management, estate planning, and more. Learn how to build and protect your wealth for generations.',
              675, 100, 5,
              17.99
            );

INSERT OR REPLACE INTO courses (
            id, title, category, image, hours, author, description, full_description,
            students, rating, stars, price
          ) VALUES (
            1, 'Entrepreneurship (Basic)', NULL,
            'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop', 60, 'John Smith',
            'Learn the fundamentals of entrepreneurship and how to start your own business from scratch', 'Want to start your own business but don''t know where to begin? This comprehensive course will guide you through the fundamentals of entrepreneurship, from ideation to execution. Learn how to identify market opportunities, create a business plan, secure funding, and launch your venture successfully.',
            250, 98, 5,
            17.99
          );

INSERT OR REPLACE INTO courses (
            id, title, category, image, hours, author, description, full_description,
            students, rating, stars, price
          ) VALUES (
            2, 'Entrepreneurship (Intermediate)', NULL,
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop', 35, 'Sarah Johnson',
            'Take your business to the next level with advanced strategies for growth and scaling', 'Ready to scale your business? This intermediate course covers advanced entrepreneurship topics including growth hacking, team building, fundraising strategies, and sustainable scaling. Learn from real-world case studies and apply proven frameworks to accelerate your business growth.',
            540, 95, 5,
            17.99
          );

INSERT OR REPLACE INTO courses (
            id, title, category, image, hours, author, description, full_description,
            students, rating, stars, price
          ) VALUES (
            3, 'Entrepreneurship (Advanced)', NULL,
            'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop', 35, 'Michael Chen',
            'Master advanced entrepreneurship techniques including exit strategies, M&A, and building unicorn companies', 'Elevate your entrepreneurial journey to the highest level. This advanced course covers sophisticated topics like exit strategies, mergers and acquisitions, building unicorn companies, and creating lasting business legacies. Learn from industry titans and apply elite-level strategies.',
            384, 100, 5,
            17.99
          );

INSERT OR REPLACE INTO courses (
            id, title, category, image, hours, author, description, full_description,
            students, rating, stars, price
          ) VALUES (
            4, 'Finances Handling', NULL,
            'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2626&auto=format&fit=crop', 40, 'David Martinez',
            'Master personal and business finance management, budgeting, and financial planning', 'Take control of your finances with this comprehensive course on financial management. Learn how to create budgets, manage cash flow, make smart investment decisions, and build long-term wealth. Perfect for both personal finance and business financial management.',
            325, 98, 5,
            17.99
          );

INSERT OR REPLACE INTO courses (
            id, title, category, image, hours, author, description, full_description,
            students, rating, stars, price
          ) VALUES (
            5, 'Tax Management', NULL,
            'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2626&auto=format&fit=crop', 56, 'Emily Rodriguez',
            'Navigate tax laws, maximize deductions, and ensure compliance for individuals and businesses', 'Demystify taxes with this comprehensive course on tax management. Learn how to navigate complex tax laws, maximize deductions, plan for tax efficiency, and ensure compliance. Covers both personal and business taxation strategies.',
            875, 95, 5,
            17.99
          );

INSERT OR REPLACE INTO courses (
            id, title, category, image, hours, author, description, full_description,
            students, rating, stars, price
          ) VALUES (
            6, 'Combined Finance Consulting', NULL,
            'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2671&auto=format&fit=crop', 27, 'Robert Thompson',
            'Comprehensive financial consulting covering investment, retirement planning, and wealth management', 'Get a complete financial education with this all-in-one consulting course. Covers investment strategies, retirement planning, wealth management, estate planning, and more. Learn how to build and protect your wealth for generations.',
            675, 100, 5,
            17.99
          );

INSERT OR REPLACE INTO kv_store (key, value, updated_at) VALUES (
          'data/dashboard.json', '{"featuredCourses":["Product Design","Web Development","Data Science"],"continueWatching":[{"id":1,"title":"Beginner''s Guide To Becoming A Professional Frontend Developer","progress":66,"instructor":"Aryan","category":"FRONTEND"},{"id":2,"title":"Advanced React Patterns","progress":30,"instructor":"Sarah","category":"REACT"},{"id":3,"title":"UI/UX Masterclass","progress":10,"instructor":"David","category":"DESIGN"}],"mentors":[{"name":"Prashant Kumar","date":"25/2/2023","course":"Understanding Concept Of React","category":"FRONTEND"},{"name":"Ravi Kumar","date":"25/2/2023","course":"Advanced State Management","category":"REACT"}]}', '2026-09-30T16:14:01.924Z'
        );

INSERT OR IGNORE INTO meetings (
              title, scheduled_date, scheduled_time, attendees, meet_code, password
            ) VALUES (
              'Weekly Sync', 'Today, 10:00 AM', '10:00 AM',
              5, 'abc-xyz', ''
            );

INSERT OR IGNORE INTO meetings (
              title, scheduled_date, scheduled_time, attendees, meet_code, password
            ) VALUES (
              'Project Review', 'Tomorrow, 2:00 PM', '2:00 PM',
              12, 'def-uvw', 'pass'
            );

INSERT OR REPLACE INTO kv_store (key, value, updated_at) VALUES (
          'data/resources.json', '{"courseMaterials":[{"id":"1","title":"Financial Markets 101","type":"folder","updated":"2 hours ago","size":"1.2 GB","items":[{"id":"1-1","title":"Syllabus.pdf","type":"document","size":"2.4 MB","updated":"Yesterday","author":"Dr. Smith"},{"id":"1-2","title":"Lecture 1.mp4","type":"video","size":"450 MB","updated":"2 days ago","author":"Dr. Smith"}]},{"id":"2","title":"Business Strategy","type":"folder","updated":"Yesterday","size":"850 MB","items":[]}],"studyGuides":[{"id":"sg-1","title":"Accounting Basics Guide","type":"document","size":"1.2 MB","updated":"2 days ago","author":"Department"}],"lectureNotes":[{"id":"ln-1","title":"Economics Lecture 1","type":"document","size":"450 KB","updated":"Today","author":"Prof"}]}', '2026-09-30T16:14:02.441Z'
        );

INSERT OR REPLACE INTO tasks (
              id, title, description, course, assign_to, assign_type, deadline, due_date, points, status, created_at, updated_at
            ) VALUES (
              '1', 'Market Analysis Report', 'Analyze the current trends in the S&P 500...',
              'Financial Markets 101', '', '',
              '', 'Today, 11:59 PM', 100,
              'pending', '', ''
            );

INSERT OR REPLACE INTO tasks (
              id, title, description, course, assign_to, assign_type, deadline, due_date, points, status, created_at, updated_at
            ) VALUES (
              '2', 'SWOT Analysis', 'Perform a SWOT analysis for a chosen tech startup.',
              'Business Strategy', '', '',
              '', 'Tomorrow, 5:00 PM', 50,
              'pending', '', ''
            );

INSERT OR REPLACE INTO tasks (
              id, title, description, course, assign_to, assign_type, deadline, due_date, points, status, created_at, updated_at
            ) VALUES (
              '3', 'Calculus Problem Set 3', 'Solve problems 1-15 in Chapter 4 of the textbook.',
              'Introduction to Calculus', '', '',
              '', 'Yesterday', 30,
              'overdue', '', ''
            );

INSERT OR REPLACE INTO tasks (
              id, title, description, course, assign_to, assign_type, deadline, due_date, points, status, created_at, updated_at
            ) VALUES (
              '4', 'History Essay', 'Write an essay on the industrial revolution.',
              'World History', '', '',
              '', 'Completed', 100,
              'submitted', '', ''
            );

INSERT OR REPLACE INTO users (
          email, first_name, last_name, password, role, created_at
        ) VALUES (
          'edtech.pp01@gmail.com', 'Powe',
          'Test1', '12345',
          'learner', '2026-03-23T05:15:06.029Z'
        );

INSERT OR REPLACE INTO community_posts (
              id, author, author_role, avatar, content, image, likes, shares, comments_json, created_at
            ) VALUES (
              '1', 'Sarah Jenkins', 'Investment Analyst',
              '/images/instructor-mark.png', 'Market volatility is high this week. Our latest analysis suggests a shift towards defensive assets.', '/images/creative-arts-course.png',
              124, 12,
              '[{"id":"c1","author":"Mark Doe","avatar":"/images/instructor-mark.png","text":"Great insights Sarah!","timestamp":"2h ago"}]', '2026-09-30T16:14:03.129Z'
            );

INSERT OR REPLACE INTO community_posts (
              id, author, author_role, avatar, content, image, likes, shares, comments_json, created_at
            ) VALUES (
              '2', 'David Chen', 'Founder @ FinTech Solutions',
              '/images/meeting-room.png', 'Excited to announce our Series A funding round!', '/images/meeting-room.png',
              856, 204,
              '[]', '2026-09-30T16:14:03.129Z'
            );

INSERT OR REPLACE INTO kv_store (key, value, updated_at) VALUES (
          'learner/community.json', '{"posts":[{"id":"1","author":"Sarah Jenkins","authorRole":"Investment Analyst","avatar":"/images/instructor-mark.png","content":"Market volatility is high this week. Our latest analysis suggests a shift towards defensive assets.","image":"/images/creative-arts-course.png","likes":124,"commentsSize":45,"shares":12,"comments":[{"id":"c1","author":"Mark Doe","avatar":"/images/instructor-mark.png","text":"Great insights Sarah!","timestamp":"2h ago"}],"timestamp":"2h","isLiked":false},{"id":"2","author":"David Chen","authorRole":"Founder @ FinTech Solutions","avatar":"/images/meeting-room.png","content":"Excited to announce our Series A funding round!","image":"/images/meeting-room.png","likes":856,"commentsSize":120,"shares":204,"comments":[],"timestamp":"5h","isLiked":true}],"myCommunities":[{"id":"1","title":"Global Markets Study","members":1250,"description":"Daily analysis and discussions.","open":true,"category":"Analysis"},{"id":"2","title":"FinTech Founders Network","members":420,"description":"A community for founders.","open":false,"category":"Networking"}],"discoverCommunities":[{"id":"101","title":"Crypto Assets & Blockchain","members":3500,"description":"Deep dive into blockchain tech.","open":true,"category":"Tech"},{"id":"102","title":"Private Equity Circle","members":150,"description":"Exclusive group for PE professionals.","open":false,"category":"Exclusive"}]}', '2026-09-30T16:14:03.129Z'
        );

INSERT OR REPLACE INTO kv_store (key, value, updated_at) VALUES (
          'learner/dashboard.json', '{"featuredCourses":["Product Design","Web Development","Data Science"],"continueWatching":[{"id":1,"title":"Beginner''s Guide To Becoming A Professional Frontend Developer","progress":66,"instructor":"Aryan","category":"FRONTEND"},{"id":2,"title":"Advanced React Patterns","progress":30,"instructor":"Sarah","category":"REACT"},{"id":3,"title":"UI/UX Masterclass","progress":10,"instructor":"David","category":"DESIGN"}],"mentors":[{"name":"Prashant Kumar","date":"25/2/2023","course":"Understanding Concept Of React","category":"FRONTEND"},{"name":"Ravi Kumar","date":"25/2/2023","course":"Advanced State Management","category":"REACT"}]}', '2026-09-30T16:14:03.362Z'
        );

INSERT OR IGNORE INTO meetings (
              title, scheduled_date, scheduled_time, attendees, meet_code, password
            ) VALUES (
              'Weekly Sync', 'April 16, 2026', '10:00 AM',
              5, 'abc-xyz', ''
            );

INSERT OR IGNORE INTO meetings (
              title, scheduled_date, scheduled_time, attendees, meet_code, password
            ) VALUES (
              'Project Review', 'April 17, 2026', '2:00 PM',
              12, 'def-uvw', 'pass'
            );

INSERT OR REPLACE INTO kv_store (key, value, updated_at) VALUES (
          'learner/resources.json', '{"courseMaterials":[{"id":"1","title":"Financial Markets 101","type":"folder","updated":"2 hours ago","size":"1.2 GB","items":[{"id":"1-1","title":"Syllabus.pdf","type":"document","size":"2.4 MB","updated":"Yesterday","author":"Dr. Smith"},{"id":"1-2","title":"Lecture 1.mp4","type":"video","size":"450 MB","updated":"2 days ago","author":"Dr. Smith"}]},{"id":"2","title":"Business Strategy","type":"folder","updated":"Yesterday","size":"850 MB","items":[]}],"studyGuides":[{"id":"sg-1","title":"Accounting Basics Guide","type":"document","size":"1.2 MB","updated":"2 days ago","author":"Department"}],"lectureNotes":[{"id":"ln-1","title":"Economics Lecture 1","type":"document","size":"450 KB","updated":"Today","author":"Prof"}]}', '2026-09-30T16:14:03.854Z'
        );

INSERT OR REPLACE INTO tasks (
              id, title, description, course, assign_to, assign_type, deadline, due_date, points, status, created_at, updated_at
            ) VALUES (
              '2', 'SWOT Analysis', 'Perform a SWOT analysis for a chosen tech startup.',
              'Business Strategy', '', '',
              '', 'Tomorrow, 5:00 PM', 50,
              'pending', '', ''
            );

INSERT OR REPLACE INTO tasks (
              id, title, description, course, assign_to, assign_type, deadline, due_date, points, status, created_at, updated_at
            ) VALUES (
              '3', 'Calculus Problem Set 3', 'Solve problems 1-15 in Chapter 4 of the textbook.',
              'Introduction to Calculus', '', '',
              '', 'Yesterday', 30,
              'overdue', '', ''
            );

INSERT OR REPLACE INTO tasks (
              id, title, description, course, assign_to, assign_type, deadline, due_date, points, status, created_at, updated_at
            ) VALUES (
              '4', 'History Essay', 'Write an essay on the industrial revolution.',
              'World History', '', '',
              '', 'Completed', 100,
              'submitted', '', ''
            );

INSERT OR REPLACE INTO task_submissions (
              id, task_id, task_title, learner_name, description, attachment_name, status, submitted_at
            ) VALUES (
              '1777389785199', '1777389742081', 'Business Development',
              'Current Learner', 'ubjbjnn;o;m;po''mknoinonkln', 'Manan_Gakkhar_resume.pdf',
              'submitted', '2026-04-28T15:23:05.199Z'
            );

INSERT OR REPLACE INTO task_submissions (
              id, task_id, task_title, learner_name, description, attachment_name, status, submitted_at
            ) VALUES (
              '1777391002993', '1777390956684', 'Buisness development',
              'Current Learner', 'i have submitted the task', 'Manan_Gakkhar_resume.pdf',
              'submitted', '2026-04-28T15:43:22.993Z'
            );

INSERT OR REPLACE INTO tasks (
              id, title, description, course, assign_to, assign_type, deadline, due_date, points, status, created_at, updated_at
            ) VALUES (
              '1776870812121', 'Swot Analysis', 'Related to the discussion of SWOT Product analysis and research',
              '', 'Batch 1', 'batch',
              '2026-04-29', '', 0,
              'active', '2026-04-22T15:13:32.121Z', '2026-04-22T15:20:02.372Z'
            );

INSERT OR REPLACE INTO tasks (
              id, title, description, course, assign_to, assign_type, deadline, due_date, points, status, created_at, updated_at
            ) VALUES (
              '1777390956684', 'Buisness development', 'c  n c ajx max jcnjncj c z c',
              '', 'Batch 1', 'batch',
              '2026-05-19', '', 0,
              'active', '2026-04-28T15:42:36.684Z', ''
            );