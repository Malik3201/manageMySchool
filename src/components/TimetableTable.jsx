const TimetableTable = ({ student, timetable }) => {
  const days = Object.keys(timetable);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {student.class} - Section {student.section} Timetable
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-center">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-3 w-32">Day</th>
              <th className="border p-3 w-40">Time</th>
              <th className="border p-3">Subject</th>
              <th className="border p-3">Teacher</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) =>
              timetable[day].map((period, index) => (
                <tr
                  key={day + index}
                  className={`${
                    period.subject === "Break"
                      ? "bg-yellow-50"
                      : "hover:bg-gray-50"
                  } transition-colors duration-150`}
                >
                  {index === 0 ? (
                    <td
                      rowSpan={timetable[day].length}
                      className="border font-semibold text-gray-700 bg-gray-50"
                    >
                      {day}
                    </td>
                  ) : null}

                  <td className="border p-2 text-gray-700">{period.time}</td>
                  <td className="border p-2 font-medium text-gray-800">
                    {period.subject}
                  </td>
                  <td className="border p-2 text-gray-600">
                    {period.teacher || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimetableTable;
