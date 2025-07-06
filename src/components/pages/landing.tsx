import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { GraduationCap, Users, PlayCircle, Award, Code, TrendingUp, Palette, Megaphone, Camera, Languages } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const categories = [
    { name: "Programming", icon: Code, count: 150, color: "bg-blue-100 text-blue-600" },
    { name: "Business", icon: TrendingUp, count: 120, color: "bg-green-100 text-green-600" },
    { name: "Design", icon: Palette, count: 95, color: "bg-purple-100 text-purple-600" },
    { name: "Marketing", icon: Megaphone, count: 85, color: "bg-yellow-100 text-yellow-600" },
    { name: "Photography", icon: Camera, count: 70, color: "bg-red-100 text-red-600" },
    { name: "Languages", icon: Languages, count: 60, color: "bg-indigo-100 text-indigo-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">LearnHub</span>
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleLogin} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Sign In
              </Button>
              <Button onClick={handleLogin} className="bg-primary hover:bg-blue-700">
                Sign Up Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Learn Without Limits</h1>
              <p className="text-xl mb-8 text-blue-100">Discover thousands of courses from expert instructors and advance your skills at your own pace.</p>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Button 
                    onClick={handleLogin}
                    className="bg-white text-primary px-8 py-3 hover:bg-gray-100 text-lg"
                  >
                    Sign Up Free
                  </Button>
                  <Button 
                    onClick={handleLogin}
                    variant="outline"
                    className="border-white text-white px-8 py-3 hover:bg-white hover:text-primary text-lg"
                  >
                    Sign In
                  </Button>
                </div>
                <p className="text-sm text-blue-100">
                  Free forever • No credit card required • Start learning in seconds
                </p>
                <div className="flex items-center space-x-6 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>50K+ Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="w-5 h-5" />
                    <span>1000+ Courses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Certificates</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Students learning online" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Top Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose from a wide range of subjects and start building skills that matter to your career.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="text-center p-6 hover:shadow-lg transition duration-200 cursor-pointer border hover:border-primary">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} courses</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose LearnHub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to succeed in your learning journey.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <PlayCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Videos</h3>
                <p className="text-gray-600">High-quality video lessons with interactive features to enhance your learning experience.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Certificates</h3>
                <p className="text-gray-600">Earn recognized certificates upon course completion to showcase your achievements.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-600">Monitor your learning progress with detailed analytics and personalized insights.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sign Up Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of learners who are already advancing their careers with our interactive courses.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Account</h3>
              <p className="text-blue-100">Sign up instantly with no credit card required</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <PlayCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Access</h3>
              <p className="text-blue-100">Start learning immediately with our course library</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-blue-100">Save your progress and earn certificates</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={handleLogin}
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg"
            >
              Create Free Account
            </Button>
            <Button 
              onClick={handleLogin}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg"
            >
              Already have an account?
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">LearnHub</span>
              </div>
              <p className="text-gray-400 mb-6">Empowering learners worldwide with high-quality, accessible online education.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Programming</a></li>
                <li><a href="#" className="hover:text-white">Data Science</a></li>
                <li><a href="#" className="hover:text-white">Design</a></li>
                <li><a href="#" className="hover:text-white">Business</a></li>
                <li><a href="#" className="hover:text-white">Marketing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">System Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}