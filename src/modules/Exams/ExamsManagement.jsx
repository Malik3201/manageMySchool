import { useEffect, useState } from "react";
import ClassesDropdown from "../../components/ClassesDropdown";
import SectionsDropdown from "../../components/SectionsDropdown";
import SubjectsDropDown from "../../components/SubjectsDropDown";
import { useForm } from "react-hook-form";
import Table from "../../components/Table";

function ExamsManagement() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const [examData, setExamData] = useState([]); 

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const selectedClass = watch("class");

  
  useEffect(() => {
    fetch("/data/classes.json")
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("Error loading classes:", err));
  }, []);


  useEffect(() => {
    if (selectedClass && classes.length > 0) {
      const foundClass = classes.find((cls) => cls.className === selectedClass);
      const classSections = foundClass ? foundClass.sections.map(s => s.section) : [];
      setSections(classSections);
    }
  }, [selectedClass, classes]);

 
  const onSubmit = (data) => {
    const examRecord = {
      date: examDate,
      time: examTime,
      class: data.class,
      section: data.section,
      subject: data.subject
    };

    const previusData = JSON.parse(localStorage.getItem("examData")) || []
    const updatedData = [...previusData,examRecord]
    setExamData(updatedData);
    console.log("Exam Data to Save:", examRecord);

  };
  const handleDelete = (rowToDelete) => {
  setExamData(examData.filter((row) => row !== rowToDelete));
};


  const examColumns = [
  { header: "Class", accessor: "class" },
  { header: "Section", accessor: "section" },
  { header: "Subject", accessor: "subject" },
  { header: "Date", accessor: "date" },
  { header: "Time", accessor: "time" }
];

useEffect(()=>{

console.log(examData);
   
},[examData])


 

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">EXAMS MANAGEMENT MODULE</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <ClassesDropdown register={register} errors={errors} />
          <SectionsDropdown register={register} errors={errors} sections={sections} />
          <SubjectsDropDown register={register}  />

          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <input
            type="time"
            value={examTime}
            onChange={(e) => setExamTime(e.target.value)}
            className="p-2 border rounded w-full"
          />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </form>

    
      {examData.length > 0 && (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-4">Exam Schedule</h2>
    <Table 
      columns={examColumns}
      data={examData}
      actions={(row) => (
        <button
          onClick={() => handleDelete(row)}
          className="bg-red-500 text-white px-2 py-1 rounded text-xs"
        >
          Delete
        </button>
      )}
    />
  </div>
)}

    </>
  );
}

export default ExamsManagement;
