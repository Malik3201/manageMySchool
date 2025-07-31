import { useEffect, useState } from "react";

function ClassAttendance(){
const [teachers,setTeachers] = useState([])
const [classes,setClasses] = useState([])

    useEffect(() => {
        fetch("/data/teachers.json")
          .then(res => res.json())
          .then(data => setTeachers(data));
      }, []);

      useEffect(() => {
        fetch("/data/classes.json")
          .then(res => res.json())
          .then(data => setClasses(data));
      }, []);

      console.log(classes);
      
    const teacherId = JSON.parse(localStorage.getItem("userId"));
    const teacher = teachers.find(e => e.id === teacherId);
  console.log(teacher);

 const filterClasses = classes.filter(e=>teacher.assignedClasses.some(s=>e.className===s))
  console.log(filterClasses);
  
return(<>

</>)
}export default ClassAttendance;