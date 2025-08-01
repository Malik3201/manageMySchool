import { useEffect, useState } from "react";
import axios from "axios";
import TimetableTable from "../components/TimetableTable";

const StudentTimetable = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const [student, setStudent] = useState(null);
  const [timetable, setTimetable] = useState(null);
  useEffect(() => {
    const fetchStudent = async () => {
      const res = await axios.get("/data/students.json");
      const currentStudent = res.data.find((stu) => stu.id === currentUserId);
      setStudent(currentStudent);
    };
    fetchStudent();
  }, []);

  useEffect(() => {
    const fetchTimetable = async () => {
      const res = await axios.get("/data/timetable.json");
      if (student) {
        const classTimetable = res.data.find(
          (tbl) =>
            tbl.class === student.class && tbl.section === student.section
        );
        setTimetable(classTimetable?.schedule || null);
      }
    };
    fetchTimetable();
  }, [student]);

  if (!student || !timetable) {
    return (
      <h1 className="text-center text-gray-500 mt-8">Loading Timetable...</h1>
    );
  }

  return (
    <TimetableTable student={student} timetable={timetable} />
  );
};

export default StudentTimetable;
