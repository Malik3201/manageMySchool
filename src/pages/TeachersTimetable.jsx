import { useEffect, useState } from "react";
import axios from "axios";

const TeachersTimetable = () => {
  const currentTeacherId = JSON.parse(localStorage.getItem("userId"));
  const [timeTable, setTimeTable] = useState(null);
  const [teacherSchedule, setTeacherSchedule] = useState([]);

  useEffect(() => {
    const fetchTimeTable = async () => {
      const res = await axios.get("/data/timetable.json");
      setTimeTable(res.data);
    };
    fetchTimeTable();
  }, []);

  useEffect(() => {
    if (!timeTable) return;

    const schedule = [];

    timeTable.forEach((classData) => {
      const className = `${classData.class} ${classData.section}`;
      Object.entries(classData.schedule).forEach(([day, periods]) => {
        periods.forEach((period) => {
          if (period.teacherId == currentTeacherId) {
            schedule.push({
              class: className,
              day: day,
              time: period.time,
              subject: period.subject,
            });
          }
        });
      });
    });

    setTeacherSchedule(schedule);
  }, [timeTable, currentTeacherId]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Teacher Schedule
        </h2>

        {teacherSchedule.length === 0 ? (
          <p className="text-center text-gray-500">No classes assigned yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Day</th>
                  <th className="py-3 px-4 text-left">Time</th>
                  <th className="py-3 px-4 text-left">Subject</th>
                  <th className="py-3 px-4 text-left">Class</th>
                </tr>
              </thead>
              <tbody>
                {teacherSchedule.map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-blue-50 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-2 px-4">{item.day}</td>
                    <td className="py-2 px-4">{item.time}</td>
                    <td className="py-2 px-4">{item.subject}</td>
                    <td className="py-2 px-4">{item.class}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersTimetable;
