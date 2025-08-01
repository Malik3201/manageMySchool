import axios from "axios";
import { useEffect, useState } from "react";
import TimetableTable from "../components/TimetableTable";

const ParentTimetable = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId") || "null");

  const [childrenData, setChildrenData] = useState([]);
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
        setChildrenData(children);

        const timetableRes = await axios.get("/data/timetable.json");
        const allTimetables = timetableRes.data;

        const filteredTimetables = children.map((child) => {
          const childTimetable = allTimetables.find(
            (t) => t.class === child.class && t.section === child.section
          );
          return {
            ...child,
            timetable: childTimetable ? childTimetable.schedule : {},
          };
        });

        setChildrenTimetables(filteredTimetables);
        console.log("Children Timetables with names:", filteredTimetables);
      } catch (error) {
        console.error("Error fetching timetables:", error);
      }
    };

    fetchTimetables();
  }, [currentUserId]);

  return (
    <>
      {childrenTimetables.map((child, index) => (
        <div key={index} className="mb-8">
          <TimetableTable
            student={{
              name: child.name,
              class: child.class,
              section: child.section,
            }}
            timetable={child.timetable}
          />
        </div>
      ))}
    </>
  );
};

export default ParentTimetable;
