import { useEffect, useState } from "react";
import Table from "../components/Table";

function TeacherExam() {
  const [exams, setExams] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("/data/examsData.json")
      .then(res => res.json())
      .then(data => setExams(data));
  }, []);

  useEffect(() => {
    fetch("/data/teachers.json")
      .then(res => res.json())
      .then(data => setTeachers(data));
  }, []);

  const teacherId = JSON.parse(localStorage.getItem("userId"));
  const teacher = teachers.find(e => e.id === teacherId);
  console.log(teacher);
  

  if (!teacher) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg font-medium">
        Loading teacher information...
      </div>
    );
  }

  const findExams = exams.filter(e =>
    teacher.assignedClasses.some(c => `${e.class} - ${e.section}` === c)
  );
  console.log(findExams);
  

  const findSubjectExam = findExams.filter(e =>
    teacher.subjects.some(s => e.subject === s)
  );
  console.log(findSubjectExam);
  

  const examColumns = [
    { header: "Class", accessor: "class" },
    { header: "Section", accessor: "section" },
    { header: "Subject", accessor: "subject" },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "time" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-white rounded-3xl shadow-md border border-gray-200 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Teacher <span className="text-blue-600">{teacher.name}</span>'s Classes Exams Schedule
      </h1>

      <div className="overflow-x-auto rounded-xl">
        <Table columns={examColumns} data={findSubjectExam} />
      </div>
    </div>
  );
}

export default TeacherExam;
