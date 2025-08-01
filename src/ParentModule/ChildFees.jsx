import { useEffect, useState } from "react";
function ChildFees() {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [parent, setParent] = useState({});
  const [filteredStudent , setFilteredStudent] = useState([])
  const parentID = JSON.parse(localStorage.getItem("userId"));

  console.log(parentID);
  
  useEffect(() => {
    fetch("/data/users.json")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

   useEffect(() => {
    fetch("/data/students.json")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  useEffect(() => {
  if (users.length && students.length) {
    const foundParent = users.find(e => e.id === parentID);
    setParent(foundParent);
    console.log("Found parent:", foundParent);

    if (foundParent) {
    const filterStudent = students.filter(e => foundParent.childrenID.includes(e.id));

      setFilteredStudent(filterStudent);
      console.log("Filtered student:", filterStudent);
    }
  }
}, [users, students, parentID]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-3xl shadow-lg border border-blue-200 space-y-6">
  <h1 className="text-3xl font-semibold text-blue-800">
     Welcome, <span className="text-blue-600">{parent.name}</span>
  </h1>

{
  filteredStudent.map(e=>{
   return <div className="bg-white p-5 rounded-2xl shadow border border-gray-200">
    <h2 className="text-xl font-medium text-gray-700 mb-2">
       Your Child: <span className="font-semibold text-gray-900">{e.name}</span>
    </h2>

    <p className="text-base text-gray-600 mb-2">
      This month's fee status:
      <span className={`ml-2 px-3 py-1 rounded-full text-white text-sm font-medium
        ${e.feesStatus === "UnPaid" ? "bg-red-500" : "bg-green-500"}`}>
        {(e.feesStatus === "UnPaid")?"Unpaid":"Paid"}  
      </span>
    </p>

    {e.feesStatus === "UnPaid" ? (
      <p className="text-red-600 font-medium mt-2">
        ⚠️ Please pay this month’s fee on time to avoid late charges.
      </p>
    ) : (
      <p className="text-green-600 font-medium mt-2">
        ✅ Thank you for paying the fees on time!
      </p>
    )}
  </div>
  })
}
  
</div>

  );


}export default ChildFees