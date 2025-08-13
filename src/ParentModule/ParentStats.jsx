import React from 'react';
import { FaUsers, FaCalendarCheck, FaDollarSign, FaTrophy, FaClipboardList, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ParentStats = () => {
  const stats = [
    {
      title: 'My Children',
      value: '2',
      change: '0',
      trend: 'neutral',
      icon: FaUsers,
      color: 'bg-purple-500'
    },
    {
      title: 'Avg Attendance',
      value: '92.8%',
      change: '+1.5%',
      trend: 'up',
      icon: FaCalendarCheck,
      color: 'bg-purple-500'
    },
    {
      title: 'Fees Paid',
      value: '$2,450',
      change: '+$500',
      trend: 'up',
      icon: FaDollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'Avg Performance',
      value: '89.3%',
      change: '+2.7%',
      trend: 'up',
      icon: FaTrophy,
      color: 'bg-purple-500'
    },
    {
      title: 'Upcoming Events',
      value: '5',
      change: '+2',
      trend: 'up',
      icon: FaClipboardList,
      color: 'bg-purple-500'
    }
  ];

  const childrenData = [
    {
      name: 'Emma Johnson',
      class: 'Grade 10-A',
      attendance: 95,
      performance: 91,
      subjects: 8,
      rank: 5
    },
    {
      name: 'Alex Johnson', 
      class: 'Grade 7-B',
      attendance: 90,
      performance: 87,
      subjects: 7,
      rank: 8
    }
  ];

  const quickInsights = [
    { label: 'Best Performer', value: 'Emma', color: 'text-green-600' },
    { label: 'Total School Days', value: '180', color: 'text-blue-600' },
    { label: 'Parent Meetings', value: '3 Scheduled', color: 'text-purple-600' },
    { label: 'Outstanding Fees', value: '$0', color: 'text-orange-600' }
  ];

  const upcomingEvents = [
    { event: 'Parent-Teacher Meeting', date: 'Dec 15', type: 'meeting', child: 'Emma' },
    { event: 'Science Fair', date: 'Dec 18', type: 'event', child: 'Both' },
    { event: 'Math Exam', date: 'Dec 20', type: 'exam', child: 'Alex' },
    { event: 'Sports Day', date: 'Dec 22', type: 'event', child: 'Both' }
  ];

  const getEventColor = (type) => {
    switch(type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'event': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Family Dashboard</h1>
          <p className="text-gray-600">Overview of your children's academic progress</p>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Children Performance</h3>
            <div className="space-y-4">
              {childrenData.map((child, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{child.name}</h4>
                      <p className="text-sm text-gray-600">{child.class} • Rank #{child.rank}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">{child.performance}%</p>
                      <p className="text-xs text-gray-500">Performance</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Attendance</span>
                        <span>{child.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${child.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Performance</span>
                        <span>{child.performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${child.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <span>{child.subjects} subjects enrolled</span>
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
            
            <h4 className="font-semibold text-gray-900 mb-3">Upcoming Events</h4>
            <div className="space-y-3">
              {upcomingEvents.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{item.event}</p>
                    <p className="text-xs text-gray-500">{item.child}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getEventColor(item.type)}`}>
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">This Month</h4>
            <p className="text-2xl font-bold text-purple-600">$1,200</p>
            <p className="text-sm text-gray-600">Total fees paid</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Parent Rating</h4>
            <p className="text-2xl font-bold text-purple-600">4.9/5</p>
            <p className="text-sm text-gray-600">School satisfaction</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Communications</h4>
            <p className="text-2xl font-bold text-purple-600">8</p>
            <p className="text-sm text-gray-600">Unread messages</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Next Meeting</h4>
            <p className="text-2xl font-bold text-purple-600">Dec 15</p>
            <p className="text-sm text-gray-600">With Ms. Sarah</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentStats;