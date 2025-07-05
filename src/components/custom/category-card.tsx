import { Card, CardContent } from "@/src/components/ui/card";
import { Code, TrendingUp, Palette, Megaphone, Camera, Languages, BookOpen } from "lucide-react";
import { Link } from "wouter";

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    description?: string;
    icon?: string;
    color?: string;
  };
  courseCount?: number;
}

export default function CategoryCard({ category, courseCount }: CategoryCardProps) {
  const getIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase() || category.name.toLowerCase()) {
      case "programming":
      case "code":
        return Code;
      case "business":
      case "trending":
        return TrendingUp;
      case "design":
      case "palette":
        return Palette;
      case "marketing":
      case "megaphone":
        return Megaphone;
      case "photography":
      case "camera":
        return Camera;
      case "languages":
      case "language":
        return Languages;
      default:
        return BookOpen;
    }
  };

  const getColorClass = (color?: string) => {
    switch (color?.toLowerCase() || category.name.toLowerCase()) {
      case "programming":
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "business":
      case "green":
        return "bg-green-100 text-green-600";
      case "design":
      case "purple":
        return "bg-purple-100 text-purple-600";
      case "marketing":
      case "yellow":
        return "bg-yellow-100 text-yellow-600";
      case "photography":
      case "red":
        return "bg-red-100 text-red-600";
      case "languages":
      case "indigo":
        return "bg-indigo-100 text-indigo-600";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const IconComponent = getIcon(category.icon);
  const colorClass = getColorClass(category.color);

  return (
    <Link href={`/?category=${category.id}`}>
      <Card className="text-center p-6 hover:shadow-lg transition duration-200 cursor-pointer border hover:border-primary group">
        <CardContent className="p-0">
          <div className={`w-16 h-16 ${colorClass} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
            <IconComponent className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500">
            {courseCount !== undefined ? `${courseCount} courses` : 'Browse courses'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}