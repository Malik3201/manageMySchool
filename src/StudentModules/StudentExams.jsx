import { useEffect, useState } from "react";
import Table from "../components/Table";
import {
  FaBook,
  FaCalendarAlt,
  FaClock,
  FaGraduationCap,
  FaUser,
  FaSpinner,
  FaClipboardList,
  FaExclamationCircle,
  FaCheckCircle,
  FaInfoCircle,
  FaChalkboardTeacher,
  FaMapMarkerAlt,
  FaFileAlt,
  FaCalendarCheck,
  FaUsers,
  FaBookOpen,
  FaCalculator,
  FaFlask,
  FaLandmark,
  FaAtom,
  FaLeaf
} from "react-icons/fa";

function StudentExams() {
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [student, setStudent] = useState(null);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalExams: 0,
    upcomingExams: 0,
    completedExams: 0,
    thisWeekExams: 0
  });

  const studentID = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [studentsRes, examsRes] = await Promise.all([
          fetch("/data/users.json"),
          fetch("/data/examsData.json")
        ]);

        const studentsData = await studentsRes.json();
        const examsData = await examsRes.json();

        setStudents(studentsData);
        setExams(examsData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (students.length && exams.length) {
      const foundStudent = students.find(e => e.id === studentID);
      setStudent(foundStudent);

      if (foundStudent) {
        const filterExam = exams.filter(
          e => e.class === foundStudent.class && e.section === foundStudent.section
        );
        setFilteredExams(filterExam);

        const now = new Date();
        const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const upcomingExams = filterExam.filter(exam => new Date(exam.date) > now).length;
        const completedExams = filterExam.filter(exam => new Date(exam.date) <= now).length;
        const thisWeekExams = filterExam.filter(exam => {
          const examDate = new Date(exam.date);
          return examDate > now && examDate <= oneWeekFromNow;
        }).length;

        setStats({
          totalExams: filterExam.length,
          upcomingExams,
          completedExams,
          thisWeekExams
        });
      }
    }
  }, [students, exams, studentID]);

  const getSubjectIcon = (subject) => {
    const icons = {
      'Mathematics': FaCalculator,
      'English': FaBook,
      'Science': FaFlask,
      'History': FaLandmark,
      'Physics': FaAtom,
      'Chemistry': FaFlask,
      'Biology': FaLeaf
    };
    const IconComponent = icons[subject] || FaBookOpen;
    return <IconComponent className="w-4 h-4 text-green-500" />;
  };

  const getExamStatus = (examDate) => {
    const now = new Date();
    const exam = new Date(examDate);
    
    if (exam > now) {
      const diffTime = exam - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 3) {
        return { status: 'urgent', label: `In ${diffDays} day${diffDays > 1 ? 's' : ''}`, color: 'bg-red-100 text-red-800' };
      } else if (diffDays <= 7) {
        return { status: 'soon', label: `In ${diffDays} days`, color: 'bg-yellow-100 text-yellow-800' };
      } else {
        return { status: 'upcoming', label: `In ${diffDays} days`, color: 'bg-green-100 text-green-800' };
      }
    } else {
      return { status: 'completed', label: 'Completed', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const columns = [
    {
      header: "Subject",
      accessor: "subject",
      minWidth: '150px',
      width: '25%',
      render: (row) => (
        <div className="flex items-center space-x-3">
          {getSubjectIcon(row.subject)}
          <div>
            <div className="font-medium text-gray-900 text-sm">{row.subject}</div>
            <div className="text-xs text-gray-500">{row.class} - {row.section}</div>
          </div>
        </div>
      )
    },
    {
      header: "Date & Time",
      accessor: "date",
      minWidth: '150px',
      width: '25%',
      render: (row) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="w-3 h-3 text-green-500" />
            <span className="text-sm font-medium text-gray-900">{row.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock className="w-3 h-3 text-green-500" />
            <span className="text-xs text-gray-600">{row.time}</span>
          </div>
        </div>
      )
    },
    {
      header: "Status",
      accessor: "date",
      minWidth: '120px',
      width: '20%',
      render: (row) => {
        const status = getExamStatus(row.date);
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
            {status.label}
          </span>
        );
      }
    },
    {
      header: "Details",
      accessor: "id",
      minWidth: '100px',
      width: '15%',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <button className="text-green-600 hover:text-green-800 p-1 rounded transition-colors duration-200">
            <FaInfoCircle className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                <FaSpinner className="w-8 h-8 text-white animate-spin" />
              </div>
              <p className="text-gray-700 font-medium">Loading exam schedule...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <FaExclamationCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Student information not found</p>
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
              <FaClipboardList className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">My Exams</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 xs:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs xs:text-sm font-medium text-gray-600">Total Exams</p>
                <p className="text-xl xs:text-2xl font-bold text-gray-900">{stats.totalExams}</p>
              </div>
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaFileAlt className="w-5 h-5 xs:w-6 xs:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 xs:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs xs:text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-xl xs:text-2xl font-bold text-green-600">{stats.upcomingExams}</p>
              </div>
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaCalendarCheck className="w-5 h-5 xs:w-6 xs:h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 xs:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs xs:text-sm font-medium text-gray-600">This Week</p>
                <p className="text-xl xs:text-2xl font-bold text-orange-600">{stats.thisWeekExams}</p>
              </div>
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FaClock className="w-5 h-5 xs:w-6 xs:h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 xs:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs xs:text-sm font-medium text-gray-600">Completed</p>
                <p className="text-xl xs:text-2xl font-bold text-gray-600">{stats.completedExams}</p>
              </div>
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="w-5 h-5 xs:w-6 xs:h-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 xs:px-6 py-4 xs:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <FaClipboardList className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                <div>
                  <h2 className="text-lg xs:text-xl font-bold text-white">Exam Schedule</h2>
                  <p className="text-sm text-white text-opacity-90">All scheduled exams for your class</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-white text-opacity-90">
                <FaCalendarAlt className="w-4 h-4" />
                <span className="text-sm">Academic Year 2024</span>
              </div>
            </div>
          </div>

          <div className="p-4 xs:p-6">
            {filteredExams.length > 0 ? (
              <Table 
                columns={columns} 
                data={filteredExams} 
                emptyMessage="No exams scheduled"
              />
            ) : (
              <div className="text-center py-12">
                <FaClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Exams Scheduled</h3>
                <p className="text-gray-500">There are no exams scheduled for your class at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentExams;
