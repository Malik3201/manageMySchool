import axios from "axios";
import { useEffect, useState } from "react";

const TeachersDropDown = ({ register, index, defaultValue }) => {
  const [teachersList, setTeachersList] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachers = await axios.get("/data/teachers.json");
        setTeachersList(teachers.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <>
      <select
        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
        {...register(index)}
        defaultValue={defaultValue || ""}
      >
        <option value="">Select Teacher</option>
        {teachersList.map((tchr, indx) => (
          <option key={indx} value={tchr.name}>
            {tchr.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default TeachersDropDown;
