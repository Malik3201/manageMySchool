import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import Table from "../components/Table";
import UpdateMarksModal from "../components/UpdateMarksModal";

const CreateReport = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await axios.get("/data/teachers.json");
      setTeacher(res.data.find((tch) => tch.id == currentUserId));
    };
    fetchTeachers();
  }, [currentUserId]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get("/data/students.json");
      setStudents(res.data);
    };
    fetchStudents();
  }, [currentUserId]);

  useEffect(() => {
    if (!teacher) return;
    setSubjects(teacher.subjects);
    setClasses(teacher.assignedClasses);
  }, [teacher]);

  const onSubmit = (data) => {
    const selectedClassSection = data.class;
    const [cls, section] = selectedClassSection.split(" - ");

    setFilteredStudents(
      students.filter((stu) => stu.class === cls && stu.section === section)
    );
  };

  const columns = [
    { header: "Roll No", accessor: "rollNumber" },
    { header: "Name", accessor: "name" },
    { header: "Marks", accessor: "marks" },
  ];

  const actions = (row) => (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        onClick={() => {
          setSelectedStudent(row);
          setIsModalOpen(true);
        }}
      >
        Update Marks
      </Button>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Create Report</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-6 space-y-4"
      >
        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              {...register("subject", { required: "required" })}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub, indx) => (
                <option key={indx} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
            {errors.subject && (
              <p className="text-sm text-red-500 mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class
            </label>
            <select
              {...register("class", { required: "required" })}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            >
              <option value="">Select Class</option>
              {classes.map((cls, indx) => (
                <option key={indx} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
            {errors.class && (
              <p className="text-sm text-red-500 mt-1">
                {errors.class.message}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="mt-4">
          Get Students
        </Button>
      </form>

      {/* Table */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <Table columns={columns} actions={actions} data={filteredStudents} />
      </div>

      <UpdateMarksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
        onSave={(id, marks) => {
          setFilteredStudents((prev) =>
            prev.map((stu) => (stu.id === id ? { ...stu, marks: marks } : stu))
          );
        }}
      />
    </div>
  );
};

export default CreateReport;
