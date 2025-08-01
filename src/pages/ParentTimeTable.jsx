import axios from "axios";
import { useEffect, useState } from "react";
import TimetableTable from "../components/TimetableTable";

const ParentTimetable = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId") || "null");

  const [childrenTimetables, setChildrenTimetables] = useState([]);

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const parentRes = await axios.get("/data/users.json");
        const currentParent = parentRes.data.find(
          (p) => p.id === currentUserId
        );
        if (!currentParent) return;

        const studentRes = await axios.get("/data/students.json");
        const children = studentRes.data.filter((student) =>
          currentParent.childrenID.includes(student.id)
        );

        const classSections = children.map((c) => `${c.class}-${c.section}`);

        const timetableRes = await axios.get("/data/timetable.json");
        const allTimetables = timetableRes.data;

        const filteredTimetables = allTimetables.filter((t) =>
          classSections.includes(`${t.class}-${t.section}`)
        );

        setChildrenTimetables(filteredTimetables);
        console.log("Children Timetables:", filteredTimetables);
      } catch (error) {
        console.error("Error fetching timetables:", error);
      }
    };

    fetchTimetables();
  }, [currentUserId]);

  return (
    <>
      {childrenTimetables.map((timetable, index) => {

        const student = {
          class: timetable.class,
          section: timetable.section,
        };

        return (
          <div
            key={index}
            className="mb-8"
          >
            <TimetableTable
              student={student}
              timetable={timetable.schedule}
            />
          </div>
        );
      })}
    </>
  );
};

export default ParentTimetable;
