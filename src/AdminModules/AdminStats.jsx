import React from 'react';
import { FaUsers, FaChalkboardTeacher, FaGraduationCap, FaCalendarCheck, FaClipboardList, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const AdminStats = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: FaUsers,
      color: 'bg-red-500'
    },
    {
      title: 'Total Teachers',
      value: '87',
      change: '+3%',
      trend: 'up',
      icon: FaChalkboardTeacher,
      color: 'bg-red-500'
    },
    {
      title: 'Active Classes',
      value: '42',
      change: '+5%',
      trend: 'up',
      icon: FaGraduationCap,
      color: 'bg-red-500'
    },
    {
      title: 'Present Today',
      value: '1,186',
      change: '-2%',
      trend: 'down',
      icon: FaCalendarCheck,
      color: 'bg-red-500'
    },
    {
      title: 'Upcoming Exams',
      value: '15',
      change: '+8%',
      trend: 'up',
      icon: FaClipboardList,
      color: 'bg-red-500'
    }
  ];

  const quickStats = [
    { label: 'Attendance Rate', value: '95.2%', color: 'text-green-600' },
    { label: 'Pass Rate', value: '87.4%', color: 'text-blue-600' },
    { label: 'Teacher Satisfaction', value: '92.1%', color: 'text-purple-600' },
    { label: 'Parent Engagement', value: '78.9%', color: 'text-orange-600' }
  ];

  return (
    <div className="bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">School Statistics</h1>
          <p className="text-gray-600">Overview of key performance metrics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <FaArrowUp className="w-3 h-3 mr-1" /> : <FaArrowDown className="w-3 h-3 mr-1" />}
                  {stat.change}
                </div>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
            <div className="space-y-4">
              {[
                { month: 'January', attendance: 94, performance: 88 },
                { month: 'February', attendance: 96, performance: 91 },
                { month: 'March', attendance: 93, performance: 85 },
                { month: 'April', attendance: 95, performance: 89 },
                { month: 'May', attendance: 97, performance: 93 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-20">{item.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Attendance</span>
                          <span>{item.attendance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Performance</span>
                          <span>{item.performance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.performance}%` }}
                          ></div>
                        </div>
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
              {quickStats.map((item, index) => (
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
            <h4 className="font-semibold text-gray-900 mb-2">Top Performing Class</h4>
            <p className="text-2xl font-bold text-red-600">Class 10-A</p>
            <p className="text-sm text-gray-600">Average: 94.5%</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Best Teacher</h4>
            <p className="text-2xl font-bold text-red-600">Ms. Sarah</p>
            <p className="text-sm text-gray-600">Rating: 4.9/5</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">This Month</h4>
            <p className="text-2xl font-bold text-red-600">8 Events</p>
            <p className="text-sm text-gray-600">5 Completed</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Revenue</h4>
            <p className="text-2xl font-bold text-red-600">$45,280</p>
            <p className="text-sm text-gray-600">+15% vs last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;