import Image from "next/image";
import Link from "next/link";
import { Star, Users, ThumbsUp, Play, Clock, FileText, Monitor, Download, ArrowRight } from "lucide-react";
import { findCourseById, findSimilarCourses } from "@/lib/r2";
import { CourseData } from "@/app/data/coursesData";
import { notFound } from "next/navigation";
import CourseComments from "./CourseComments";

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const courseId = parseInt(id);
    const course = await findCourseById(courseId);

    if (!course) {
        notFound();
    }

    const similarCourses = await findSimilarCourses(courseId);

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="container mx-auto px-4 pt-6">

                {/* Header Info */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                        <span>A course by <span className="font-semibold text-gray-900">{course.author}</span></span>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{course.students} Students</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{course.rating}% Satisfaction</span>
                        </div>
                        <button className="text-gray-500 hover:text-gray-900 flex items-center gap-1">
                            + Add to Wishlist
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Video Placeholder */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 group cursor-pointer">
                            <Image
                                src={course.image}
                                alt="Course Preview"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg backdrop-blur-sm">
                                    <Play className="w-8 h-8 text-blue-600 fill-blue-600" />
                                </div>
                            </div>
                        </div>

                        {/* Course Description */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                About This Course
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {course.fullDescription}
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                {course.description}
                            </p>
                        </div>

                        {/* Meeting Image */}
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                            <Image
                                src={course.image}
                                alt="Course Context"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Who is this for */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Who is this online course for?</h3>
                            <p className="text-gray-600">
                                {course.whoIsThisFor}
                            </p>
                        </div>

                        {/* Requirements */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Requirements and Materials</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {course.requirements.map((req: string, index: number) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Course Summary */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Course Summary</h3>
                            <div className="bg-[#ff9b50] rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-[#367c9f] rounded-full text-white">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium text-gray-900">{course.lessons} Lessons ({course.hours} Hours)</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-[#367c9f] rounded-full text-white">
                                        <Download className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium text-gray-900">{course.downloadableResources} Downloadable Resources</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-[#367c9f] rounded-full text-white">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium text-gray-900">{course.exercises} Exercises</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-[#367c9f] rounded-full text-white">
                                        <Monitor className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium text-gray-900">Course Final Project</span>
                                </div>
                            </div>
                        </div>

                        {/* Comments */}
                        <CourseComments initialComments={course.comments || []} courseId={courseId} />

                        {/* Similar Courses */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Similar courses for you</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {similarCourses.map((similarCourse: CourseData) => (
                                    <Link key={similarCourse.id} href={`/courses/${similarCourse.id}`}>
                                        <div className="bg-[#ff9b50] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                            <div className="relative h-48">
                                                <Image src={similarCourse.image} alt={similarCourse.title} fill className="object-cover" />
                                                <span className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-bold">{similarCourse.hours} Hours</span>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-gray-900 mb-1">{similarCourse.title}</h4>
                                                <p className="text-sm text-gray-800 mb-2">A course by {similarCourse.author}</p>
                                                <p className="text-xs text-gray-700 mb-3 line-clamp-2">{similarCourse.description}</p>
                                                <div className="flex items-center gap-4 text-xs text-gray-800">
                                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {similarCourse.students}</span>
                                                    <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {similarCourse.rating}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-8 sticky top-24 self-start h-fit">
                        {/* Enrollment Card */}
                        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                                <Image src={course.image} alt="Preview" fill className="object-cover blur-sm" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="bg-[#367c9f] text-white font-bold py-2 px-6 rounded shadow-lg hover:bg-[#2c6684] transition-colors">
                                        Enroll Now for ${course.price}
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-bold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-600 mb-6">A course by {course.author}</p>

                            <div className="bg-[#ff9b50] rounded-xl p-6 text-white">
                                <span className="text-blue-700 font-bold text-sm mb-2 block">Free!</span>
                                <p className="text-sm text-gray-900 mb-4">
                                    Get a monthly Membership subscription for $17.99 USD and watch our exclusive courses for free, including this one!
                                    <a href="#" className="underline ml-1">Learn More</a>
                                </p>
                                <button className="w-full bg-[#367c9f] hover:bg-[#2c6684] text-white font-bold py-3 rounded-lg transition-colors shadow-md">
                                    Subscribe Now
                                </button>
                            </div>
                        </div>

                        {/* Instructor Card */}
                        <div className="bg-[#ff9b50] rounded-xl overflow-hidden">
                            <div className="p-4 text-center border-b border-white/10">
                                <Users className="w-6 h-6 mx-auto mb-2 text-gray-800" />
                                <h3 className="font-bold text-gray-900">Course Provided by {course.instructorName}</h3>
                            </div>
                            <div className="p-6 text-sm text-gray-900 space-y-4">
                                <p>{course.instructorBio}</p>
                            </div>
                            <div className="bg-[#367c9f] p-3 text-center font-bold text-white">
                                About the Instructor
                            </div>
                            <div className="p-6 flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white flex-shrink-0 relative">
                                    <Image src={course.instructorImage} alt={course.instructorName} fill className="object-cover" />
                                </div>
                                <div className="text-sm text-gray-900">
                                    <p className="mb-2 font-bold">{course.instructorName} is a talented professional...</p>
                                    <p>With years of experience in the field, they bring real-world expertise to every lesson.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
