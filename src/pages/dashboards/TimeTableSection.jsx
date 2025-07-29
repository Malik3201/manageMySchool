import axios from "axios";
import Timetable from "../../components/Timetable";
import { useEffect, useState } from "react";
import ClassesDropdown from "../../components/ClassesDropdown";
import SectionsDropdown from "../../components/SectionsDropdown";
import { useForm } from "react-hook-form";

const TimeTableSection = () => {
  const [timeTbl, setTimeTbl] = useState(null); //ismy sirf wo aik class ka timetable filter ho kar ay ga jo user ny search kiya hai
  const [classSchedule, setClassSchedule] = useState({}); // jo user ki taraf sy data aa rha k kis class or section ka schedule dekhna hai

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        const res = await axios.get("/data/timetable.json");
        const currentTimeTable = res.data.find(
          (schdl) =>
            schdl.class === classSchedule.class &&
            schdl.section === classSchedule.section
        );
        setTimeTbl(currentTimeTable);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    if (classSchedule.class && classSchedule.section) {
      setTimeTbl(null);
      fetchTimeTable();
    }
  }, [classSchedule]);

  const onSubmit = (data) => {
    setClassSchedule(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-700">
          Select Class & Section
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ClassesDropdown register={register} errors={errors} />
          <SectionsDropdown register={register} errors={errors} />
        </div>
        <input
          type="submit"
          value="View Timetable"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
        />
      </form>

      {!timeTbl ? (
        <p className="text-center mt-10 text-red-500 font-semibold">
          No timetable found for selected class and section.
        </p>
      ) : (
        <Timetable
          classLabel={timeTbl.class}
          section={timeTbl.section}
          schedule={timeTbl.schedule}
        />
      )}
    </div>
  );
};

export default TimeTableSection;
