// import { useQuery, useMutation } from "@tanstack/react-query";
// import { useAuth } from "@/src/hooks/useAuth";
// import { apiRequest, queryClient } from "@/src/lib/queryClient";
// import { isUnauthorizedError } from "@/src/lib/authUtils";
// import { useToast } from "@/src/hooks/use-toast";
// import Navbar from "@/src/components/navigation";
// import { Button } from "@/src/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
// import { Input } from "@/src/components/ui/input";
// import { Label } from "@/src/components/ui/label";
// import { Textarea } from "@/src/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
// import { Badge } from "@/src/components/ui/badge";
// import { Skeleton } from "@/src/components/ui/skeleton";
// import { 
//   Plus, 
//   Edit, 
//   Trash2, 
//   BarChart3,
//   BookOpen,
//   Users,
//   Play,
//   CheckCircle,
//   AlertCircle
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { insertCourseSchema } from "@/src/shared/schema";
// import { z } from "zod";

// const courseFormSchema = insertCourseSchema.extend({
//   title: z.string().min(1, "Title is required"),
//   description: z.string().min(1, "Description is required"),
// });

// type CourseFormData = z.infer<typeof courseFormSchema>;

// export default function Admin() {
//   const { user, isAuthenticated, isLoading: authLoading } = useAuth();
//   const { toast } = useToast();
//   const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
//   const [editingCourse, setEditingCourse] = useState<any>(null);

//   const { data: adminStats, isLoading: statsLoading } = useQuery({
//     queryKey: ["/api/admin/stats"],
//     enabled: !!(isAuthenticated && user?.isAdmin),
//   });

//   const { data: courses, isLoading: coursesLoading } = useQuery({
//     queryKey: ["/api/admin/courses"],
//     enabled: !!(isAuthenticated && user?.isAdmin),
//   });

//   const { data: categories } = useQuery({
//     queryKey: ["/api/categories"],
//     enabled: !!(isAuthenticated && user?.isAdmin),
//   });

//   const createCourseMutation = useMutation({
//     mutationFn: async (data: CourseFormData) => {
//       await apiRequest("POST", "/api/courses", data);
//     },
//     onSuccess: () => {
//       toast({
//         title: "Success",
//         description: "Course created successfully",
//       });
//       setIsCreateDialogOpen(false);
//       queryClient.invalidateQueries({ queryKey: ["/api/admin/courses"] });
//       queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
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
//         description: "Failed to create course",
//         variant: "destructive",
//       });
//     },
//   });

//   const updateCourseMutation = useMutation({
//     mutationFn: async ({ id, data }: { id: number; data: Partial<CourseFormData> }) => {
//       await apiRequest("PUT", `/api/courses/${id}`, data);
//     },
//     onSuccess: () => {
//       toast({
//         title: "Success",
//         description: "Course updated successfully",
//       });
//       setEditingCourse(null);
//       queryClient.invalidateQueries({ queryKey: ["/api/admin/courses"] });
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
//         description: "Failed to update course",
//         variant: "destructive",
//       });
//     },
//   });

//   const deleteCourseMutation = useMutation({
//     mutationFn: async (id: number) => {
//       await apiRequest("DELETE", `/api/courses/${id}`);
//     },
//     onSuccess: () => {
//       toast({
//         title: "Success",
//         description: "Course deleted successfully",
//       });
//       queryClient.invalidateQueries({ queryKey: ["/api/admin/courses"] });
//       queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
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
//         description: "Failed to delete course",
//         variant: "destructive",
//       });
//     },
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//     watch,
//   } = useForm<CourseFormData>({
//     resolver: zodResolver(courseFormSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       thumbnail: "",
//       level: "beginner",
//       duration: 0,
//       price: "0",
//       isPublished: false,
//     },
//   });

//   useEffect(() => {
//     if (!authLoading && (!isAuthenticated || !user?.isAdmin)) {
//       toast({
//         title: "Unauthorized",
//         description: "Admin access required. Redirecting...",
//         variant: "destructive",
//       });
//       setTimeout(() => {
//         window.location.href = "/api/login";
//       }, 500);
//       return;
//     }
//   }, [isAuthenticated, authLoading, user, toast]);

//   useEffect(() => {
//     if (editingCourse) {
//       setValue("title", editingCourse.title);
//       setValue("description", editingCourse.description);
//       setValue("thumbnail", editingCourse.thumbnail || "");
//       setValue("categoryId", editingCourse.categoryId);
//       setValue("level", editingCourse.level);
//       setValue("duration", editingCourse.duration || 0);
//       setValue("price", editingCourse.price || "0");
//       setValue("isPublished", editingCourse.isPublished);
//     }
//   }, [editingCourse, setValue]);

//   const onSubmit = (data: CourseFormData) => {
//     if (editingCourse) {
//       updateCourseMutation.mutate({ id: editingCourse.id, data });
//     } else {
//       createCourseMutation.mutate(data);
//     }
//   };

//   const handleEdit = (course: any) => {
//     setEditingCourse(course);
//     setIsCreateDialogOpen(true);
//   };

//   const handleDelete = (courseId: number) => {
//     if (confirm("Are you sure you want to delete this course?")) {
//       deleteCourseMutation.mutate(courseId);
//     }
//   };

//   const closeDialog = () => {
//     setIsCreateDialogOpen(false);
//     setEditingCourse(null);
//     reset();
//   };

//   if (authLoading || !user?.isAdmin) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <Skeleton className="h-8 w-64 mb-8" />
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {Array.from({ length: 4 }).map((_, i) => (
//               <Skeleton key={i} className="h-32 rounded-xl" />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
//             <p className="text-gray-600">Manage courses and track platform analytics</p>
//           </div>
//           <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
//             <DialogTrigger asChild>
//               <Button onClick={() => setEditingCourse(null)}>
//                 <Plus className="w-4 h-4 mr-2" />
//                 Create Course
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-2xl">
//               <DialogHeader>
//                 <DialogTitle>
//                   {editingCourse ? "Edit Course" : "Create New Course"}
//                 </DialogTitle>
//               </DialogHeader>
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <div>
//                   <Label htmlFor="title">Course Title</Label>
//                   <Input
//                     id="title"
//                     {...register("title")}
//                     placeholder="Enter course title"
//                   />
//                   {errors.title && (
//                     <p className="text-sm text-red-600">{errors.title.message}</p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     {...register("description")}
//                     placeholder="Enter course description"
//                     rows={3}
//                   />
//                   {errors.description && (
//                     <p className="text-sm text-red-600">{errors.description.message}</p>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="categoryId">Category</Label>
//                     <Select onValueChange={(value) => setValue("categoryId", parseInt(value))}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {categories?.map((category: any) => (
//                           <SelectItem key={category.id} value={category.id.toString()}>
//                             {category.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <Label htmlFor="level">Level</Label>
//                     <Select onValueChange={(value) => setValue("level", value)} defaultValue="beginner">
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="beginner">Beginner</SelectItem>
//                         <SelectItem value="intermediate">Intermediate</SelectItem>
//                         <SelectItem value="advanced">Advanced</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="duration">Duration (minutes)</Label>
//                     <Input
//                       id="duration"
//                       type="number"
//                       {...register("duration", { valueAsNumber: true })}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="price">Price</Label>
//                     <Input
//                       id="price"
//                       {...register("price")}
//                       placeholder="0.00"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="thumbnail">Thumbnail URL</Label>
//                   <Input
//                     id="thumbnail"
//                     {...register("thumbnail")}
//                     placeholder="https://example.com/image.jpg"
//                   />
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     id="isPublished"
//                     {...register("isPublished")}
//                     className="rounded border-gray-300"
//                   />
//                   <Label htmlFor="isPublished">Publish course</Label>
//                 </div>

//                 <div className="flex justify-end space-x-2 pt-4">
//                   <Button type="button" variant="outline" onClick={closeDialog}>
//                     Cancel
//                   </Button>
//                   <Button 
//                     type="submit" 
//                     disabled={createCourseMutation.isPending || updateCourseMutation.isPending}
//                   >
//                     {createCourseMutation.isPending || updateCourseMutation.isPending 
//                       ? "Saving..." 
//                       : editingCourse 
//                         ? "Update Course" 
//                         : "Create Course"
//                     }
//                   </Button>
//                 </div>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Courses</p>
//                   <p className="text-3xl font-bold text-gray-900">
//                     {statsLoading ? (
//                       <Skeleton className="h-8 w-12" />
//                     ) : (
//                       adminStats?.totalCourses || 0
//                     )}
//                   </p>
//                 </div>
//                 <BookOpen className="w-8 h-8 text-primary" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Students</p>
//                   <p className="text-3xl font-bold text-gray-900">
//                     {statsLoading ? (
//                       <Skeleton className="h-8 w-12" />
//                     ) : (
//                       adminStats?.totalStudents || 0
//                     )}
//                   </p>
//                 </div>
//                 <Users className="w-8 h-8 text-success" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Lessons</p>
//                   <p className="text-3xl font-bold text-gray-900">
//                     {statsLoading ? (
//                       <Skeleton className="h-8 w-12" />
//                     ) : (
//                       adminStats?.totalLessons || 0
//                     )}
//                   </p>
//                 </div>
//                 <Play className="w-8 h-8 text-warning" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Quizzes</p>
//                   <p className="text-3xl font-bold text-gray-900">
//                     {statsLoading ? (
//                       <Skeleton className="h-8 w-12" />
//                     ) : (
//                       adminStats?.totalQuizzes || 0
//                     )}
//                   </p>
//                 </div>
//                 <BarChart3 className="w-8 h-8 text-secondary" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Course Management */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Course Management</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-left py-3 px-4 font-semibold text-gray-900">Course</th>
//                     <th className="text-left py-3 px-4 font-semibold text-gray-900">Students</th>
//                     <th className="text-left py-3 px-4 font-semibold text-gray-900">Level</th>
//                     <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
//                     <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {coursesLoading ? (
//                     Array.from({ length: 5 }).map((_, i) => (
//                       <tr key={i} className="border-b border-gray-100">
//                         <td className="py-4 px-4">
//                           <div className="flex items-center space-x-3">
//                             <Skeleton className="w-12 h-12 rounded-lg" />
//                             <div>
//                               <Skeleton className="h-4 w-32 mb-1" />
//                               <Skeleton className="h-3 w-24" />
//                             </div>
//                           </div>
//                         </td>
//                         <td className="py-4 px-4">
//                           <Skeleton className="h-4 w-16" />
//                         </td>
//                         <td className="py-4 px-4">
//                           <Skeleton className="h-6 w-20" />
//                         </td>
//                         <td className="py-4 px-4">
//                           <Skeleton className="h-6 w-24" />
//                         </td>
//                         <td className="py-4 px-4">
//                           <Skeleton className="h-8 w-20" />
//                         </td>
//                       </tr>
//                     ))
//                   ) : courses?.length === 0 ? (
//                     <tr>
//                       <td colSpan={5} className="py-12 text-center">
//                         <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                         <p className="text-gray-500">No courses created yet</p>
//                         <p className="text-sm text-gray-400">Create your first course to get started</p>
//                       </td>
//                     </tr>
//                   ) : (
//                     courses?.map((course: any) => (
//                       <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
//                         <td className="py-4 px-4">
//                           <div className="flex items-center space-x-3">
//                             <img 
//                               src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&h=48"} 
//                               alt={course.title}
//                               className="w-12 h-12 rounded-lg object-cover"
//                             />
//                             <div>
//                               <p className="font-medium text-gray-900">{course.title}</p>
//                               <p className="text-sm text-gray-500">
//                                 {Math.floor((course.duration || 0) / 60)} hours
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="py-4 px-4">
//                           <span className="text-gray-900">{course.studentsCount || 0}</span>
//                         </td>
//                         <td className="py-4 px-4">
//                           <Badge variant="outline" className="capitalize">
//                             {course.level}
//                           </Badge>
//                         </td>
//                         <td className="py-4 px-4">
//                           <Badge variant={course.isPublished ? "default" : "secondary"}>
//                             {course.isPublished ? (
//                               <>
//                                 <CheckCircle className="w-3 h-3 mr-1" />
//                                 Published
//                               </>
//                             ) : (
//                               <>
//                                 <AlertCircle className="w-3 h-3 mr-1" />
//                                 Draft
//                               </>
//                             )}
//                           </Badge>
//                         </td>
//                         <td className="py-4 px-4">
//                           <div className="flex items-center space-x-2">
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() => handleEdit(course)}
//                             >
//                               <Edit className="w-4 h-4" />
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() => handleDelete(course.id)}
//                               className="text-red-600 hover:text-red-700"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }