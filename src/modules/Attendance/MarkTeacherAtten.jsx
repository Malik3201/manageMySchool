import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../../components/Table";

function MarkTeacherAttendance() {
  const [teachers, setTeachers] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendanceData, setAttendanceData] = useState({});

  const {
    handleSubmit,
  } = useForm();

  useEffect(() => {
    fetch("/data/teachers.json")
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  }, []);

  useEffect(() => {
    const initialAttendance = {};
    teachers.forEach((e) => {
      initialAttendance[e.id] = "Present";
    });
    setAttendanceData(initialAttendance);
  }, [teachers]); 

  function handleStatusChange(id, status) {
    setAttendanceData(prev => ({ ...prev, [id]: status }));
  }

  function onSubmit() {
    if (!attendanceDate) {
      alert("Please select a date.");
      return;
    }

    const record = {
      date: attendanceDate,
      records: teachers.map(e => ({
        teacherId: e.id,
        status: attendanceData[e.id] || 'Present'
      }))
    };

    console.log('Attendance to save:', record);
    alert('Attendance marked (mock). Check console log.');
  }

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    {
      header: 'Status',
      render: (tr) => (
        <div className="flex gap-2">
          {['Present', 'Absent', 'Leave'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => handleStatusChange(tr.id, status)}
              className={`px-2 py-1 text-sm rounded border transition-all duration-150
                ${attendanceData[tr.id] === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            >
              {status}
            </button>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mark Teacher Attendance</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="date"
            value={attendanceDate}
            onChange={e => setAttendanceDate(e.target.value)}
            className="p-2 border rounded w-full"
          />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </div>
      </form>

      {teachers.length > 0 && (
        <Table columns={columns} data={teachers} />
      )}
    </div>
  );
}

export default MarkTeacherAttendance;
