import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../redux/classSlice";
import { useEffect } from "react";
import ClassCard from "./ClassCard";

function ClassManagement() {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classReducer);
  useEffect(() => {
    dispatch(getClasses());
  }, []);
  
  console.log(classes);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
  <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-10 tracking-wide">
    Class Management
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {classes.map((e, index) => (
      <ClassCard key={index} classObj={e} />
    ))}
  </div>
</div>

    </>
  );
}
export default ClassManagement;
