import { Card, CardContent } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { Progress } from '@/src/components/ui/progress';
import { Clock, Play, Users, Star } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    thumbnail?: string;
    duration?: number;
    level: string;
    rating?: string;
    studentsCount?: number;
    category?: {
      name: string;
    };
    instructor?: {
      firstName: string;
      lastName: string;
      profileImageUrl?: string;
    };
  };
  enrolled?: boolean;
  progress?: number;
}

export default function CourseCard({ course, enrolled = false, progress = 0 }: CourseCardProps) {
  const getCategoryColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-600';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-600';
      case 'advanced':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'bg-gray-400';
    if (progress < 50) return 'bg-primary';
    if (progress < 100) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <Card className="hover:shadow-lg transition duration-200 overflow-hidden">
      <img
        src={
          course.thumbnail ||
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240'
        }
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getCategoryColor(course.level)}>
            {course.category?.name || course.level}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{course.rating || '4.5'}</span>
            <span className="text-sm text-gray-500">({course.studentsCount || 0})</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{course.description}</p>

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{Math.floor((course.duration || 0) / 60)} hours</span>
          </div>
          <div className="flex items-center space-x-1">
            <Play className="w-4 h-4" />
            <span>Video lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.studentsCount || 0}</span>
          </div>
        </div>

        {enrolled && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span
                className={`text-sm font-medium ${
                  progress === 0
                    ? 'text-gray-400'
                    : progress < 100
                      ? 'text-primary'
                      : 'text-success'
                }`}
              >
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={
                course.instructor?.profileImageUrl ||
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32'
              }
              alt="Instructor"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">
              {course.instructor?.firstName} {course.instructor?.lastName}
            </span>
          </div>
          <Link href={`/courses/${course.id}`}>
            <Button
              className={
                enrolled ? 'bg-primary hover:bg-blue-700' : 'bg-secondary hover:bg-purple-700'
              }
            >
              {enrolled ? 'Continue' : 'View Course'}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
