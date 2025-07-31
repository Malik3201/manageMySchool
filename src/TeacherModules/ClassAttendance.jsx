import { useEffect, useState } from "react";
import Table from "../components/Table";

function ClassAttendance() {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendanceData, setAttendanceData] = useState({});
  const [students , setStudents] = useState([])
  const [filteredStudents , setFilterStudents] = useState([])
  

  useEffect(() => {
    fetch("/data/teachers.json")
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  }, []);

  useEffect(() => {
    fetch("/data/classes.json")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  useEffect(() => {
      fetch('/data/students.json')
        .then(res => res.json())
        .then(data => setStudents(data));
    }, []);
  console.log(classes);

  const teacherId = JSON.parse(localStorage.getItem("userId"));
  const teacher = teachers.find((e) => e.id === teacherId);
  console.log("TeacherObj :", teacher);
  const filterClasses = classes.flatMap((cls) =>
    cls.sections
      .filter((sec) =>
        teacher.assignedClasses.includes(`${cls.className} - ${sec.section}`)
      )
      .map((sec) => ({
        className: cls.className,
        section: sec.section,
      }))
  );

  console.log("filtered Classes : ", filterClasses);

  


  
  

  useEffect(()=>{
    const cls = classes.find((cls) => selectedClass.startsWith(cls.className));

  const findStudents = cls
    ? cls.sections.find(
        (sec) => `${cls.className} - ${sec.section}` === selectedClass
      )?.students || []
    : [];

    const filterStudents = students.filter(e=>findStudents.some(s=>e.id===s))
  console.log("Filtered Students array by ID",filterStudents);
  setFilterStudents(filterStudents)

const initialAttendance = {};
    findStudents.forEach(stu => {
      initialAttendance[stu.id] = 'Present';
    });
    setAttendanceData(initialAttendance);
  },[selectedClass],[attendanceData])

  const handleStatusChange = (id, status) => {
    setAttendanceData(prev => ({ ...prev, [id]: status }));
  };

  const onSubmit = () => {
    if (!attendanceDate || !selectedClass) {
      alert('Please select class,  and date.');
      return;
    }

    const record = {
      date: attendanceDate,
      class: selectedClass,
      records: filteredStudents.map(stu => ({
        studentId: stu.id,
        status: attendanceData[stu.id] || 'Present'
      }))
    };
    console.log('Attendance to save:', record);
    alert('Attendance marked (mock). Check console log.');

    setAttendanceDate("")
    setSelectedClass("")
  };

  const columns = [
    { header: 'Roll No', accessor: 'rollNumber' },
    { header: 'Name', accessor: 'name' },
    {
      header: 'Status',
      render: (stu) => (
        <div className="flex gap-2">
          {['Present', 'Absent', 'Leave'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => handleStatusChange(stu.id, status)}
              className={`px-2 py-1 text-sm rounded border transition-all duration-150
                ${attendanceData[stu.id] === status
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
    <>
     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl space-y-6">
  <h1 className="text-2xl font-bold text-gray-800">
    Teacher <span className="text-blue-600">{teacher?.name}</span>, please mark attendance of your assigned classes
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">Select Class - Section</label>
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <label className="block mb-1 text-sm font-medium text-gray-700">Attendance Date</label>
      <input
        type="date"
        value={attendanceDate}
        onChange={(e) => setAttendanceDate(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

   
    <div className="flex items-end">
      <button
        onClick={onSubmit}
        type="button"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        Submit Attendance
      </button>
    </div>
  </div>

  
  {filteredStudents.length > 0 && (
    <div className="pt-6">
      <Table columns={columns} data={filteredStudents} />
    </div>
  )}
</div>

    </>
    
  );
}
export default ClassAttendance;
