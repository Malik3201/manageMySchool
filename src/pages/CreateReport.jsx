import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../components/Table";
import UpdateMarksModal from "../components/UpdateMarksModal";
import {
  FaFileAlt,
  FaBook,
  FaGraduationCap,
  FaUsers,
  FaEdit,
  FaSave,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
  FaChartLine,
  FaDownload,
  FaPrint,
  FaEye,
  FaSearch,
  FaFilter,
  FaTimes,
  FaPlus
} from "react-icons/fa";

const CreateReport = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [examType, setExamType] = useState("Final Exam");
  const [totalMarks, setTotalMarks] = useState(100);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedSubject = watch("subject");
  const selectedClass = watch("class");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [teachersRes, studentsRes] = await Promise.all([
          axios.get("/data/teachers.json"),
          axios.get("/data/students.json")
        ]);
        
        const teacherData = teachersRes.data.find((tch) => tch.id == currentUserId);
        setTeacher(teacherData);
        setStudents(studentsRes.data || []);
        
        if (teacherData) {
          setSubjects(teacherData.subjects || []);
          setClasses(teacherData.assignedClasses || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUserId]);

  const onSubmit = (data) => {
    if (!data.class || !data.subject) return;
    
    setIsSubmitting(true);
    const selectedClassSection = data.class;
    const [cls, section] = selectedClassSection.split(" - ");

    setTimeout(() => {
      const filtered = students.filter((stu) => stu.class === cls && stu.section === section);
      const studentsWithMarks = filtered.map(student => ({
        ...student,
        marks: student.marks || Math.floor(Math.random() * 40) + 60,
        grade: calculateGrade(student.marks || Math.floor(Math.random() * 40) + 60)
      }));
      setFilteredStudents(studentsWithMarks);
      setIsSubmitting(false);
    }, 1000);
  };

  const calculateGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B+';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C+';
    if (marks >= 40) return 'C';
    return 'F';
  };

  const getFilteredStudents = () => {
    if (!searchTerm) return filteredStudents;
    return filteredStudents.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toString().includes(searchTerm)
    );
  };

  const displayStudents = getFilteredStudents();

  const getStats = () => {
    const total = filteredStudents.length;
    const avgMarks = total > 0 
      ? (filteredStudents.reduce((sum, s) => sum + (s.marks || 0), 0) / total).toFixed(1)
      : 0;
    const passed = filteredStudents.filter(s => (s.marks || 0) >= 40).length;
    const excellent = filteredStudents.filter(s => (s.marks || 0) >= 90).length;
    
    return { total, avgMarks, passed, excellent };
  };

  const stats = getStats();

  const columns = [
    {
      header: "Student Info",
      minWidth: '200px',
      width: '30%',
      render: (student) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
            {student.name?.charAt(0)?.toUpperCase() || 'S'}
          </div>
          <div>
            <div className="font-medium text-gray-900 text-sm sm:text-base">{student.name || 'N/A'}</div>
            <div className="text-xs sm:text-sm text-gray-500">Roll: {student.rollNumber || 'N/A'}</div>
          </div>
        </div>
      )
    },
    {
      header: "Marks",
      minWidth: '120px',
      width: '20%',
      render: (student) => (
        <div className="text-center">
          <div className="font-semibold text-gray-900 text-sm sm:text-base">
            {student.marks || 0}/{totalMarks}
          </div>
          <div className="text-xs text-gray-500">{((student.marks || 0) / totalMarks * 100).toFixed(1)}%</div>
        </div>
      )
    },
    {
      header: "Grade",
      minWidth: '100px',
      width: '15%',
      render: (student) => {
        const grade = student.grade || calculateGrade(student.marks || 0);
        const gradeConfig = {
          'A+': 'bg-green-100 text-green-800 border-green-200',
          'A': 'bg-green-100 text-green-800 border-green-200',
          'B+': 'bg-blue-100 text-blue-800 border-blue-200',
          'B': 'bg-blue-100 text-blue-800 border-blue-200',
          'C+': 'bg-yellow-100 text-yellow-800 border-yellow-200',
          'C': 'bg-yellow-100 text-yellow-800 border-yellow-200',
          'F': 'bg-red-100 text-red-800 border-red-200'
        };
        
        return (
          <div className="flex justify-center">
            <span className={`inline-flex items-center px-2 py-1 rounded-lg border font-medium text-xs ${gradeConfig[grade] || gradeConfig['F']}`}>
              {grade}
            </span>
          </div>
        );
      }
    },
    {
      header: "Actions",
      minWidth: '200px',
      width: '35%',
      render: (student) => (
        <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
          <button
            onClick={() => {
              setSelectedStudent(student);
              setIsModalOpen(true);
            }}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-1"
          >
            <FaEdit className="w-3 h-3" />
            <span>Update</span>
          </button>
          <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-1">
            <FaEye className="w-3 h-3" />
            <span className="hidden sm:inline">View</span>
          </button>
        </div>
      )
    }
  ];

  const handleSaveReport = async () => {
    if (!selectedSubject || !selectedClass || filteredStudents.length === 0) {
      alert('Please select subject, class and ensure students are loaded.');
      return;
    }

    setIsSubmitting(true);
    
    const reportData = {
      teacherId: currentUserId,
      subject: selectedSubject,
      class: selectedClass,
      examType: examType,
      totalMarks: totalMarks,
      createdAt: new Date().toISOString(),
      students: filteredStudents.map(student => ({
        studentId: student.id,
        name: student.name,
        rollNumber: student.rollNumber,
        marks: student.marks || 0,
        grade: student.grade || calculateGrade(student.marks || 0)
      })),
      stats: stats
    };

    setTimeout(() => {
      console.log('Report saved:', reportData);
      alert('Report created successfully!');
      setIsSubmitting(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="p-2 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                <FaFileAlt className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-700 font-medium">Loading report creation...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <FaFileAlt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Create Report</h1>
              <p className="text-sm text-gray-600">Generate academic reports and manage student marks</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <FaFilter className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
              <h2 className="text-lg sm:text-xl font-semibold text-white">Report Configuration</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 pt-4 border-t border-white border-opacity-30">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <FaBook className="inline w-3 h-3 mr-1" />
                    Subject
                  </label>
                  <select
                    {...register("subject", { required: "Subject is required" })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 text-white focus:outline-none focus:bg-opacity-30"
                  >
                    <option value="" className="text-gray-900">Select Subject</option>
                    {subjects.map((sub, indx) => (
                      <option key={indx} value={sub} className="text-gray-900">
                        {sub}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-sm text-red-200 mt-1 flex items-center">
                      <FaExclamationCircle className="w-3 h-3 mr-1" />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <FaGraduationCap className="inline w-3 h-3 mr-1" />
                    Class
                  </label>
                  <select
                    {...register("class", { required: "Class is required" })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 text-white focus:outline-none focus:bg-opacity-30"
                  >
                    <option value="" className="text-gray-900">Select Class</option>
                    {classes.map((cls, indx) => (
                      <option key={indx} value={cls} className="text-gray-900">
                        {cls}
                      </option>
                    ))}
                  </select>
                  {errors.class && (
                    <p className="text-sm text-red-200 mt-1 flex items-center">
                      <FaExclamationCircle className="w-3 h-3 mr-1" />
                      {errors.class.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <FaFileAlt className="inline w-3 h-3 mr-1" />
                    Exam Type
                  </label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 text-white focus:outline-none focus:bg-opacity-30"
                  >
                    <option value="Final Exam" className="text-gray-900">Final Exam</option>
                    <option value="Mid Term" className="text-gray-900">Mid Term</option>
                    <option value="Monthly Test" className="text-gray-900">Monthly Test</option>
                    <option value="Quiz" className="text-gray-900">Quiz</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <FaChartLine className="inline w-3 h-3 mr-1" />
                    Total Marks
                  </label>
                  <input
                    type="number"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(Number(e.target.value))}
                    min="1"
                    max="1000"
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:bg-opacity-30"
                    placeholder="100"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedSubject || !selectedClass}
                    className={`w-full bg-white text-red-600 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      isSubmitting || !selectedSubject || !selectedClass
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-100 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Loading...</span>
                      </>
                    ) : (
                      <>
                        <FaUsers className="w-4 h-4" />
                        <span className="text-sm">Load Students</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {filteredStudents.length > 0 && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Students</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <FaUsers className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Marks</p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.avgMarks}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <FaChartLine className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Passed</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.passed}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">A+ Grades</p>
                      <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.excellent}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <FaGraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveReport}
                    disabled={isSubmitting}
                    className={`px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <FaSpinner className="w-4 h-4 animate-spin" />
                    ) : (
                      <FaSave className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">{isSubmitting ? 'Saving...' : 'Save Report'}</span>
                    <span className="sm:hidden">{isSubmitting ? 'Saving...' : 'Save'}</span>
                  </button>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                    <FaDownload className="w-4 h-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Student Marks - {selectedSubject} ({examType})
                    </h3>
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {displayStudents.length} Student{displayStudents.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <Table columns={columns} data={displayStudents} />
                </div>
              </div>
            </div>
          )}

          {filteredStudents.length === 0 && !isSubmitting && (selectedSubject || selectedClass) && (
            <div className="p-8">
              <div className="text-center">
                <FaUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Students Found</h3>
                <p className="text-gray-500">
                  Please select both subject and class to load students for report creation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <UpdateMarksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
        onSave={(id, marks) => {
          setFilteredStudents((prev) =>
            prev.map((stu) => 
              stu.id === id 
                ? { ...stu, marks: marks, grade: calculateGrade(marks) } 
                : stu
            )
          );
        }}
      />
    </div>
  );
};

export default CreateReport;
