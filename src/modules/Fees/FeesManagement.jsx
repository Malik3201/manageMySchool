import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ClassesDropdown from '../../components/ClassesDropdown';
import SectionsDropdown from '../../components/SectionsDropdown';
import Table from '../../components/Table';

const FeesManagement = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [feesMonth , setFeesMonth] = useState("")
   const [feesData, setfeesData] = useState({});

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

    const initialFeesStatus = {};
    filtered.forEach(stu => {
      initialFeesStatus[stu.id] = 'Unpaid';
    });
    setfeesData(initialFeesStatus);
  }, [selectedClass, selectedSection, students]);

  const handleStatusChange = (id, status) => {
    setfeesData(prev => ({ ...prev, [id]: status }));
  };

  const onSubmit = () => {
    if (!feesData || !selectedClass || !selectedSection) {
      alert('Please select class, section, and month.');
      return;
    }

    const record = {
      month: feesMonth,
      class: selectedClass,
      section: selectedSection,
      records: filteredStudents.map(stu => ({
        studentId: stu.id,
        status: feesData[stu.id] || 'Unpaid'
      }))
    };
    console.log('Fees Data to save:', record);
    alert('fees data updated');
  };

  const columns = [
    { header: 'Roll No', accessor: 'rollNumber' },
    { header: 'Name', accessor: 'name' },
    {
      header: 'Status',
      render: (stu) => (
        <div className="flex gap-2">
          {['Unpaid', 'Paid'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => handleStatusChange(stu.id, status)}
              className={`px-2 py-1 text-sm rounded border transition-all duration-150
                ${feesData[stu.id] === status
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
      <h2 className="text-xl font-bold mb-4">Fees Management</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <ClassesDropdown register={register} errors={errors} />

          <SectionsDropdown register={register} errors={errors} />

          <input
            type="month"
            value={feesMonth}
            onChange={e => setFeesMonth(e.target.value)}
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
export default FeesManagement;
