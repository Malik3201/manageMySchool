const ReportCard = ({ report }) => {
  if (!report || report.length === 0) {
    return (
      <h1 className="text-center text-red-500 mt-5">No Report Card Found</h1>
    );
  }

  return (
    <div className="space-y-12">
      {report.map((student, idx) => (
        <div
          key={idx}
          className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-2xl p-8 mt-8 border border-gray-200"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-5 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {student.exam}
              </h1>
              <p className="text-gray-600 mt-1">
                <span className="font-semibold text-gray-800">
                  {student.studentName || "Unnamed Student"}
                </span>
                {" | "}
                {student.class} - Section {student.section}
                {" | Roll No: "}
                <span className="font-semibold">{student.rollNumber}</span>
              </p>
            </div>
            <div className="mt-3 md:mt-0 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold shadow-sm">
              Academic Year 2025
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="w-full border-collapse text-center">
              <thead className="bg-gray-100">
                <tr className="text-gray-700">
                  <th className="border p-3">Subject</th>
                  <th className="border p-3">Marks Obtained</th>
                  <th className="border p-3">Total Marks</th>
                  <th className="border p-3">Grade</th>
                </tr>
              </thead>
              <tbody>
                {student.subjects.map((sub, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="border p-2 font-medium text-gray-800">
                      {sub.name}
                    </td>
                    <td className="border p-2 text-blue-600 font-semibold">
                      {sub.marksObtained}
                    </td>
                    <td className="border p-2">{sub.totalMarks}</td>
                    <td className="border p-2 text-gray-700">{sub.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border">
              <p className="text-gray-500 text-sm">Total Marks</p>
              <p className="text-xl font-bold text-gray-800">
                {student.totalMarks}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border">
              <p className="text-gray-500 text-sm">Obtained</p>
              <p className="text-xl font-bold text-green-600">
                {student.obtainedMarks}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border">
              <p className="text-gray-500 text-sm">Percentage</p>
              <p className="text-xl font-bold text-blue-600">
                {student.percentage}%
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border">
              <p className="text-gray-500 text-sm">Grade</p>
              <p className="text-xl font-bold text-purple-600">
                {student.grade}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-5 shadow-sm">
            <p className="text-gray-700 font-semibold mb-1">Remarks:</p>
            <p className="text-gray-600 italic">{student.remarks}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportCard;
