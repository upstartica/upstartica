import React from 'react';
import Sidebar from '../components/courses/Sidebar';
import CourseCard from '../components/courses/CourseCard';
import Footer from '../components/landing/Footer';
import './courses.css';
import { ChevronDown } from 'lucide-react';
import { getCoursesFromR2 } from '@/lib/r2';
import { CourseData } from '../data/coursesData';

export default async function CoursesPage() {
    const courses: CourseData[] = await getCoursesFromR2();
    return (
        <div className="courses-page">
            <div className="courses-layout">
                <Sidebar />

                <main className="courses-main">
                    <div className="courses-header">
                        <h1 className="page-title">Courses</h1>
                        <div className="sort-dropdown">
                            Sort by: <strong>Popular</strong> <ChevronDown size={16} />
                        </div>
                    </div>

                    <div className="courses-grid-container">
                        {courses.map((course: CourseData) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    <div className="load-more-container">
                        <p>Scroll Down to see more courses</p>
                        <ChevronDown size={24} />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
