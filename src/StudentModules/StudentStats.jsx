import React from 'react';
import { FaCalendarCheck, FaClipboardList, FaBookOpen, FaTrophy, FaGraduationCap, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StudentStats = () => {
  const stats = [
    {
      title: 'Attendance Rate',
      value: '94.5%',
      change: '+2.1%',
      trend: 'up',
      icon: FaCalendarCheck,
      color: 'bg-green-500'
    },
    {
      title: 'Total Subjects',
      value: '8',
      change: '0',
      trend: 'neutral',
      icon: FaBookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Average Grade',
      value: '87.2%',
      change: '+4.3%',
      trend: 'up',
      icon: FaTrophy,
      color: 'bg-green-500'
    },
    {
      title: 'Upcoming Exams',
      value: '3',
      change: '-1',
      trend: 'down',
      icon: FaClipboardList,
      color: 'bg-green-500'
    },
    {
      title: 'Completed Tasks',
      value: '28/30',
      change: '+5',
      trend: 'up',
      icon: FaGraduationCap,
      color: 'bg-green-500'
    }
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', grade: 92, trend: 'up', color: 'bg-blue-500' },
    { subject: 'Physics', grade: 89, trend: 'up', color: 'bg-purple-500' },
    { subject: 'Chemistry', grade: 85, trend: 'down', color: 'bg-red-500' },
    { subject: 'Biology', grade: 91, trend: 'up', color: 'bg-green-500' },
    { subject: 'English', grade: 88, trend: 'neutral', color: 'bg-yellow-500' },
    { subject: 'History', grade: 83, trend: 'up', color: 'bg-indigo-500' }
  ];

  const quickInsights = [
    { label: 'Class Rank', value: '#3', color: 'text-green-600' },
    { label: 'Best Subject', value: 'Mathematics', color: 'text-blue-600' },
    { label: 'Study Streak', value: '12 days', color: 'text-purple-600' },
    { label: 'Next Exam', value: '3 days', color: 'text-orange-600' }
  ];

  const recentActivities = [
    { activity: 'Math Assignment', status: 'Completed', score: '95%', date: 'Today' },
    { activity: 'Physics Quiz', status: 'Completed', score: '88%', date: 'Yesterday' },
    { activity: 'Chemistry Lab', status: 'Pending', score: '-', date: 'Tomorrow' },
    { activity: 'English Essay', status: 'In Progress', score: '-', date: '2 days ago' }
  ];

  return (
    <div className="bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Academic Progress</h1>
          <p className="text-gray-600">Track your performance and achievements</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                {stat.trend !== 'neutral' && (
                  <div className={`flex items-center text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <FaArrowUp className="w-3 h-3 mr-1" /> : <FaArrowDown className="w-3 h-3 mr-1" />}
                    {stat.change}
                  </div>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectPerformance.map((item, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{item.subject}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600">{item.grade}%</span>
                      {item.trend !== 'neutral' && (
                        <div className={`${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {item.trend === 'up' ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${item.grade}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Grade</span>
                    <span>{item.grade}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
            <div className="space-y-4 mb-6">
              {quickInsights.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
            
            <h4 className="font-semibold text-gray-900 mb-3">Recent Activities</h4>
            <div className="space-y-3">
              {recentActivities.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{item.activity}</p>
                    <p className="text-gray-500">{item.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      item.status === 'Completed' ? 'text-green-600' : 
                      item.status === 'Pending' ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      {item.status}
                    </p>
                    {item.score !== '-' && <p className="text-gray-600">{item.score}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">This Week</h4>
            <p className="text-2xl font-bold text-green-600">5 Tasks</p>
            <p className="text-sm text-gray-600">3 completed, 2 pending</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Study Time</h4>
            <p className="text-2xl font-bold text-green-600">24.5 hrs</p>
            <p className="text-sm text-gray-600">This week</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Achievements</h4>
            <p className="text-2xl font-bold text-green-600">12</p>
            <p className="text-sm text-gray-600">Badges earned</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Goal Progress</h4>
            <p className="text-2xl font-bold text-green-600">85%</p>
            <p className="text-sm text-gray-600">Monthly target</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStats;