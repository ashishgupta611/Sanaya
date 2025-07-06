'use client';

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/src/hooks/useAuth";
import { useToast } from "@/src/hooks/use-toast";
import Navbar from "@/src/components/navigation";
import CourseCard from "@/src/components/custom/course-card";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Award,
  TrendingUp,
  ArrowRight,
  Calendar,
  Target
} from "lucide-react";
import { useEffect } from "react";

type DashboardStats = {
  coursesEnrolled: number;
  coursesCompleted: number;
  hoursLearned: number;
  certificatesEarned: number;
};

export default function Dashboard() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    enabled: isAuthenticated,
  });

  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["/api/my-courses"],
    enabled: isAuthenticated,
  });

  const { data: certificates, isLoading: certificatesLoading } = useQuery({
    queryKey: ["/api/my-certificates"],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <Skeleton className="h-8 w-64" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const recentCourses = Array.isArray(enrollments) ? enrollments.slice(0, 3) : [];
  const recentCertificates = Array.isArray(certificates) ? certificates.slice(0, 3) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Dashboard</h1>
          <p className="text-gray-600">Track your progress and continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-r from-primary to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Courses Enrolled</p>
                  <p className="text-3xl font-bold">
                    {statsLoading ? (
                      <Skeleton className="h-8 w-12 bg-blue-200" />
                    ) : (
                      stats?.coursesEnrolled || 0
                    )}
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-success to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Courses Completed</p>
                  <p className="text-3xl font-bold">
                    {statsLoading ? (
                      <Skeleton className="h-8 w-12 bg-green-200" />
                    ) : (
                      stats?.coursesCompleted || 0
                    )}
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-warning to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Hours Learned</p>
                  <p className="text-3xl font-bold">
                    {statsLoading ? (
                      <Skeleton className="h-8 w-12 bg-yellow-200" />
                    ) : (
                      stats?.hoursLearned || 0
                    )}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-secondary to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Certificates</p>
                  <p className="text-3xl font-bold">
                    {statsLoading ? (
                      <Skeleton className="h-8 w-12 bg-purple-200" />
                    ) : (
                      stats?.certificatesEarned || 0
                    )}
                  </p>
                </div>
                <Award className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
              <Button variant="ghost" className="text-primary hover:text-blue-700">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {enrollmentsLoading ? (
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <Skeleton className="w-full h-48" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentCourses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses Yet</h3>
                  <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
                  <Button>Browse Courses</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {recentCourses.map((enrollment: any) => (
                  <CourseCard 
                    key={enrollment.id} 
                    course={enrollment.course} 
                    enrolled={true}
                    progress={parseFloat(enrollment.progress) || 0}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Activity */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Activity</h3>
                <div className="h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Progress Chart</p>
                    <p className="text-xs">Coming Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                <div className="space-y-4">
                  {certificatesLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-3/4 mb-1" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))
                  ) : recentCertificates.length === 0 ? (
                    <div className="text-center py-8">
                      <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No achievements yet</p>
                      <p className="text-xs text-gray-400">Complete courses to earn certificates</p>
                    </div>
                  ) : (
                    recentCertificates.map((certificate: any) => (
                      <div key={certificate.id} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Certificate Earned</p>
                          <p className="text-xs text-gray-500">{certificate.course?.title}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Study Time
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Set Learning Goals
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse New Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}