import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaSpinner,
  FaExclamationCircle,
  FaChild,
  FaClock,
  FaBook,
  FaUserGraduate,
  FaBookOpen,
  FaCalculator,
  FaFlask,
  FaLandmark,
  FaAtom,
  FaLeaf,
  FaLanguage,
  FaGlobe
} from "react-icons/fa";

const ParentTimetable = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId") || "null");
  const [parent, setParent] = useState(null);
  const [childrenTimetables, setChildrenTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetables = async () => {
      setLoading(true);
      try {
        const [parentRes, studentRes, timetableRes] = await Promise.all([
          fetch("/data/users.json"),
          fetch("/data/students.json"),
          fetch("/data/timetable.json")
        ]);

        const parents = await parentRes.json();
        const students = await studentRes.json();
        const timetables = await timetableRes.json();

        const currentParent = parents.find((p) => p.id === currentUserId);
        setParent(currentParent);

        if (!currentParent || !currentParent.childrenID) {
          setError("No children found for this parent account");
          return;
        }

        const children = students.filter((student) =>
          currentParent.childrenID.includes(student.id)
        );

        const filteredTimetables = children.map((child) => {
          const childTimetable = timetables.find(
            (t) => t.class === child.class && t.section === child.section
          );
          return {
            ...child,
            timetable: childTimetable ? childTimetable.schedule : {},
          };
        });

        setChildrenTimetables(filteredTimetables);
      } catch (err) {
        setError("Failed to load timetable data");
        console.error("Error fetching timetables:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetables();
  }, [currentUserId]);

  const getSubjectIcon = (subject) => {
    if (!subject || typeof subject !== 'string') return FaBookOpen;
    const subjectLower = subject.toLowerCase();
    if (subjectLower.includes('math') || subjectLower.includes('algebra') || subjectLower.includes('geometry')) return FaCalculator;
    if (subjectLower.includes('science') || subjectLower.includes('biology') || subjectLower.includes('physics')) return FaFlask;
    if (subjectLower.includes('history') || subjectLower.includes('social')) return FaLandmark;
    if (subjectLower.includes('chemistry')) return FaAtom;
    if (subjectLower.includes('geography') || subjectLower.includes('environment')) return FaLeaf;
    if (subjectLower.includes('english') || subjectLower.includes('literature')) return FaLanguage;
    if (subjectLower.includes('computer') || subjectLower.includes('it')) return FaGlobe;
    return FaBookOpen;
  };

  const getSubjectColor = (subject) => {
    const colors = [
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-yellow-100 text-yellow-800 border-yellow-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-orange-100 text-orange-800 border-orange-200'
    ];
    const index = (subject && typeof subject === 'string') ? subject.length % colors.length : 0;
    return colors[index];
  };

  const timeSlots = [
    "8:00-8:45", "8:45-9:30", "9:30-10:15", "10:15-11:00", 
    "11:00-11:45", "11:45-12:30", "12:30-1:15", "1:15-2:00"
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  if (loading) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                <FaSpinner className="w-8 h-8 text-white animate-spin" />
              </div>
              <p className="text-gray-700 font-medium">Loading timetables...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Timetables</h3>
              <p className="text-gray-500">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-4 xs:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 xs:gap-4">
          <div className="flex items-center space-x-2 xs:space-x-3">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <FaCalendarAlt className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">Children Timetables</h1>
              <p className="text-xs xs:text-sm text-gray-600">
                <span className="font-semibold text-purple-600">{parent?.name}</span> - View your children's class schedules
              </p>
            </div>
          </div>
        </div>

        {childrenTimetables.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 xs:px-6 py-4 xs:py-6">
              <div className="flex items-center space-x-3">
                <FaChild className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                <div>
                  <h2 className="text-lg xs:text-xl font-bold text-white">Children Timetables</h2>
                  <p className="text-sm text-white text-opacity-90">Weekly class schedules</p>
                </div>
              </div>
            </div>
            <div className="p-4 xs:p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaChild className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Children Found</h3>
                <p className="text-gray-500">No children are associated with your account.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 xs:space-y-6">
            {childrenTimetables.map((child, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 xs:px-6 py-4 xs:py-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <FaUserGraduate className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg xs:text-xl font-bold text-white">{child.name}</h3>
                      <p className="text-sm text-white text-opacity-90">
                        Class: {child.class} - Section: {child.section}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 xs:p-6">
                  {!child.timetable || Object.keys(child.timetable).length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaCalendarAlt className="w-6 h-6 text-purple-500" />
                      </div>
                      <p className="text-gray-500">No timetable available for {child.name}</p>
                    </div>
                  ) : (
                    <>
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b-2 border-gray-200">
                              <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50">
                                <div className="flex items-center space-x-2">
                                  <FaClock className="w-4 h-4 text-purple-500" />
                                  <span>Time</span>
                                </div>
                              </th>
                              {timeSlots.map((slot, slotIndex) => (
                                <th key={slotIndex} className="text-center py-3 px-2 font-semibold text-gray-900 bg-gray-50 min-w-[120px]">
                                  {slot}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {days.map((day, dayIndex) => (
                              <tr key={dayIndex} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium text-gray-900 bg-gray-50">
                                  {day}
                                </td>
                                {timeSlots.map((slot, slotIndex) => {
                                  const subject = child.timetable[day]?.[slotIndex] || 'Free';
                                  const subjectStr = typeof subject === 'string' ? subject : String(subject || 'Free');
                                  const IconComponent = getSubjectIcon(subjectStr);
                                  
                                  return (
                                    <td key={slotIndex} className="py-2 px-2 text-center">
                                      {subjectStr === 'Free' ? (
                                        <span className="text-gray-400 text-sm">Free</span>
                                      ) : (
                                        <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm font-medium ${getSubjectColor(subjectStr)}`}>
                                          <IconComponent className="w-4 h-4" />
                                          <span className="hidden lg:inline">{subjectStr}</span>
                                          <span className="lg:hidden">{subjectStr.split(' ')[0]}</span>
                                        </div>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="md:hidden space-y-4">
                        {days.map((day, dayIndex) => (
                          <div key={dayIndex} className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                              <FaCalendarAlt className="w-4 h-4 text-purple-500" />
                              <span>{day}</span>
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {timeSlots.map((slot, slotIndex) => {
                                const subject = child.timetable[day]?.[slotIndex] || 'Free';
                                const subjectStr = typeof subject === 'string' ? subject : String(subject || 'Free');
                                const IconComponent = getSubjectIcon(subjectStr);
                                
                                return (
                                  <div key={slotIndex} className="bg-white p-3 rounded-lg border border-gray-200">
                                    <div className="text-xs text-gray-500 mb-1">{slot}</div>
                                    {subjectStr === 'Free' ? (
                                      <span className="text-gray-400 text-sm">Free</span>
                                    ) : (
                                      <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded border text-xs font-medium ${getSubjectColor(subjectStr)}`}>
                                        <IconComponent className="w-3 h-3" />
                                        <span>{subjectStr}</span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentTimetable;
