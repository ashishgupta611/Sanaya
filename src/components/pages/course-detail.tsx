// import { useQuery, useMutation } from "@tanstack/react-query";
// import { useParams, useLocation } from "wouter";
// import { useAuth } from "@/hooks/useAuth";
// import { apiRequest, queryClient } from "@/lib/queryClient";
// import { isUnauthorizedError } from "@/lib/authUtils";
// import { useToast } from "@/hooks/use-toast";
// import Navbar from "@/components/navbar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Progress } from "@/components/ui/progress";
// import { 
//   Clock, 
//   Play, 
//   Users, 
//   Star, 
//   BookOpen, 
//   Award,
//   CheckCircle,
//   Lock
// } from "lucide-react";
// import { useEffect } from "react";

// export default function CourseDetail() {
//   const { id } = useParams();
//   const [, setLocation] = useLocation();
//   const { user, isAuthenticated, isLoading: authLoading } = useAuth();
//   const { toast } = useToast();

//   const courseId = parseInt(id || "0");

//   const { data: course, isLoading: courseLoading } = useQuery({
//     queryKey: ["/api/courses", courseId],
//     queryFn: async () => {
//       const response = await fetch(`/api/courses/${courseId}`);
//       if (!response.ok) throw new Error("Failed to fetch course");
//       return response.json();
//     },
//     enabled: !!courseId,
//   });

//   const { data: lessons, isLoading: lessonsLoading } = useQuery({
//     queryKey: ["/api/courses", courseId, "lessons"],
//     queryFn: async () => {
//       const response = await fetch(`/api/courses/${courseId}/lessons`);
//       if (!response.ok) throw new Error("Failed to fetch lessons");
//       return response.json();
//     },
//     enabled: !!courseId,
//   });

//   const { data: enrollmentStatus } = useQuery({
//     queryKey: ["/api/courses", courseId, "enrolled"],
//     enabled: isAuthenticated && !!courseId,
//   });

//   const { data: progress } = useQuery({
//     queryKey: ["/api/courses", courseId, "progress"],
//     enabled: isAuthenticated && !!courseId && enrollmentStatus?.enrolled,
//   });

//   const enrollMutation = useMutation({
//     mutationFn: async () => {
//       await apiRequest("POST", `/api/courses/${courseId}/enroll`);
//     },
//     onSuccess: () => {
//       toast({
//         title: "Success",
//         description: "Successfully enrolled in the course!",
//       });
//       queryClient.invalidateQueries({ queryKey: ["/api/courses", courseId, "enrolled"] });
//       queryClient.invalidateQueries({ queryKey: ["/api/my-courses"] });
//     },
//     onError: (error) => {
//       if (isUnauthorizedError(error)) {
//         toast({
//           title: "Unauthorized",
//           description: "You are logged out. Logging in again...",
//           variant: "destructive",
//         });
//         setTimeout(() => {
//           window.location.href = "/api/login";
//         }, 500);
//         return;
//       }
//       toast({
//         title: "Error",
//         description: "Failed to enroll in course",
//         variant: "destructive",
//       });
//     },
//   });

//   useEffect(() => {
//     if (!authLoading && !isAuthenticated) {
//       toast({
//         title: "Unauthorized",
//         description: "You are logged out. Logging in again...",
//         variant: "destructive",
//       });
//       setTimeout(() => {
//         window.location.href = "/api/login";
//       }, 500);
//       return;
//     }
//   }, [isAuthenticated, authLoading, toast]);

//   if (authLoading || courseLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <Skeleton className="w-full h-64 rounded-xl mb-6" />
//               <Skeleton className="h-8 w-3/4 mb-4" />
//               <Skeleton className="h-4 w-full mb-2" />
//               <Skeleton className="h-4 w-2/3 mb-6" />
//               <div className="flex space-x-4 mb-6">
//                 <Skeleton className="h-6 w-20" />
//                 <Skeleton className="h-6 w-20" />
//                 <Skeleton className="h-6 w-20" />
//               </div>
//             </div>
//             <div>
//               <Skeleton className="w-full h-96 rounded-xl" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
//             <p className="text-gray-600 mt-2">The course you're looking for doesn't exist.</p>
//             <Button onClick={() => setLocation("/")} className="mt-4">
//               Go Home
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const progressPercentage = progress ? (progress.completed / progress.total) * 100 : 0;
//   const isEnrolled = enrollmentStatus?.enrolled;

//   const handleStartLesson = () => {
//     if (lessons && lessons.length > 0) {
//       setLocation(`/lessons/${lessons[0].id}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             {/* Course Header */}
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
//               <img 
//                 src={course.thumbnail || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"} 
//                 alt={course.title}
//                 className="w-full h-64 object-cover"
//               />
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <Badge variant="secondary">{course.category?.name || "General"}</Badge>
//                   <div className="flex items-center space-x-1">
//                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                     <span className="text-sm font-medium text-gray-700">{course.rating || "4.5"}</span>
//                     <span className="text-sm text-gray-500">({course.studentsCount || 0})</span>
//                   </div>
//                 </div>
                
//                 <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
//                 <p className="text-gray-600 mb-6">{course.description}</p>
                
//                 <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
//                   <div className="flex items-center space-x-1">
//                     <Clock className="w-4 h-4" />
//                     <span>{Math.floor((course.duration || 0) / 60)} hours</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Play className="w-4 h-4" />
//                     <span>{lessons?.length || 0} lessons</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Users className="w-4 h-4" />
//                     <span>{course.studentsCount || 0} students</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <BookOpen className="w-4 h-4" />
//                     <span className="capitalize">{course.level}</span>
//                   </div>
//                 </div>

//                 {isEnrolled && progress && (
//                   <div className="mb-6">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-sm text-gray-600">Your Progress</span>
//                       <span className="text-sm font-medium text-primary">{Math.round(progressPercentage)}%</span>
//                     </div>
//                     <Progress value={progressPercentage} className="h-2" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Course Content */}
//             <Card>
//               <CardContent className="p-6">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Content</h2>
//                 <div className="space-y-3">
//                   {lessonsLoading ? (
//                     Array.from({ length: 5 }).map((_, i) => (
//                       <div key={i} className="flex items-center space-x-3 p-3">
//                         <Skeleton className="w-8 h-8 rounded-full" />
//                         <div className="flex-1">
//                           <Skeleton className="h-4 w-3/4 mb-1" />
//                           <Skeleton className="h-3 w-1/4" />
//                         </div>
//                       </div>
//                     ))
//                   ) : lessons?.length === 0 ? (
//                     <p className="text-gray-500 text-center py-8">No lessons available</p>
//                   ) : (
//                     lessons?.map((lesson: any, index: number) => (
//                       <div key={lesson.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
//                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                           isEnrolled ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
//                         }`}>
//                           {isEnrolled ? (
//                             <Play className="w-4 h-4" />
//                           ) : (
//                             <Lock className="w-4 h-4" />
//                           )}
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
//                           <p className="text-xs text-gray-500">
//                             {lesson.duration ? `${Math.floor(lesson.duration / 60)} min` : 'Video'}
//                           </p>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             <Card>
//               <CardContent className="p-6">
//                 {isEnrolled ? (
//                   <div className="space-y-4">
//                     <div className="text-center">
//                       <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
//                         <CheckCircle className="w-8 h-8 text-white" />
//                       </div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">You're Enrolled!</h3>
//                       <p className="text-sm text-gray-600 mb-4">Continue your learning journey</p>
//                     </div>
                    
//                     <Button 
//                       onClick={handleStartLesson}
//                       className="w-full bg-primary hover:bg-blue-700"
//                       disabled={!lessons || lessons.length === 0}
//                     >
//                       {progressPercentage > 0 ? 'Continue Learning' : 'Start Course'}
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className="text-center">
//                       <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <BookOpen className="w-8 h-8 text-primary" />
//                       </div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Start?</h3>
//                       <p className="text-sm text-gray-600 mb-4">Join thousands of students learning this course</p>
//                     </div>
                    
//                     <Button 
//                       onClick={() => enrollMutation.mutate()}
//                       disabled={enrollMutation.isPending}
//                       className="w-full bg-primary hover:bg-blue-700"
//                     >
//                       {enrollMutation.isPending ? 'Enrolling...' : 'Enroll Now'}
//                     </Button>
//                   </div>
//                 )}

//                 <div className="mt-6 pt-6 border-t border-gray-200">
//                   <h4 className="font-semibold text-gray-900 mb-3">What you'll learn</h4>
//                   <ul className="space-y-2 text-sm text-gray-600">
//                     <li className="flex items-start space-x-2">
//                       <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
//                       <span>Master the fundamentals and advanced concepts</span>
//                     </li>
//                     <li className="flex items-start space-x-2">
//                       <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
//                       <span>Build real-world projects from scratch</span>
//                     </li>
//                     <li className="flex items-start space-x-2">
//                       <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
//                       <span>Get hands-on experience with industry tools</span>
//                     </li>
//                     <li className="flex items-start space-x-2">
//                       <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
//                       <span>Receive a certificate upon completion</span>
//                     </li>
//                   </ul>
//                 </div>

//                 <div className="mt-6 pt-6 border-t border-gray-200">
//                   <div className="flex items-center space-x-3">
//                     <img 
//                       src={course.instructor?.profileImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32"}
//                       alt="Instructor"
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">
//                         {course.instructor?.firstName} {course.instructor?.lastName}
//                       </p>
//                       <p className="text-xs text-gray-500">Course Instructor</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-6">
//                 <h4 className="font-semibold text-gray-900 mb-3">Course Features</h4>
//                 <ul className="space-y-3 text-sm text-gray-600">
//                   <li className="flex items-center space-x-2">
//                     <Play className="w-4 h-4 text-primary" />
//                     <span>On-demand video lessons</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <BookOpen className="w-4 h-4 text-primary" />
//                     <span>Interactive quizzes</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <Award className="w-4 h-4 text-primary" />
//                     <span>Certificate of completion</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <Users className="w-4 h-4 text-primary" />
//                     <span>Lifetime access</span>
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }