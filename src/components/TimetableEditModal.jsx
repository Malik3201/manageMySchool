import { useForm } from "react-hook-form";
import SubjectsDropDown from "./SubjectsDropDown";
import TeachersDropDown from "./TeachersDropDown";
import {
  FaEdit,
  FaClock,
  FaCalendarDay,
  FaSave,
  FaTimes,
  FaCoffee,
  FaSpinner,
  FaBook,
  FaChalkboardTeacher
} from "react-icons/fa";
import { useState } from "react";

const periodTime = [
  "09:00 - 09:45",
  "09:45 - 10:30",
  "10:30 - 11:15",
  "11:15 - 11:45",
  "11:45 - 12:30",
  "12:30 - 01:15",
  "01:15 - 02:00",
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TimetableEditModal = ({ setIsModalOpen, schedule, onSave }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit } = useForm({
    defaultValues: { schedule },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const processedSchedule = {};
      
      days.forEach(day => {
        processedSchedule[day] = periodTime.map((time, index) => {
          const periodData = data.schedule?.[day]?.[index];
          return {
            time: time,
            subject: isBreakPeriod(index) ? "Break" : (periodData?.subject || ""),
            teacher: isBreakPeriod(index) ? null : (periodData?.teacher || ""),
            teacherId: null
          };
        });
      });
      
      onSave(processedSchedule);
      setIsSubmitting(false);
    }, 1000);
  };

  const isBreakPeriod = (index) => index === 3;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaEdit className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Edit Timetable
                </h2>
                <p className="text-sm text-white text-opacity-90">
                  Modify class schedule and assign subjects
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-200 text-white"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 p-4 sm:p-6 overflow-auto scrollbar-red">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow-sm border border-gray-200 rounded-xl">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[120px]">
                          <div className="flex items-center space-x-2">
                            <FaClock className="w-4 h-4 text-red-500" />
                            <span>Time</span>
                          </div>
                        </th>
                        {days.map((day) => (
                          <th key={day} className="px-4 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[200px]">
                            <div className="flex items-center justify-center space-x-2">
                              <FaCalendarDay className="w-4 h-4 text-red-500" />
                              <span>{day}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {periodTime.map((time, periodIndex) => (
                        <tr key={time} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-4 py-4 whitespace-nowrap bg-gray-50">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-900">{time}</span>
                            </div>
                          </td>
                          {days.map((day) => {
                            const baseName = `schedule.${day}.${periodIndex}`;
                            const breakPeriod = isBreakPeriod(periodIndex);
                            const current = schedule?.[day]?.[periodIndex] || {
                              subject: "",
                              teacher: "",
                            };

                            return (
                              <td key={day} className="px-4 py-4">
                                {breakPeriod ? (
                                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-lg p-4 text-center">
                                    <div className="flex items-center justify-center space-x-2 text-yellow-800">
                                      <FaCoffee className="w-5 h-5" />
                                      <span className="font-semibold">Break Time</span>
                                    </div>
                                    <p className="text-xs text-yellow-600 mt-1">30 minutes</p>
                                  </div>
                                ) : (
                                  <div className="space-y-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                                    <div>
                                      <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center space-x-1">
                                        <FaBook className="w-3 h-3 text-red-500" />
                                        <span>Subject</span>
                                      </label>
                                      <SubjectsDropDown
                                        register={register}
                                        name={`${baseName}.subject`}
                                        defaultValue={current.subject}
                                        variant="admin"
                                        required={false}
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center space-x-1">
                                        <FaChalkboardTeacher className="w-3 h-3 text-red-500" />
                                        <span>Teacher</span>
                                      </label>
                                      <TeachersDropDown
                                        register={register}
                                        name={`${baseName}.teacher`}
                                        defaultValue={current.teacher}
                                        variant="admin"
                                        required={false}
                                      />
                                    </div>
                                  </div>
                                )}
                                <input
                                  type="hidden"
                                  {...register(`${baseName}.time`)}
                                  defaultValue={time}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 bg-gray-50 px-4 sm:px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Class Period</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Break Time</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 sm:px-6 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                >
                  <FaTimes className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 sm:px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FaSave className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimetableEditModal;
