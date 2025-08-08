import { useEffect, useState } from "react";
import Table from "../components/Table";
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaUsers,
  FaClipboardCheck,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaBookOpen,
  FaUserGraduate,
  FaExclamationCircle
} from "react-icons/fa";

function ClassAttendance() {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendanceData, setAttendanceData] = useState({});
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilterStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [teachersRes, classesRes, studentsRes] = await Promise.all([
          fetch("/data/teachers.json"),
          fetch("/data/classes.json"),
          fetch("/data/students.json")
        ]);
        
        const teachersData = await teachersRes.json();
        const classesData = await classesRes.json();
        const studentsData = await studentsRes.json();
        
        setTeachers(teachersData);
        setClasses(classesData);
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const teacherId = JSON.parse(localStorage.getItem("userId"));
  const teacher = teachers.find((e) => e.id === teacherId);
    const filterClasses = teacher?.assignedClasses ? classes.flatMap((cls) =>
    cls.sections
      .filter((sec) =>
        teacher.assignedClasses.includes(`${cls.className} - ${sec.section}`)
      )
      .map((sec) => ({
        className: cls.className,
        section: sec.section,
      }))
  ) : [];

  useEffect(() => {
    if (!selectedClass || !classes.length || !students.length) {
      setFilterStudents([]);
      setAttendanceData({});
      return;
    }

    const cls = classes.find((cls) => selectedClass.startsWith(cls.className));
  const findStudents = cls
    ? cls.sections.find(
        (sec) => `${cls.className} - ${sec.section}` === selectedClass
      )?.students || []
    : [];

  const filterStudents = students.filter((e) =>
    findStudents.some((s) => e.id === s)
  );

  setFilterStudents(filterStudents);

  const initialAttendance = {};
    filterStudents.forEach((stu) => {
    initialAttendance[stu.id] = "Present";
  });

  setAttendanceData(initialAttendance);
  }, [selectedClass, students, classes]);

  const handleStatusChange = (id, status) => {
    setAttendanceData(prev => ({ ...prev, [id]: status }));
  };

  const onSubmit = async () => {
    if (!attendanceDate || !selectedClass) {
      alert('Please select class and date.');
      return;
    }

    setSubmitting(true);
    try {
    const record = {
      date: attendanceDate,
      class: selectedClass,
      records: filteredStudents.map(stu => ({
        studentId: stu.id,
        status: attendanceData[stu.id] || 'Present'
      }))
    };
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Attendance marked successfully!');
      
      setAttendanceDate("");
      setSelectedClass("");
      setFilterStudents([]);
      setAttendanceData({});
    } catch (error) {
      alert('Error marking attendance. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getAttendanceStats = () => {
    const total = filteredStudents.length;
    const present = Object.values(attendanceData).filter(status => status === 'Present').length;
    const absent = Object.values(attendanceData).filter(status => status === 'Absent').length;
    const leave = Object.values(attendanceData).filter(status => status === 'Leave').length;
    
    return { total, present, absent, leave };
  };

  const stats = getAttendanceStats();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-50 text-green-700 border-green-200';
      case 'Absent': return 'bg-red-50 text-red-700 border-red-200';
      case 'Leave': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present': return <FaCheckCircle className="w-3 h-3" />;
      case 'Absent': return <FaTimesCircle className="w-3 h-3" />;
      case 'Leave': return <FaClock className="w-3 h-3" />;
      default: return null;
    }
  };

  const columns = [
    { 
      header: 'Roll No', 
      accessor: 'rollNumber',
      width: '15%'
    },
    { 
      header: 'Student Name', 
      accessor: 'name',
      width: '35%',
      render: (student) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <FaUserGraduate className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium text-gray-900">{student.name}</span>
        </div>
      )
    },
    {
      header: 'Attendance Status',
      width: '50%',
      render: (stu) => (
        <div className="flex flex-wrap gap-2">
          {['Present', 'Absent', 'Leave'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => handleStatusChange(stu.id, status)}
              className={`inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:scale-105 ${
                attendanceData[stu.id] === status
                  ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                  : `${getStatusColor(status)} hover:shadow-md`
              }`}
            >
              {getStatusIcon(status)}
              <span>{status}</span>
            </button>
          ))}
        </div>
      )
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
              <p className="text-gray-700 font-medium">Loading class data...</p>
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
              <FaClipboardCheck className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">Class Attendance</h1>
              <p className="text-xs xs:text-sm text-gray-600">
                Dear Teacher <span className="font-semibold text-blue-600">{teacher?.name}</span> - Mark attendance for your classes
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 xs:px-6 py-4 xs:py-6">
            <div className="flex items-center space-x-3">
              <FaChalkboardTeacher className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
              <div>
                <h2 className="text-lg xs:text-xl font-bold text-white">Attendance Management</h2>
                <p className="text-sm text-white text-opacity-90">Select class and mark student attendance</p>
              </div>
            </div>
          </div>

          <div className="p-4 xs:p-6 space-y-4 xs:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-6">
    <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <FaBookOpen className="w-4 h-4 text-blue-500" />
                  <span>Select Class - Section</span>
                </label>
      <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
      >
        <option value="">-- Select Class - Section --</option>
        {filterClasses.map((item, idx) => (
          <option key={idx} value={`${item.className} - ${item.section}`}>
            {item.className} - {item.section}
          </option>
        ))}
      </select>
    </div>
   
    <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <FaCalendarAlt className="w-4 h-4 text-blue-500" />
                  <span>Attendance Date</span>
                </label>
      <input
        type="date"
        value={attendanceDate}
        onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />
    </div>

              <div className="flex flex-col justify-end">
      <button
        onClick={onSubmit}
                  disabled={submitting || !selectedClass || !attendanceDate}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FaClipboardCheck className="w-4 h-4" />
                      <span>Submit Attendance</span>
                    </>
                  )}
      </button>
    </div>
  </div>

            {filteredStudents.length > 0 && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 xs:p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Total Students</p>
                        <p className="text-xl xs:text-2xl font-bold text-blue-800">{stats.total}</p>
                      </div>
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <FaUsers className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 xs:p-6 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600">Present</p>
                        <p className="text-xl xs:text-2xl font-bold text-green-800">{stats.present}</p>
                      </div>
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 xs:p-6 rounded-xl border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-600">Absent</p>
                        <p className="text-xl xs:text-2xl font-bold text-red-800">{stats.absent}</p>
                      </div>
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <FaTimesCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 xs:p-6 rounded-xl border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-600">On Leave</p>
                        <p className="text-xl xs:text-2xl font-bold text-yellow-800">{stats.leave}</p>
                      </div>
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                        <FaClock className="w-5 h-5 text-white" />
                      </div>
                    </div>
    </div>
</div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 xs:px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <FaUsers className="w-5 h-5 text-blue-500" />
                      <span>Student Attendance - {selectedClass}</span>
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <Table columns={columns} data={filteredStudents} />
                  </div>
                </div>
              </>
            )}

            {selectedClass && filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Students Found</h3>
                <p className="text-gray-500">The selected class has no enrolled students.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClassAttendance;
