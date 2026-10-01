import React from 'react';
import Link from 'next/link';
import './CoursesGrid.css';

import { getCoursesFromR2 } from '@/lib/r2';
import { CourseData } from '@/app/data/coursesData';

const CoursesGrid = async () => {
    const allCourses: CourseData[] = await getCoursesFromR2();
    const courses = allCourses.slice(0, 4); // Keep only first 4 for the landing page grid
    return (
        <section className="courses-grid-section">
            <div className="courses-grid">
                {courses.map((course) => (
                    <div key={course.id} className="course-card-wrapper">
                        <div className="course-card">
                            <div className="course-header">
                                <h3 className="course-title">{course.title}</h3>
                                <div className="course-icon-placeholder">
                                    {/* Placeholder for the isometric image */}
                                    <div className="iso-circle">
                                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" alt="Course Icon" className="course-img" />
                                    </div>
                                </div>
                            </div>

                            <p className="course-description">
                                {course.description}
                            </p>

                            <div className="course-footer">
                                <span className="student-count">{course.students} Students Enrolled</span>
                                <Link href={`/courses/${course.id}`}>
                                    <button className="enroll-btn">Enroll Now</button>
                                </Link>
                            </div>
                        </div>
                        <div className="course-card-shadow"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoursesGrid;
