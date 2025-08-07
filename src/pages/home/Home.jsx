import { Link } from "react-router-dom";
import { 
  FaGraduationCap, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaCalendarCheck, 
  FaClipboardList, 
  FaBell,
  FaChartLine,
  FaShieldAlt,
  FaMobile,
  FaArrowRight,
  FaPlay,
  FaStar,
  FaCheckCircle,
  FaSchool
} from "react-icons/fa";

const Home = () => {
  const features = [
    {
      icon: FaUsers,
      title: "Student Management",
      description: "Complete student records, enrollment, and academic tracking system",
      color: "from-green-500 to-green-600"
    },
    {
      icon: FaChalkboardTeacher,
      title: "Teacher Management",
      description: "Comprehensive teacher profiles, assignments, and performance tracking",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FaCalendarCheck,
      title: "Attendance System",
      description: "Real-time attendance marking with detailed reports and analytics",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: FaClipboardList,
      title: "Exam Management",
      description: "Schedule, conduct, and manage all examinations efficiently",
      color: "from-red-500 to-red-600"
    },
    {
      icon: FaBell,
      title: "Notice Board",
      description: "Instant communication with students, parents, and teachers",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: FaChartLine,
      title: "Analytics & Reports",
      description: "Comprehensive insights and detailed performance reports",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Managed", icon: FaUsers },
    { number: "500+", label: "Teachers Connected", icon: FaChalkboardTeacher },
    { number: "50+", label: "Schools Trust Us", icon: FaSchool },
    { number: "99.9%", label: "Uptime Reliability", icon: FaCheckCircle }
  ];

  const benefits = [
    "Complete School Management Solution",
    "Real-time Data & Analytics",
    "Mobile-First Responsive Design",
    "Secure & Reliable Platform",
    "24/7 Technical Support",
    "Easy Integration & Setup"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="min-h-screen flex flex-col">
        <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <FaGraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">ManageMySchool</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Smart Campus Portal</p>
                </div>
              </div>
              <Link to="/login">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base">
                  <span className="hidden xs:inline">Login</span>
                  <span className="xs:hidden">Sign In</span>
                  <FaArrowRight className="w-3 h-3" />
                </button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <section className="py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="text-center space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-4">
                  
                  
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight px-2">
                    <span className="block">Transform Your School with</span>
                    <span className="p-1 sm:p-2 mb-1 sm:mb-2 block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                      Smart Management
                    </span>
        </h1>

                  <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4">
                    <span className="hidden sm:inline">Streamline your educational institution with our comprehensive school management system. 
                    Handle students, teachers, attendance, exams, and communication all in one powerful platform.</span>
                    <span className="sm:hidden">Complete school management solution for students, teachers, attendance, and exams all in one platform.</span>
                  </p>
                </div>

                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                  <Link to="/login" className="w-full xs:w-auto">
                    <button className="w-full xs:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm xs:text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg hover:shadow-xl hover:scale-105">
                      <span>Get Started Today</span>
                      <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </Link>
                  
                  <button className="w-full xs:w-auto bg-white/70 backdrop-blur-sm border border-white/20 hover:bg-white/90 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm xs:text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg hover:shadow-xl">
                    <FaPlay className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Watch Demo</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-16 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 rounded-xl bg-white/30 hover:bg-white/50 transition-all duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-tight">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="text-center space-y-8 sm:space-y-12">
                <div className="space-y-3 sm:space-y-4">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 px-4">
                    Powerful Features for Modern Schools
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                    Everything you need to manage your educational institution efficiently and effectively
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto sm:mx-0`}>
                          <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-4 py-2 text-sm font-medium text-green-800">
                      <FaShieldAlt className="w-4 h-4 mr-2" />
                      Trusted & Secure
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                      Why Choose ManageMySchool?
                    </h2>
                    <p className="text-lg text-gray-600">
                      Join thousands of educational institutions that trust our platform for their daily operations
                    </p>
                  </div>

                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaCheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
          <Link to="/login">
                      <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl">
                        <span>Start Your Journey</span>
                        <FaArrowRight className="w-4 h-4" />
                      </button>
          </Link>
        </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                        <FaMobile className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Mobile Ready</h3>
                      <p className="text-sm text-gray-600">Access from any device, anywhere</p>
                    </div>
                    
                    <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                        <FaChartLine className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                      <p className="text-sm text-gray-600">Detailed insights and reports</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-8">
                    <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                        <FaShieldAlt className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
                      <p className="text-sm text-gray-600">Bank-level security standards</p>
                    </div>
                    
                    <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
                        <FaUsers className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
                      <p className="text-sm text-gray-600">24/7 dedicated assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Ready to Transform Your School?
                </h2>
                <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                  Join thousands of educational institutions already using ManageMySchool to streamline their operations
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/login">
                    <button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105">
                      <span>Get Started Now</span>
                      <FaArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  
                  <button className="bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3">
                    <FaPlay className="w-4 h-4" />
                    <span>Schedule Demo</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <FaGraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">ManageMySchool</span>
              </div>
              
              <div className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} ManageMySchool. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
