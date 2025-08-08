import { useEffect, useState } from "react";
import axios from "axios";
import TimetableTable from "../components/TimetableTable";
import {
  FaCalendarAlt,
  FaClock,
  FaGraduationCap,
  FaSpinner,
  FaExclamationCircle,
  FaBook,
  FaChalkboardTeacher,
  FaUsers,
  FaCalendarDay,
  FaBookOpen
} from "react-icons/fa";

const StudentTimetable = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const [student, setStudent] = useState(null);
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalPeriods: 0,
    totalSubjects: 0,
    breakPeriods: 0,
    teachingHours: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [studentRes, timetableRes] = await Promise.all([
          axios.get("/data/students.json"),
          axios.get("/data/timetable.json")
        ]);

        const currentStudent = studentRes.data.find((stu) => stu.id === currentUserId);
        setStudent(currentStudent);

        if (currentStudent) {
          const classTimetable = timetableRes.data.find(
            (tbl) =>
              tbl.class === currentStudent.class && tbl.section === currentStudent.section
          );
          
          const schedule = classTimetable?.schedule || null;
          setTimetable(schedule);

          if (schedule) {
            const days = Object.keys(schedule);
            let totalPeriods = 0;
            let breakPeriods = 0;
            const subjects = new Set();

            days.forEach(day => {
              schedule[day].forEach(period => {
                totalPeriods++;
                if (period.subject === "Break") {
                  breakPeriods++;
                } else {
                  subjects.add(period.subject);
                }
              });
            });

            setStats({
              totalPeriods,
              totalSubjects: subjects.size,
              breakPeriods,
              teachingHours: totalPeriods - breakPeriods
            });
          }
        }
      } catch (err) {
        setError("Failed to load timetable data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  if (loading) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                <FaSpinner className="w-8 h-8 text-white animate-spin" />
              </div>
              <p className="text-gray-700 font-medium">Loading timetable...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <FaExclamationCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Unable to Load Timetable</h3>
              <p className="text-gray-500">{error || "Student information not found"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-4 xs:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 xs:gap-4">
          <div className="flex items-center space-x-2 xs:space-x-3">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <FaCalendarDay className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">My Timetable</h1>
              <p className="text-xs xs:text-sm text-gray-600">View your weekly class schedule</p>
            </div>
          </div>
        </div>

        {timetable && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 xs:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs xs:text-sm font-medium text-gray-600">Total Periods</p>
                  <p className="text-xl xs:text-2xl font-bold text-gray-900">{stats.totalPeriods}</p>
                </div>
                <div className="w-10 h-10 xs:w-12 xs:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaClock className="w-5 h-5 xs:w-6 xs:h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 xs:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs xs:text-sm font-medium text-gray-600">Subjects</p>
                  <p className="text-xl xs:text-2xl font-bold text-green-600">{stats.totalSubjects}</p>
                </div>
                <div className="w-10 h-10 xs:w-12 xs:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaBookOpen className="w-5 h-5 xs:w-6 xs:h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 xs:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs xs:text-sm font-medium text-gray-600">Teaching Hours</p>
                  <p className="text-xl xs:text-2xl font-bold text-purple-600">{stats.teachingHours}</p>
                </div>
                <div className="w-10 h-10 xs:w-12 xs:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaChalkboardTeacher className="w-5 h-5 xs:w-6 xs:h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 xs:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs xs:text-sm font-medium text-gray-600">Break Periods</p>
                  <p className="text-xl xs:text-2xl font-bold text-orange-600">{stats.breakPeriods}</p>
                </div>
                <div className="w-10 h-10 xs:w-12 xs:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaClock className="w-5 h-5 xs:w-6 xs:h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-4 xs:px-6 py-6 xs:py-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <FaGraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="text-center sm:text-left text-white flex-1">
                <h2 className="text-xl xs:text-2xl font-bold mb-2">{student.name}'s Weekly Schedule</h2>
                <p className="text-sm xs:text-base text-white text-opacity-90">
                  Class {student.class} - Section {student.section} • Academic Year 2024
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                  <p className="text-sm text-white text-opacity-80">Roll No.</p>
                  <p className="text-lg font-bold text-white">{student.rollNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TimetableTable student={student} timetable={timetable} />
      </div>
    </div>
  );
};

export default StudentTimetable;
