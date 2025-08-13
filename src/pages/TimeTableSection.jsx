import axios from "axios";
import Timetable from "../components/Timetable";
import { useEffect, useState } from "react";
import ClassesDropdown from "../components/ClassesDropdown";
import SectionsDropdown from "../components/SectionsDropdown";
import { useForm } from "react-hook-form";
import {
  FaCalendarAlt,
  FaClock,
  FaGraduationCap,
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaSpinner,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit,
  FaDownload,
  FaPrint,
  FaEye,
  FaExclamationCircle
} from "react-icons/fa";

const TimeTableSection = () => {
  const [timeTbl, setTimeTbl] = useState(null);
  const [allTimetables, setAllTimetables] = useState([]);
  const [classSchedule, setClassSchedule] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedClass = watch("class");
  const selectedSection = watch("section");

  useEffect(() => {
    const fetchAllTimetables = async () => {
      try {
        const res = await axios.get("/data/timetable.json");
        setAllTimetables(res.data || []);
      } catch (error) {
        console.error("Error fetching timetables:", error);
        setAllTimetables([]);
      }
    };
    fetchAllTimetables();
  }, []);

  useEffect(() => {
    const fetchTimeTable = async () => {
      if (!classSchedule.class || !classSchedule.section) return;
      
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const currentTimeTable = allTimetables.find(
          (schdl) =>
            schdl.class === classSchedule.class &&
            schdl.section === classSchedule.section
        );
        setTimeTbl(currentTimeTable || null);
      } catch (error) {
        console.error("Error fetching timetable:", error);
        setTimeTbl(null);
      } finally {
        setLoading(false);
      }
    };

      fetchTimeTable();
  }, [classSchedule, allTimetables]);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
    setClassSchedule(data);
      setIsSubmitting(false);
    }, 500);
  };

  const getStats = () => {
    const totalTimetables = allTimetables.length;
    const totalClasses = new Set(allTimetables.map(t => t.class)).size;
    const totalSections = new Set(allTimetables.map(t => `${t.class}-${t.section}`)).size;
    const avgPeriodsPerDay = allTimetables.length > 0 
      ? Math.round(allTimetables.reduce((sum, t) => {
          const days = Object.keys(t.schedule || {});
          const totalPeriods = days.reduce((daySum, day) => daySum + (t.schedule[day]?.length || 0), 0);
          return sum + (totalPeriods / Math.max(days.length, 1));
        }, 0) / allTimetables.length)
      : 0;

    return { totalTimetables, totalClasses, totalSections, avgPeriodsPerDay };
  };

  const stats = getStats();

  const createNewTimetable = () => {
    if (!selectedClass || !selectedSection) {
      alert('Please select class and section first');
      return;
    }
    
    const newTimetable = {
      class: selectedClass,
      section: selectedSection,
      schedule: {}
    };
    
    setTimeTbl(newTimetable);
    setClassSchedule({ class: selectedClass, section: selectedSection });
  };

  return (
    <div className="p-2 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <FaCalendarAlt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Timetable Management</h1>
              <p className="text-sm text-gray-600">Manage class schedules and weekly timetables</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Timetables</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalTimetables}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.totalClasses}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <FaGraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sections</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.totalSections}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaUsers className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Periods</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.avgPeriodsPerDay}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <FaClock className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <FaFilter className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">Timetable Selector</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 pt-4 border-t border-white border-opacity-30">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <ClassesDropdown register={register} errors={errors} required={true} variant="admin" />
                </div>
                
                <div>
                  <SectionsDropdown register={register} errors={errors} required={true} variant="admin" />
                </div>

                <div className="flex items-end">
                  <button
          type="submit"
                    disabled={isSubmitting || !selectedClass || !selectedSection}
                    className={`w-full bg-white text-red-600 px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      isSubmitting || !selectedClass || !selectedSection
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-100 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="w-4 h-4 animate-spin" />
                        <span className="text-sm sm:text-base">Loading...</span>
                      </>
                    ) : (
                      <>
                        <FaSearch className="w-4 h-4" />
                        <span className="text-sm sm:text-base">View Timetable</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={createNewTimetable}
                    disabled={!selectedClass || !selectedSection}
                    className={`w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      !selectedClass || !selectedSection ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <FaPlus className="w-4 h-4" />
                    <span className="text-sm sm:text-base">Create New</span>
                  </button>
                </div>
              </div>
      </form>
          </div>

          <div className="p-6">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                    <FaSpinner className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <p className="text-gray-700 font-medium">Loading timetable...</p>
                </div>
              </div>
            )}

            {!loading && timeTbl && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <FaCalendarAlt className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">Timetable Found!</h3>
                      <p className="text-sm text-green-600">
                        Viewing timetable for {timeTbl.class} - Section {timeTbl.section}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                      <FaDownload className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                      <FaPrint className="w-4 h-4" />
                      <span className="hidden sm:inline">Print</span>
                    </button>
                  </div>
                </div>
                
        <Timetable
          classLabel={timeTbl.class}
          section={timeTbl.section}
          schedule={timeTbl.schedule}
        />
              </div>
            )}

            {!loading && classSchedule.class && classSchedule.section && !timeTbl && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaExclamationCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Timetable Found</h3>
                <p className="text-gray-500 mb-4">
                  No timetable found for {classSchedule.class} - Section {classSchedule.section}.
                </p>
                <button
                  onClick={createNewTimetable}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 mx-auto"
                >
                  <FaPlus className="w-4 h-4" />
                  <span>Create New Timetable</span>
                </button>
              </div>
            )}

            {!loading && !classSchedule.class && !classSchedule.section && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCalendarAlt className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Class & Section</h3>
                <p className="text-gray-500">
                  Choose a class and section to view or create their timetable.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTableSection;
