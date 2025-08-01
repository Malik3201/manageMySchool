import axios from "axios";
import { useEffect, useState } from "react";
import ReportCard from "../components/ReportCard";

const ParentReport = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const [currentParent, setCurrentParent] = useState(null);
  const [childrenIds, setChidrenIds] = useState([]);
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/data/users.json");
      setCurrentParent(res.data.find((prn) => prn.id === currentUserId));
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentParent) {
      setChidrenIds(currentParent.childrenID);
    }
  }, [currentParent]);

  useEffect(() => {
    if (childrenIds) {
      const fetchReports = async () => {
        const res = await axios.get("/data/reports.json");
        const filteredReports = res.data.filter((rep) =>
          childrenIds.includes(rep.studentId)
        );
        setReports(filteredReports);
      };
      fetchReports();
    }
  }, [childrenIds]);

  return (
    <>
      <ReportCard report={reports} />
    </>
  );
};
export default ParentReport;
