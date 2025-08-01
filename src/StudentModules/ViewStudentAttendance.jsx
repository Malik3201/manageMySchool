
import { useEffect, useState } from "react"
import Table from "../components/Table"

export default function ViewStudentAttendance(){
    const [student,setStudent] = useState({})
    const [attendanceData, setAttendanceData] = useState({})
    const [progress , setProgress] = useState({})

    const studentId = JSON.parse(localStorage.getItem("userId"))
    console.log(studentId);
    
    useEffect(()=>{
        fetch("/data/users.json")
        .then(res=>res.json())
        .then(data=>{
        const studentObj = data.find(e=>e.id===studentId)
            setStudent(studentObj)
        })

    },[])

    useEffect(() => {
  fetch("/data/studentAttendanceData.json")
    .then(res => res.json())
    .then(data => {
      const getAttendance = data.find(e => e.studentId === studentId);
      setAttendanceData(getAttendance || {});
    })
    .catch(err => console.error("Failed to load attendance data:", err));
}, []);

    
    console.log(attendanceData);
     
    useEffect(()=>{
    if(attendanceData && attendanceData.attendance?.length >= 0){
      const arraylength = attendanceData.attendance.length

      const present = attendanceData.attendance.filter(e=> e.status==="present")

      const absent = attendanceData.attendance.filter(e=>e.status==="absent")

     if(present.length > absent.length && present.length>3){
        const show = {
            msg : "Very good Attendance Progress of this month",
            percntage : ((present.length/arraylength) * 100).toFixed(0)
        }
        setProgress(show)
     }
     else {
        const show = {
            msg : "Very bad Attendance Progress of this month",
            percntage : ((present.length/arraylength) * 100).toFixed(0)
        }
        setProgress(show)

     }
    console.log(arraylength);
    }
},[attendanceData])

console.log(progress);

    

    
    console.log(student);
    
    const examColumns = [
    { header: "Date", accessor: "date" },
    { header: "Attendance", accessor: "status" },
  ];
return(<>
<div className="max-w-4xl mx-auto mt-10 px-4">
  <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
  <span className="text-indigo-600">{student.name}</span>
  <span className="text-gray-800">'s Attendance of This Month</span>
</h1>


  {progress?.msg && (
    <div className="bg-gradient-to-r from-green-100 to-green-200 border border-green-300 rounded-xl p-4 mb-6 shadow-md text-center">
      <h2 className="text-lg font-semibold text-green-800">{progress.msg}</h2>
      <p className="text-3xl font-bold text-green-900 mt-1">
        {progress.percntage}%
      </p>
    </div>
  )}

  <div className="bg-white shadow-xl rounded-2xl ring-1 ring-gray-200">
    <div className="overflow-x-auto p-4">
      <Table columns={examColumns} data={attendanceData.attendance || []} />
    </div>
  </div>
</div>

</>)
}