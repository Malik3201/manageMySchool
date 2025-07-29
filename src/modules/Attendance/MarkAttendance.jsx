import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ClassesDropdown from '../../components/ClassesDropdown';
import SectionsDropdown from '../../components/SectionsDropdown';
import Table from '../../components/Table';

const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendanceData, setAttendanceData] = useState({});

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const selectedClass = watch("class");
  const selectedSection = watch("section");

  useEffect(() => {
    fetch('/data/students.json')
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      stu => stu.class === selectedClass && stu.section === selectedSection
    );
    setFilteredStudents(filtered);

    const initialAttendance = {};
    filtered.forEach(stu => {
      initialAttendance[stu.id] = 'Present';
    });
    setAttendanceData(initialAttendance);
  }, [selectedClass, selectedSection, students]);

  const handleStatusChange = (id, status) => {
    setAttendanceData(prev => ({ ...prev, [id]: status }));
  };

  const onSubmit = () => {
    if (!attendanceDate || !selectedClass || !selectedSection) {
      alert('Please select class, section, and date.');
      return;
    }

    const record = {
      date: attendanceDate,
      class: selectedClass,
      section: selectedSection,
      records: filteredStudents.map(stu => ({
        studentId: stu.id,
        status: attendanceData[stu.id] || 'Present'
      }))
    };
    console.log('Attendance to save:', record);
    alert('Attendance marked (mock). Check console log.');
  };

  const columns = [
    { header: 'Roll No', accessor: 'rollNumber' },
    { header: 'Name', accessor: 'name' },
    {
      header: 'Status',
      render: (stu) => (
        <div className="flex gap-2">
          {['Present', 'Absent', 'Leave'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => handleStatusChange(stu.id, status)}
              className={`px-2 py-1 text-sm rounded border transition-all duration-150
                ${attendanceData[stu.id] === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            >
              {status}
            </button>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <ClassesDropdown register={register} errors={errors} />

          <SectionsDropdown register={register} errors={errors} />

          <input
            type="date"
            value={attendanceDate}
            onChange={e => setAttendanceDate(e.target.value)}
            className="p-2 border rounded w-full"
          />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </div>
      </form>

      {filteredStudents.length > 0 && (
        <Table columns={columns} data={filteredStudents} />
      )}
    </div>
  );
};

export default MarkAttendance;
