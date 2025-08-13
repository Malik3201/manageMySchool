import { useEffect, useState } from "react";
import ClassesDropdown from "../../components/ClassesDropdown";
import SectionsDropdown from "../../components/SectionsDropdown";
import SubjectsDropDown from "../../components/SubjectsDropDown";
import { useForm } from "react-hook-form";
import Table from "../../components/Table";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaUsers,
  FaClipboardList,
  FaSave,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaSearch,
  FaChartBar,
  FaCalendarCheck,
  FaSchool
} from "react-icons/fa";

function ExamsManagement() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [examData, setExamData] = useState([]); 
  const [showFilters, setShowFilters] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const selectedClass = watch("class");
  
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("/data/classes.json").then(res => res.json()),
      fetch("/data/examsData.json").then(res => res.json()).catch(() => [])
    ]).then(([classesData, examsData]) => {
      setClasses(classesData);
      setExamData(examsData);
      setLoading(false);
    }).catch((err) => {
      console.error("Error loading data:", err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedClass && classes.length > 0) {
      const foundClass = classes.find((cls) => cls.className === selectedClass);
      const classSections = foundClass ? foundClass.sections.map(s => s.section) : [];
      setSections(classSections);
    }
  }, [selectedClass, classes]);

  const getExamStats = () => {
    const total = examData.length;
    const today = new Date().toISOString().split('T')[0];
    const upcoming = examData.filter(exam => exam.date > today).length;
    const completed = examData.filter(exam => exam.date < today).length;
    const todayExams = examData.filter(exam => exam.date === today).length;
    const uniqueSubjects = [...new Set(examData.map(exam => exam.subject))].length;
    
    return { total, upcoming, completed, todayExams, uniqueSubjects };
  };

  const stats = getExamStats();

  const getFilteredExams = () => {
    return examData.filter(exam => {
      const matchesSearch = 
        exam.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.section?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = !filterClass || exam.class === filterClass;
      const matchesSubject = !filterSubject || exam.subject === filterSubject;
      
      return matchesSearch && matchesClass && matchesSubject;
    });
  };

  const filteredExams = getFilteredExams();

  const onSubmit = async (data) => {
    if (!data.date || !data.time) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
    const examRecord = {
        id: Date.now(),
        date: data.date,
        time: data.time,
      class: data.class,
      section: data.section,
        subject: data.subject,
        createdAt: new Date().toISOString()
    };

      const updatedData = [...examData, examRecord];
    setExamData(updatedData);
      
      localStorage.setItem("examData", JSON.stringify(updatedData));
      
      setTimeout(() => {
        console.log("Exam Data Saved:", examRecord);
        alert("Exam scheduled successfully!");
        setIsSubmitting(false);
        reset();
      }, 1000);
    } catch (error) {
      console.error('Error scheduling exam:', error);
      setIsSubmitting(false);
    }
  };

  const handleDelete = (rowToDelete) => {
    if (window.confirm('Are you sure you want to delete this exam schedule?')) {
      const updatedData = examData.filter((row) => row.id !== rowToDelete.id);
      setExamData(updatedData);
      localStorage.setItem("examData", JSON.stringify(updatedData));
    }
  };

  const handleEdit = (exam) => {
    console.log("Edit exam:", exam);
    alert("Edit functionality would be implemented here");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterClass("");
    setFilterSubject("");
  };

  const examColumns = [
    {
      header: "Exam Details",
      minWidth: '200px',
      width: '30%',
      render: (exam) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FaBook className="w-3 h-3 text-blue-500 flex-shrink-0" />
            <span className="font-medium text-gray-900 text-sm sm:text-base leading-tight">{exam.subject || 'N/A'}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FaSchool className="w-3 h-3 text-gray-400 flex-shrink-0" />
            <span>{exam.class || 'N/A'} - {exam.section || 'N/A'}</span>
          </div>
        </div>
      )
    },
    {
      header: "Date & Time",
      minWidth: '150px',
      width: '25%',
      render: (exam) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm">
            <FaCalendarAlt className="w-3 h-3 text-green-500 flex-shrink-0" />
            <span className="text-gray-900 font-medium">{exam.date ? new Date(exam.date).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <FaClock className="w-3 h-3 text-orange-500 flex-shrink-0" />
            <span className="text-gray-600">{exam.time || 'N/A'}</span>
          </div>
        </div>
      )
    },
    {
      header: "Status",
      minWidth: '120px',
      width: '20%',
      render: (exam) => {
        const today = new Date().toISOString().split('T')[0];
        const examDate = exam.date;
        
        let status, statusColor;
        if (examDate === today) {
          status = 'Today';
          statusColor = 'bg-blue-100 text-blue-800 border-blue-200';
        } else if (examDate > today) {
          status = 'Upcoming';
          statusColor = 'bg-green-100 text-green-800 border-green-200';
        } else {
          status = 'Completed';
          statusColor = 'bg-gray-100 text-gray-800 border-gray-200';
        }

        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-lg border font-medium text-xs ${statusColor}`}>
            {status}
          </span>
        );
      }
    },
    {
      header: "Students",
      minWidth: '100px',
      width: '25%',
      render: (exam) => {
        const foundClass = classes.find(cls => cls.className === exam.class);
        const foundSection = foundClass?.sections.find(sec => sec.section === exam.section);
        const studentCount = foundSection?.students?.length || 0;

        return (
          <div className="flex items-center space-x-2">
            <FaUsers className="w-3 h-3 text-purple-500 flex-shrink-0" />
            <span className="text-sm text-gray-900 font-medium">{studentCount} students</span>
          </div>
        );
      }
    }
  ];

  const actions = (exam) => (
    <>
      <button
        onClick={() => console.log("View exam details:", exam)}
        className="p-1.5 sm:p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
        title="View Details"
      >
        <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={() => handleEdit(exam)}
        className="p-1.5 sm:p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200"
        title="Edit Exam"
      >
        <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={() => handleDelete(exam)}
        className="p-1.5 sm:p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
        title="Delete Exam"
      >
        <FaTrashAlt className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </>
  );

  if (loading) {
    return (
      <div className="p-2 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                <FaGraduationCap className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-700 font-medium">Loading exam management...</p>
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
              <FaGraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Exam Management</h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <FaPlus className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">Schedule New Exam</h2>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full sm:w-auto bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center"
              >
                <FaFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="text-sm sm:text-base">{showFilters ? 'Hide Form' : 'Show Form'}</span>
              </button>
            </div>

            {showFilters && (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 pt-4 border-t border-white border-opacity-30">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-center">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Class</label>
                    <div className="bg-white bg-opacity-20 rounded-lg">
          <ClassesDropdown register={register} errors={errors} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Section</label>
                    <div className="bg-white bg-opacity-20 rounded-lg">
          <SectionsDropdown register={register} errors={errors} sections={sections} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Subject</label>
                    <div className="bg-white bg-opacity-20 rounded-lg">
                      <SubjectsDropDown register={register} errors={errors} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <FaCalendarAlt className="inline w-3 h-3 mr-1" />
                      Date
                    </label>
          <input
                      {...register('date', { required: 'Date is required' })}
            type="date"
                      className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:bg-opacity-30"
                    />
                    {errors.date && (
                      <p className="mt-1 text-xs text-red-200">{errors.date.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <FaClock className="inline w-3 h-3 mr-1" />
                      Time
                    </label>
          <input
                      {...register('time', { required: 'Time is required' })}
            type="time"
                      className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:bg-opacity-30"
                    />
                    {errors.time && (
                      <p className="mt-1 text-xs text-red-200">{errors.time.message}</p>
                    )}
                  </div>

                  <div className="mt-7">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    > 
                      <FaSave className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-sm sm:text-base">{isSubmitting ? 'Scheduling...' : 'Schedule'}</span>
          </button>
                  </div>
        </div>
      </form>
            )}
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Exams</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FaClipboardList className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.upcoming}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <FaCalendarCheck className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.todayExams}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FaClock className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-600">{stats.completed}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                    <FaChartBar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Subjects</p>
                    <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.uniqueSubjects}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FaBook className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
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
                    placeholder="Search exams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">All Classes</option>
                  {[...new Set(examData.map(exam => exam.class))].map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">All Subjects</option>
                  {[...new Set(examData.map(exam => exam.subject))].map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <button
                  onClick={clearFilters}
                  className="col-span-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Clear
                </button>
              </div>
            </div>

            {filteredExams.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Exam Schedule
                    </h3>
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {filteredExams.length} Exam{filteredExams.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <Table columns={examColumns} data={filteredExams} actions={actions} />
                </div>
              </div>
            ) : examData.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <FaSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Matching Exams</h3>
                  <p className="text-gray-500">
                    No exams match your current search and filter criteria.
                  </p>
        <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200"
        >
                    Clear Filters
        </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <FaGraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Exams Scheduled</h3>
                  <p className="text-gray-500">
                    Get started by scheduling your first exam using the form above.
                  </p>
                </div>
  </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamsManagement;
