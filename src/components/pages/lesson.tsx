// import { useQuery, useMutation } from "@tanstack/react-query";
// import { useParams, useLocation } from "wouter";
// import { useAuth } from "@/hooks/useAuth";
// import { apiRequest, queryClient } from "@/lib/queryClient";
// import { isUnauthorizedError } from "@/lib/authUtils";
// import { useToast } from "@/hooks/use-toast";
// import Navbar from "@/components/navbar";
// import VideoPlayer from "@/components/video-player";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Skeleton } from "@/components/ui/skeleton";
// import { 
//   ChevronLeft, 
//   ChevronRight, 
//   CheckCircle, 
//   Play,
//   Lock,
//   Clock,
//   Eye,
//   ThumbsUp
// } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function Lesson() {
//   const { id } = useParams();
//   const [, setLocation] = useLocation();
//   const { isAuthenticated, isLoading: authLoading } = useAuth();
//   const { toast } = useToast();
//   const [watchTime, setWatchTime] = useState(0);

//   const lessonId = parseInt(id || "0");

//   const { data: lesson, isLoading: lessonLoading } = useQuery({
//     queryKey: ["/api/lessons", lessonId],
//     enabled: !!lessonId,
//   });

//   const { data: courseLessons, isLoading: courseLessonsLoading } = useQuery({
//     queryKey: ["/api/courses", lesson?.courseId, "lessons"],
//     enabled: !!lesson?.courseId,
//   });

//   const { data: quizzes } = useQuery({
//     queryKey: ["/api/lessons", lessonId, "quizzes"],
//     enabled: !!lessonId,
//   });

//   const { data: progress } = useQuery({
//     queryKey: ["/api/courses", lesson?.courseId, "progress"],
//     enabled: !!lesson?.courseId,
//   });

//   const progressMutation = useMutation({
//     mutationFn: async (data: { completed: boolean; watchTime: number }) => {
//       await apiRequest("POST", `/api/lessons/${lessonId}/progress`, data);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["/api/courses", lesson?.courseId, "progress"] });
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

//   const currentLessonIndex = courseLessons?.findIndex((l: any) => l.id === lessonId) ?? -1;
//   const nextLesson = courseLessons?.[currentLessonIndex + 1];
//   const prevLesson = courseLessons?.[currentLessonIndex - 1];

//   const handleVideoProgress = (currentTime: number) => {
//     setWatchTime(currentTime);
    
//     // Auto-save progress every 30 seconds
//     if (currentTime > 0 && currentTime % 30 === 0) {
//       progressMutation.mutate({
//         completed: false,
//         watchTime: Math.floor(currentTime),
//       });
//     }
//   };

//   const handleVideoComplete = () => {
//     progressMutation.mutate({
//       completed: true,
//       watchTime: Math.floor(watchTime),
//     });
//   };

//   const handleNextLesson = () => {
//     if (nextLesson) {
//       setLocation(`/lessons/${nextLesson.id}`);
//     }
//   };

//   const handlePrevLesson = () => {
//     if (prevLesson) {
//       setLocation(`/lessons/${prevLesson.id}`);
//     }
//   };

//   const handleQuizStart = () => {
//     if (quizzes && quizzes.length > 0) {
//       setLocation(`/quizzes/${quizzes[0].id}`);
//     }
//   };

//   if (authLoading || lessonLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <Skeleton className="w-full aspect-video rounded-xl mb-6" />
//               <div className="space-y-4">
//                 <Skeleton className="h-8 w-3/4" />
//                 <Skeleton className="h-4 w-full" />
//                 <Skeleton className="h-4 w-2/3" />
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

//   if (!lesson) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-gray-900">Lesson not found</h1>
//             <p className="text-gray-600 mt-2">The lesson you're looking for doesn't exist.</p>
//             <Button onClick={() => setLocation("/")} className="mt-4">
//               Go Home
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const progressPercentage = progress ? (progress.completed / progress.total) * 100 : 0;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             {/* Video Player */}
//             <div className="bg-black rounded-xl overflow-hidden shadow-2xl mb-6">
//               <VideoPlayer
//                 src={lesson.videoUrl || ""}
//                 poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
//                 onProgress={handleVideoProgress}
//                 onEnded={handleVideoComplete}
//               />
//             </div>

//             {/* Lesson Info */}
//             <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//               <h1 className="text-2xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
//               <p className="text-gray-600 mb-6">{lesson.description}</p>
              
//               <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
//                 <div className="flex items-center space-x-2">
//                   <Clock className="w-4 h-4" />
//                   <span>{lesson.duration ? `${Math.floor(lesson.duration / 60)} minutes` : 'Video'}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Eye className="w-4 h-4" />
//                   <span>2.1k views</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <ThumbsUp className="w-4 h-4" />
//                   <span>156 likes</span>
//                 </div>
//               </div>

//               {/* Navigation */}
//               <div className="flex justify-between items-center">
//                 <Button
//                   variant="outline"
//                   onClick={handlePrevLesson}
//                   disabled={!prevLesson}
//                   className="flex items-center gap-2"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                   Previous
//                 </Button>

//                 {quizzes && quizzes.length > 0 && (
//                   <Button onClick={handleQuizStart} variant="outline">
//                     Take Quiz
//                   </Button>
//                 )}

//                 <Button
//                   onClick={handleNextLesson}
//                   disabled={!nextLesson}
//                   className="flex items-center gap-2"
//                 >
//                   Next
//                   <ChevronRight className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>

//             {/* Lesson Content */}
//             {lesson.content && (
//               <Card>
//                 <CardContent className="p-6">
//                   <h2 className="text-xl font-semibold text-gray-900 mb-4">Lesson Notes</h2>
//                   <div className="prose max-w-none">
//                     <p className="text-gray-600">{lesson.content}</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Course Progress */}
//             <Card>
//               <CardContent className="p-6">
//                 <h3 className="font-semibold text-gray-900 mb-4">Course Progress</h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-600">Completed</span>
//                     <span className="text-sm font-medium text-success">
//                       {progress?.completed || 0}/{progress?.total || 0} lessons
//                     </span>
//                   </div>
//                   <Progress value={progressPercentage} className="h-2" />
//                   <p className="text-sm text-gray-500">
//                     You're {Math.round(progressPercentage)}% through this course
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Course Content */}
//             <Card>
//               <CardContent className="p-6">
//                 <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>
//                 <div className="space-y-3 max-h-96 overflow-y-auto">
//                   {courseLessonsLoading ? (
//                     Array.from({ length: 5 }).map((_, i) => (
//                       <div key={i} className="flex items-center space-x-3 p-3">
//                         <Skeleton className="w-8 h-8 rounded-full" />
//                         <div className="flex-1">
//                           <Skeleton className="h-4 w-3/4 mb-1" />
//                           <Skeleton className="h-3 w-1/4" />
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     courseLessons?.map((courseLesson: any, index: number) => {
//                       const isCompleted = false; // TODO: Get from progress data
//                       const isCurrent = courseLesson.id === lessonId;
//                       const isLocked = false; // TODO: Implement lesson locking logic

//                       return (
//                         <div
//                           key={courseLesson.id}
//                           className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
//                             isCurrent 
//                               ? 'bg-primary bg-opacity-10 border-l-4 border-primary' 
//                               : 'hover:bg-gray-50'
//                           }`}
//                           onClick={() => !isLocked && setLocation(`/lessons/${courseLesson.id}`)}
//                         >
//                           <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                             isCompleted 
//                               ? 'bg-success text-white' 
//                               : isCurrent 
//                                 ? 'bg-primary text-white'
//                                 : isLocked
//                                   ? 'bg-gray-200 text-gray-400'
//                                   : 'bg-gray-200 text-gray-600'
//                           }`}>
//                             {isCompleted ? (
//                               <CheckCircle className="w-4 h-4" />
//                             ) : isCurrent ? (
//                               <Play className="w-4 h-4" />
//                             ) : isLocked ? (
//                               <Lock className="w-4 h-4" />
//                             ) : (
//                               <Play className="w-4 h-4" />
//                             )}
//                           </div>
//                           <div className="flex-1">
//                             <p className={`text-sm font-medium ${
//                               isCurrent ? 'text-primary' : isLocked ? 'text-gray-400' : 'text-gray-900'
//                             }`}>
//                               {courseLesson.title}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {courseLesson.duration ? `${Math.floor(courseLesson.duration / 60)} min` : 'Video'}
//                             </p>
//                           </div>
//                         </div>
//                       );
//                     })
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }