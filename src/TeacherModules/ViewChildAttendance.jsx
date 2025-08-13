import { useEffect, useState } from "react";
import Table from "../components/Table";

function ViewStudentAttendance() {
  const [childrenData, setChildrenData] = useState([]);
  const parentID = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, studentsRes, attendanceRes] = await Promise.all([
          fetch("/data/users.json"),
          fetch("/data/students.json"),
          fetch("/data/studentAttendanceData.json"),
        ]);

        const users = await usersRes.json();
        const students = await studentsRes.json();
        const attendanceData = await attendanceRes.json();

        const parent = users.find((u) => u.id === parentID);

        if (!parent || !Array.isArray(parent.childrenID)) return;

       
        const mappedChildren = parent.childrenID.map((childId) => {
          const student = students.find((s) => s.id === childId);
          const studentAttendance = attendanceData.find(
            (a) => a.studentId === childId
          );

          const attendance = studentAttendance?.attendance || [];

          const total = attendance.length;
          const present = attendance.filter((a) => a.status === "present").length;
          const percent = total > 0 ? Math.round((present / total) * 100) : 0;
          const msg =
            present > (total - present) && present >= 3
              ? " Very good attendance progress this month"
              : " Attendance progress needs improvement";

          return {
            id: childId,
            name: student?.name || "Unknown Student",
            attendance,
            progress: {
              msg,
              percentage: percent,
            },
          };
        });

        setChildrenData(mappedChildren);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [parentID]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-3xl shadow-lg border border-blue-200 space-y-8">
  {childrenData.length === 0 ? (
    <p className="text-center text-gray-600">No attendance records found.</p>
  ) : (
    childrenData.map((child) => (
      <div key={child.id}>
        <h2 className="text-2xl font-bold text-blue-900 text-center mb-2">
          Attendance for <span className="text-blue-600">{child.name}</span>
        </h2>

        <div className="bg-blue-100 p-4 rounded-xl border border-blue-200 mb-4 text-center">
          <p className="text-lg font-medium">{child.progress.msg}</p>
          <p className="text-3xl font-extrabold text-blue-700 mt-1">
            {child.progress.percentage}%
          </p>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-xl ring-1 ring-gray-200 p-4">
          <Table
            columns={[
              { header: "Date", accessor: "date" },
              { header: "Attendance", accessor: "status" },
            ]}
            data={child.attendance}
          />
        </div>
      </div>
    ))
  )}
</div>
  );
}

export default ViewStudentAttendance;
