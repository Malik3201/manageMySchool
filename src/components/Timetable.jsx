import { useState } from "react";
import Button from "./Button";
import TimetableEditModal from "./TimetableEditModal";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periodTime = [
  "09:00 - 09:45",
  "09:45 - 10:30",
  "10:30 - 11:15",
  "11:15 - 11:45",
  "11:45 - 12:30",
  "12:30 - 01:15",
  "01:15 - 02:00",
];

const Timetable = ({ classLabel, section, schedule }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(schedule);

  const handleSave = (updatedSchedule) => {
    setCurrentSchedule(updatedSchedule);

    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-2xl overflow-auto max-w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Timetable - {classLabel} {section}
      </h2>
      <Button onClick={() => setIsModalOpen(true)}>Update Time Table</Button>

      {isModalOpen && (
        <TimetableEditModal
          setIsModalOpen={setIsModalOpen}
          schedule={currentSchedule}
          onSave={handleSave}
        />
      )}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-collapse table-auto text-sm text-left">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="border p-2">Time</th>
              {days.map((day) => (
                <th key={day} className="border p-2">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periodTime.map((time, periodIndex) => (
              <tr key={time}>
                <td className="border p-2 font-medium bg-gray-50">{time}</td>
                {days.map((day) => {
                  const period = currentSchedule[day][periodIndex];
                  const isBreak = period.subject === "Break";

                  return (
                    <td
                      key={`${day}-${periodIndex}`}
                      className={`border p-2 ${
                        isBreak
                          ? "bg-yellow-100 text-center font-semibold text-gray-700"
                          : "text-gray-800"
                      }`}
                    >
                      {isBreak ? (
                        "Break"
                      ) : (
                        <>
                          <div className="font-semibold">{period.subject}</div>
                          <div className="text-xs text-gray-500">
                            {period.teacher}
                          </div>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
