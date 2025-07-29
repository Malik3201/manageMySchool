import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';

const DailyReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [reportRows, setReportRows] = useState([]);

  useEffect(() => {
    fetch('/data/attendance.json')
      .then(res => res.json())
      .then(data => setAttendanceData(data));
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    let filtered = attendanceData.filter(item => item.date === selectedDate);

    if (selectedClass) {
      filtered = filtered.filter(item => item.class === selectedClass);
    }
    if (selectedSection) {
      filtered = filtered.filter(item => item.section === selectedSection);
    }

    const rows = filtered.flatMap(item =>
      item.records.map(rec => ({
        class: item.class,
        section: item.section,
        studentId: rec.studentId,
        status: rec.status
      }))
    );
    setReportRows(rows);
  }, [selectedDate, selectedClass, selectedSection, attendanceData]);

  const columns = [
    { header: 'Class', accessor: 'class' },
    { header: 'Section', accessor: 'section' },
    { header: 'Student ID', accessor: 'studentId' },
    { header: 'Status', accessor: 'status' }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Daily Attendance Report</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="p-2 border rounded"
        />

        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Classes</option>
          {[...new Set(attendanceData.map(item => item.class))].map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <select
          value={selectedSection}
          onChange={e => setSelectedSection(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Sections</option>
          {[...new Set(attendanceData.map(item => item.section))].map(sec => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      </div>

      <Table columns={columns} data={reportRows} />
    </div>
  );
};

export default DailyReport;
