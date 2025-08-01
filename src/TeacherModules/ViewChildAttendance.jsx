import { useEffect, useState } from "react";
import Table from "../components/Table";

function ViewChildAttendance() {
  const [children, setChildren] = useState([]);
  const parentID = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    async function fetchData() {
      const userRes = await fetch("/data/users.json");
      const attendanceRes = await fetch("/data/studentAttendanceData.json");
      const users = await userRes.json();
      const attendanceData = await attendanceRes.json();

      const parent = users.find(u => u.id === parentID);

      if (parent?.childrenID?.length > 0) {
        const childDetails = parent.childrenID.map(childId => {
          const student = users.find(u => u.id === childId);
          const attendance = attendanceData.find(a => a.studentId === childId);

          const total = attendance?.attendance?.length || 0;
          const presentCount = attendance?.attendance?.filter(a => a.status === "present").length || 0;
          const percentage = total > 0 ? ((presentCount / total) * 100).toFixed(0) : 0;

          const message =
            presentCount > total - presentCount && presentCount > 3
              ? "Very good Attendance Progress of this month"
              : "Very bad Attendance Progress of this month";

          return {
            id: childId,
            name: student?.name,
            attendance: attendance?.attendance || [],
            progress: {
              msg: message,
              percntage: percentage
            }
          };
        });

        setChildren(childDetails);
      }
    }

    fetchData();
  }, []);

  const examColumns = [
    { header: "Date", accessor: "date" },
    { header: "Attendance", accessor: "status" }
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 space-y-10">
      {children.map(child => (
        <div key={child.id}>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
            <span className="text-indigo-600">{child.name}</span>
            <span className="text-gray-800">'s Attendance of This Month</span>
          </h1>

          {child.progress?.msg && (
            <div className="bg-gradient-to-r from-green-100 to-green-200 border border-green-300 rounded-xl p-4 mb-6 shadow-md text-center">
              <h2 className="text-lg font-semibold text-green-800">{child.progress.msg}</h2>
              <p className="text-3xl font-bold text-green-900 mt-1">{child.progress.percntage}%</p>
            </div>
          )}

          <div className="bg-white shadow-xl rounded-2xl ring-1 ring-gray-200">
            <div className="overflow-x-auto p-4">
              <Table columns={examColumns} data={child.attendance} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewChildAttendance;
