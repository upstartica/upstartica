import React from 'react';
import Link from 'next/link';
import './CourseCard.css';
import { User, ThumbsUp, Star } from 'lucide-react';

interface CourseProps {
    id: number | string;
    title: string;
    image: string;
    hours: number;
    author: string;
    description: string;
    students: number;
    rating: number; // percentage like 98
    stars: number; // 1-5
    price: number;
}

const CourseCard = ({ course }: { course: CourseProps }) => {
    return (
        <div className="course-card-item">
            <div className="course-image-wrapper">
                <Link href={`/courses/${course.id}`}>
                    <img src={course.image} alt={course.title} className="course-card-img" />
                </Link>
                <span className="hours-badge">{course.hours} Hours</span>
            </div>

            <div className="course-card-content">
                <Link href={`/courses/${course.id}`} className="hover:text-blue-600 transition-colors">
                    <h3 className="course-card-title">{course.title}</h3>
                </Link>
                <p className="course-author">A course by {course.author}</p>

                <p className="course-card-desc">
                    {course.description}
                </p>

                <div className="course-stats">
                    <div className="stat-group">
                        <span className="stat-icon"><User size={14} /></span>
                        <span>{course.students}</span>
                    </div>
                    <div className="stat-group">
                        <span className="stat-icon"><ThumbsUp size={14} /></span>
                        <span>{course.rating}%</span>
                    </div>

                    <div className="star-rating">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={i < course.stars ? "star-filled" : "star-empty"}
                                fill={i < course.stars ? "#FFD700" : "none"}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Link href={`/courses/${course.id}`} className="course-enroll-btn block text-center">
                Enroll for ${course.price}
            </Link>
        </div>
    );
};

export default CourseCard;
