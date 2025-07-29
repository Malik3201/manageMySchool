import axios from "axios";
import { useEffect, useState } from "react";

const SectionsDropdown = ({ register, errors }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.get("/data/classes.json");

        const allSections = res.data.flatMap((cls) =>
          cls.sections.map((sec) => sec.section)
        );

        const uniqueSections = [...new Set(allSections)];

        setSections(uniqueSections);
      } catch (error) {
        console.error("Error loading sections:", error);
      }
    };

    fetchSections();
  }, []);

  return (
    <>
      <select
        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors?.section ? "border-red-500" : "border-gray-300"
        }`}
        {...register("section", { required: "Section is required" })}
      >
        <option value="">Select Section</option>
        {sections.map((sec, index) => (
          <option key={index} value={sec}>
            {sec}
          </option>
        ))}
      </select>
      {errors?.section && (
        <p className="text-sm text-red-500">{errors.section.message}</p>
      )}
    </>
  );
};

export default SectionsDropdown;
