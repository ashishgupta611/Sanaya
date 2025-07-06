'use client';

import { useQuery } from '@tanstack/react-query';
import Navbar from '@/src/components/navigation';
import CourseCard from '@/src/components/custom/course-card';
import CategoryCard from '@/src/components/custom/category-card';
import { Skeleton } from '@/src/components/ui/skeleton';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Course, Category, Enrollment } from '@/src/shared/schema';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses', searchQuery],
    queryFn: async () => {
      const url = searchQuery
        ? `/api/courses?search=${encodeURIComponent(searchQuery)}`
        : '/api/courses';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch courses');
      return response.json();
    },
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json();
    },
  });

  const { data: myEnrollments } = useQuery<Enrollment[]>({
    queryKey: ['/api/my-courses'],
    queryFn: async () => {
      const response = await fetch('/api/my-courses');
      if (!response.ok) throw new Error('Failed to fetch enrollments');
      return response.json();
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the query dependency
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Continue Your Learning Journey</h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover new courses and advance your skills
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white border-0 rounded-lg focus:ring-2 focus:ring-white"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* My Courses Section */}
      {myEnrollments && myEnrollments.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">My Learning</h2>
              <Button variant="outline" className="flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEnrollments.slice(0, 3).map((enrollment: any) => (
                <CourseCard key={enrollment.id} course={enrollment.course} enrolled={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from a wide range of subjects and start building skills that matter to your
              career.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categoriesLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="text-center p-6">
                    <Skeleton className="w-16 h-16 rounded-xl mx-auto mb-4" />
                    <Skeleton className="h-4 w-20 mx-auto mb-2" />
                    <Skeleton className="h-3 w-16 mx-auto" />
                  </div>
                ))
              : categories?.map((category: any) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Courses'}
              </h2>
              <p className="text-gray-600">
                {searchQuery
                  ? 'Courses matching your search'
                  : 'Popular courses chosen by our learning community'}
              </p>
            </div>
            {!searchQuery && (
              <Button variant="ghost" className="text-primary hover:text-blue-700">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-32 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                </div>
              ))
            ) : courses?.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery ? 'No courses found matching your search' : 'No courses available'}
                </p>
              </div>
            ) : (
              courses?.map((course: any) => <CourseCard key={course.id} course={course} />)
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
