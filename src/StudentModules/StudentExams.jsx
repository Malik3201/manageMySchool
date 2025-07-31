import { useEffect, useState } from "react";
import Table from "../components/Table";

function StudentExams() {
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
//   const [users, setUsers] = useState([]);

  const [student, setStudent] = useState(null);
  const [filteredExams, setFilteredExams] = useState([]);

  const studentID = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    fetch("/data/users.json")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  useEffect(() => {
    fetch("/data/examsData.json")
      .then(res => res.json())
      .then(data => setExams(data));
  }, []);

  useEffect(() => {
    if (students.length && exams.length) {
      const foundStudent = students.find(e => e.id === studentID);
      setStudent(foundStudent);

      if (foundStudent) {
        const filterExam = exams.filter(
          e => e.class === foundStudent.class && e.section === foundStudent.section
        );
        console.log(filterExam);
        
        setFilteredExams(filterExam);
      }
    }
  }, [students, exams, studentID]);

  if (!student) return <p>Loading student info...</p>;

  const examColumns = [
    { header: "Class", accessor: "class" },
    { header: "Section", accessor: "section" },
    { header: "Subject", accessor: "subject" },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "time" }
  ];

  return (
    <>
      <div className="max-w-5xl mx-auto mt-10 px-4">
  <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-2xl shadow-md border border-blue-200 mb-6">
    <h1 className="text-2xl sm:text-3xl font-semibold text-blue-800">
      Dear <span className="text-blue-600">{student.name}</span>, your exams are scheduled 
    </h1>
    <p className="text-sm text-blue-700 mt-2">Please find the exam details below.</p>
  </div>

  <div className="bg-white shadow-lg rounded-2xl overflow-hidden ring-1 ring-gray-200">
    <div className="overflow-x-auto">
      <Table columns={examColumns} data={filteredExams} />
    </div>
  </div>
</div>

    </>
  );
}

export default StudentExams;
