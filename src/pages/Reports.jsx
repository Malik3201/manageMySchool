import { useEffect, useState } from "react";
import ReportCard from "../components/ReportCard";
import axios from "axios";
import Button from "../components/Button";

const Reports = () => {
  const [rollNo, setRollNo] = useState("");
  const [report, setReport] = useState(null);
  const [search, setSearch] = useState("");

  const handleInput = (e) => {
    setRollNo(e.target.value);
  };

  const handleSearch = () => {
    setSearch(rollNo.trim());
  };

  useEffect(() => {
    if (!search) return;
    const fetchReports = async () => {
      const res = await axios.get("/data/reports.json");
      const filtered = res.data.filter((rep) => rep.rollNumber === search);
      setReport(filtered.length > 0 ? filtered : []);
    };
    fetchReports();
  }, [search]);
  console.log(report);
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10 px-4">
      {/* Search Card */}
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Student Report Search
        </h2>

        <div className="flex gap-2">
          <input
            placeholder="Enter Roll No e.g. 6-A-01"
            type="text"
            value={rollNo}
            onChange={handleInput}
            className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>

      {/* Report Section */}
      <div className="mt-8 w-full max-w-2xl">
        {report && report.length > 0 ? (
          <ReportCard report={report} />
        ) : report?.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">
            No report found for "{search}"
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Reports;
