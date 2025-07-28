import axios from "axios";
import { useEffect, useState } from "react";
const ClassesDropdown = ({ register, errors }) => {
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classes = await axios.get("/data/classes.json");
        setClassList(classes.data);
      } catch (error) {
        return error.response.data;
      }
    };
    fetchClasses();
  }, []);

  return (
    <>
      <select
        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.name ? "border-red-500" : "border-gray-300"
        }`}
        {...register("class", { required: "Class is required" })}
      >
        <option value="">
          Select Class
        </option>
        {classList.map((cls, indx) => {
          return (
            <option key={indx} value={cls.className}>
              {cls.className}
            </option>
          );
        })}
      </select>
      {errors.class && (
        <p className="text-sm text-red-500">{errors.class.message}</p>
      )}
    </>
  );
};
export default ClassesDropdown;
