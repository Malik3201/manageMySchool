import axios from "axios";
import { useEffect, useState } from "react";
import ReportCard from "../components/ReportCard";

const StudentReport = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const [fetchReport, setFetchReport] = useState(null);
  const [report, setReport] = useState(null);
  useEffect(() => {
    const fetchReports = async () => {
      const res = await axios.get("/data/reports.json");
      setFetchReport(res.data.filter((rep) => rep.studentId === currentUserId));
    };
    fetchReports();
  }, []);

  useEffect(() => {
    if (fetchReport) {
      setReport(fetchReport);
    }
  }, [fetchReport]);
  return <ReportCard report={report} />;
};
export default StudentReport;
