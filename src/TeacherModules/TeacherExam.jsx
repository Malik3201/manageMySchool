import { useEffect, useState } from "react";
import Table from "../components/Table";
import {
  FaClipboardList,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaUsers,
  FaSpinner,
  FaExclamationCircle,
  FaGraduationCap,
  FaBookOpen,
  FaCalculator,
  FaFlask,
  FaLandmark,
  FaAtom,
  FaLeaf,
  FaLanguage,
  FaGlobe
} from "react-icons/fa";

export default function TeacherExam() {
  const [exams, setExams] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [examsRes, teachersRes] = await Promise.all([
          fetch("/data/examsData.json"),
          fetch("/data/teachers.json")
        ]);
        
        const examsData = await examsRes.json();
        const teachersData = await teachersRes.json();
        
        setExams(examsData);
        setTeachers(teachersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const teacherId = JSON.parse(localStorage.getItem("userId"));
  const teacher = teachers.find(e => e.id === teacherId);

  const findExams = teacher?.assignedClasses ? exams.filter(e =>
    teacher.assignedClasses.some(c => `${e.class} - ${e.section}` === c)
  ) : [];

  const findSubjectExam = teacher?.subjects ? findExams.filter(e =>
    teacher.subjects.some(s => e.subject === s)
  ) : [];

  const getSubjectIcon = (subject) => {
    const icons = {
      'Mathematics': FaCalculator,
      'English': FaLanguage,
      'Science': FaFlask,
      'Physics': FaAtom,
      'Chemistry': FaFlask,
      'Biology': FaLeaf,
      'History': FaLandmark,
      'Geography': FaGlobe,
      'Computer Science': FaBook,
      'Literature': FaBookOpen
    };
    const IconComponent = icons[subject] || FaBook;
    return <IconComponent className="w-4 h-4" />;
  };

  const getExamStatus = (date, time) => {
    const examDateTime = new Date(`${date} ${time.split(' - ')[0]}`);
    const now = new Date();
    const diffTime = examDateTime.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: 'Completed', color: 'bg-gray-100 text-gray-700 border-gray-200' };
    if (diffDays === 0) return { status: 'Today', color: 'bg-red-100 text-red-700 border-red-200' };
    if (diffDays === 1) return { status: 'Tomorrow', color: 'bg-orange-100 text-orange-700 border-orange-200' };
    if (diffDays <= 7) return { status: `${diffDays} days`, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    return { status: `${diffDays} days`, color: 'bg-blue-100 text-blue-700 border-blue-200' };
  };

  const getExamStats = () => {
    const total = findSubjectExam.length;
    const today = findSubjectExam.filter(exam => {
      const examDate = new Date(exam.date);
      const now = new Date();
      return examDate.toDateString() === now.toDateString();
    }).length;
    
    const thisWeek = findSubjectExam.filter(exam => {
      const examDate = new Date(exam.date);
      const now = new Date();
      const diffTime = examDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    }).length;

    const completed = findSubjectExam.filter(exam => {
      const examDate = new Date(exam.date);
      const now = new Date();
      return examDate < now;
    }).length;

    return { total, today, thisWeek, completed };
  };

  const stats = getExamStats();

  const examColumns = [
    { 
      header: "Class", 
      accessor: "class",
      width: "15%",
      render: (exam) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <FaGraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium text-gray-900">{exam.class}</span>
        </div>
      )
    },
    { 
      header: "Section", 
      accessor: "section",
      width: "10%"
    },
    { 
      header: "Subject", 
      accessor: "subject",
      width: "25%",
      render: (exam) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center border border-blue-300">
            {getSubjectIcon(exam.subject)}
          </div>
          <span className="font-medium text-gray-900">{exam.subject}</span>
        </div>
      )
    },
    { 
      header: "Date", 
      accessor: "date",
      width: "20%",
      render: (exam) => (
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="w-4 h-4 text-blue-500" />
          <span className="font-medium text-gray-900">{new Date(exam.date).toLocaleDateString()}</span>
        </div>
      )
    },
    { 
      header: "Time", 
      accessor: "time",
      width: "15%",
      render: (exam) => (
        <div className="flex items-center space-x-2">
          <FaClock className="w-4 h-4 text-blue-500" />
          <span className="font-medium text-gray-900">{exam.time}</span>
        </div>
      )
    },
    {
      header: "Status",
      width: "15%",
      render: (exam) => {
        const { status, color } = getExamStatus(exam.date, exam.time);
        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-lg border font-medium text-xs ${color}`}>
            {status}
          </span>
        );
      }
    }
  ];

  if (loading) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                <FaSpinner className="w-8 h-8 text-white animate-spin" />
              </div>
              <p className="text-gray-700 font-medium">Loading exam schedule...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Teacher Not Found</h3>
              <p className="text-gray-500">Unable to load teacher information.</p>
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
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <FaClipboardList className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">Exam Schedule</h1>
              <p className="text-xs xs:text-sm text-gray-600">
                Dear Teacher <span className="font-semibold text-blue-600">{teacher?.name}</span> - Your upcoming exams
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 xs:p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Exams</p>
                <p className="text-xl xs:text-2xl font-bold text-blue-800">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <FaClipboardList className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 xs:p-6 rounded-xl border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Today</p>
                <p className="text-xl xs:text-2xl font-bold text-red-800">{stats.today}</p>
              </div>
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 xs:p-6 rounded-xl border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">This Week</p>
                <p className="text-xl xs:text-2xl font-bold text-yellow-800">{stats.thisWeek}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <FaClock className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 xs:p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Completed</p>
                <p className="text-xl xs:text-2xl font-bold text-green-800">{stats.completed}</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <FaGraduationCap className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 xs:px-6 py-4 xs:py-6">
            <div className="flex items-center space-x-3">
              <FaChalkboardTeacher className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
              <div>
                <h2 className="text-lg xs:text-xl font-bold text-white">Your Exam Schedule</h2>
                <p className="text-sm text-white text-opacity-90">Exams for your assigned classes and subjects</p>
              </div>
            </div>
          </div>

          <div className="p-4 xs:p-6">
            {findSubjectExam.length > 0 ? (
              <div className="overflow-x-auto">
                <Table columns={examColumns} data={findSubjectExam} />
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClipboardList className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Exams Scheduled</h3>
                <p className="text-gray-500">There are currently no exams scheduled for your classes and subjects.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}