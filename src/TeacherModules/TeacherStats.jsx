import React from 'react';
import { FaUsers, FaGraduationCap, FaClipboardCheck, FaCalendarAlt, FaBookOpen, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TeacherStats = () => {
  const stats = [
    {
      title: 'My Classes',
      value: '6',
      change: '+1',
      trend: 'up',
      icon: FaGraduationCap,
      color: 'bg-blue-500'
    },
    {
      title: 'My Students',
      value: '185',
      change: '+12',
      trend: 'up',
      icon: FaUsers,
      color: 'bg-blue-500'
    },
    {
      title: 'Subjects Teaching',
      value: '3',
      change: '0',
      trend: 'neutral',
      icon: FaBookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Present Today',
      value: '172',
      change: '-5',
      trend: 'down',
      icon: FaClipboardCheck,
      color: 'bg-blue-500'
    },
    {
      title: 'Upcoming Tests',
      value: '4',
      change: '+2',
      trend: 'up',
      icon: FaCalendarAlt,
      color: 'bg-blue-500'
    }
  ];

  const classPerformance = [
    { class: 'Class 10-A', subject: 'Mathematics', students: 32, avgScore: 87, attendance: 94 },
    { class: 'Class 10-B', subject: 'Mathematics', students: 30, avgScore: 82, attendance: 91 },
    { class: 'Class 9-A', subject: 'Physics', students: 28, avgScore: 89, attendance: 96 },
    { class: 'Class 9-B', subject: 'Physics', students: 31, avgScore: 85, attendance: 88 },
    { class: 'Class 8-A', subject: 'Science', students: 29, avgScore: 91, attendance: 97 }
  ];

  const quickInsights = [
    { label: 'Best Performing Class', value: 'Class 8-A', color: 'text-green-600' },
    { label: 'Average Class Score', value: '86.8%', color: 'text-blue-600' },
    { label: 'Overall Attendance', value: '93.2%', color: 'text-purple-600' },
    { label: 'Pending Assignments', value: '7', color: 'text-orange-600' }
  ];

  return (
    <div className="bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Teaching Statistics</h1>
          <p className="text-gray-600">Overview of your classes and student performance</p>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Performance Overview</h3>
            <div className="space-y-4">
              {classPerformance.map((item, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.class}</h4>
                      <p className="text-sm text-gray-600">{item.subject} • {item.students} students</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{item.avgScore}%</p>
                      <p className="text-xs text-gray-500">Avg Score</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Performance</span>
                        <span>{item.avgScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.avgScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Attendance</span>
                        <span>{item.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
            <div className="space-y-4">
              {quickInsights.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">This Week</h4>
            <p className="text-2xl font-bold text-blue-600">12 Classes</p>
            <p className="text-sm text-gray-600">3 Tests scheduled</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Student Rating</h4>
            <p className="text-2xl font-bold text-blue-600">4.8/5</p>
            <p className="text-sm text-gray-600">Based on 156 reviews</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Assignments</h4>
            <p className="text-2xl font-bold text-blue-600">23 Pending</p>
            <p className="text-sm text-gray-600">To be graded</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Next Class</h4>
            <p className="text-2xl font-bold text-blue-600">10:30 AM</p>
            <p className="text-sm text-gray-600">Class 10-A Math</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherStats;