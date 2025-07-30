import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import StudentModal from "./StudentModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../redux/studentsSlice";
import ConfirmModal from "./ConfirmModal";
import DetailModal from "./DetailModal";
import ClassesDropdown from "../../components/ClassesDropdown";
import SectionsDropdown from "../../components/SectionsDropdown";
import { useForm } from "react-hook-form";

const StudentsList = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTask, setModalTask] = useState(null);
  const [studentId, setStudentId] = useState(null);

  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.studentsSlice);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    setStudentsList(students);
  }, [students]);

  const filterStudents = (e) => {
    const value = e.target.value;
    setUserSearch(value);

    const filteredStudent = students.filter((stu) =>
      stu.name.toLowerCase().includes(value.toLowerCase()) 
    );
    setStudentsList(filteredStudent);
  };
  

  const closeModal = () => setIsModalOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const filteredStudent = students.filter((stu) =>
      stu.class ===  data.class && stu.section === data.section
    );
    setStudentsList(filteredStudent);
  };

  const columns = [
    { header: "Roll No", accessor: "rollNumber" },
    { header: "Name", accessor: "name" },
    { header: "Class", accessor: "class" },
    { header: "Section", accessor: "section" },
  ];

  const actions = (row) => (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        onClick={() => {
          setIsModalOpen(true);
          setModalTask("edit");
          setStudentId(row.id);
        }}
      >
        Edit
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          setConfirmModalOpen(true);
          setStudentId(row.id);
        }}
      >
        Delete
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          setDetailModalOpen(true);
          setStudentId(row.id);
        }}
      >
        View Detail
      </Button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Student Management
        </h2>
        <input
          type="text"
          value={userSearch}
          onChange={filterStudents}
          placeholder="Search by name..."
          className="border px-3 py-2 rounded"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ClassesDropdown register={register} errors={errors} />
            <SectionsDropdown register={register} errors={errors} />
          </div>
          <input
            type="submit"
            value="Apply Filter"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
          />
        </form>
        <Button
          variant="primary"
          onClick={() => {
            setIsModalOpen(true);
            setModalTask("add");
            setStudentId(null);
          }}
        >
          + Add Student
        </Button>
      </div>

      {studentsList.length > 0 ? (
        <Table columns={columns} data={studentsList} actions={actions} />
      ) : (
        <p className="text-gray-500">No students found.</p>
      )}

      {isModalOpen && (
        <StudentModal
          modalTask={modalTask}
          studentId={studentId}
          closeModal={closeModal}
        />
      )}
      {confirmModalOpen && (
        <ConfirmModal
          setConfirmModalOpen={setConfirmModalOpen}
          studentId={studentId}
        />
      )}
      {detailModalOpen && (
        <DetailModal
          studentId={studentId}
          setDetailModalOpen={setDetailModalOpen}
        />
      )}
    </div>
  );
};

export default StudentsList;
