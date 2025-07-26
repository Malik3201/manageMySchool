import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import StudentModal from "./StudentModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents } from "../../redux/studentsSlice";
import ConfirmModal from "./ConfirmModal";
import DetailModal from "./DetailModal";

const StudentsList = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const { students } = useSelector((state) => state.studentsSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTask, setModalTask] = useState(null);
  const [studentId, setStudentId] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
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

      {students.length > 0 ? (
        <Table columns={columns} data={students} actions={actions} />
      ) : (
        <p className="text-gray-500">No students found.</p>
      )}

      {isModalOpen ? (
        <StudentModal
          modalTask={modalTask}
          studentId={studentId}
          closeModal={closeModal}
        />
      ) : null}
      {confirmModalOpen ? (
        <ConfirmModal
          setConfirmModalOpen={setConfirmModalOpen}
          studentId={studentId}
        />
      ) : null}
      {detailModalOpen ? (
        <DetailModal
          studentId={studentId}
          setDetailModalOpen={setDetailModalOpen}
        />
      ) : null}
    </div>
  );
};

export default StudentsList;
