import { useForm } from "react-hook-form";
import Button from "./Button";
import SubjectsDropDown from "./SubjectsDropDown";
import TeachersDropDown from "./TeachersDropDown";

const periodTime = [
  "09:00 - 09:45",
  "09:45 - 10:30",
  "10:30 - 11:15",
  "11:15 - 11:45",
  "11:45 - 12:30",
  "12:30 - 01:15",
  "01:15 - 02:00",
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TimetableEditModal = ({ setIsModalOpen, schedule, onSave }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { schedule },
  });

  const onSubmit = (data) => {
    onSave(data.schedule);
  };

  const isBreakPeriod = (index) => index === 3;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl w-full overflow-x-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Timetable
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-blue-100">
                <tr>
                  <th className="border p-2">Time</th>
                  {days.map((day) => (
                    <th key={day} className="border p-2 text-center">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periodTime.map((time, periodIndex) => (
                  <tr key={time}>
                    <td className="border p-2 bg-gray-50 font-medium">
                      {time}
                    </td>
                    {days.map((day) => {
                      const baseName = `schedule.${day}.${periodIndex}`;
                      const breakPeriod = isBreakPeriod(periodIndex);
                      const current = schedule[day][periodIndex];

                      return (
                        <td key={day} className="border p-2 min-w-[180px]">
                          {breakPeriod ? (
                            <div className="text-center text-sm font-semibold text-gray-600 bg-yellow-100 py-2 rounded">
                              Break
                            </div>
                          ) : (
                            <>
                              <SubjectsDropDown
                                register={register}
                                index={`${baseName}.subject`}
                                defaultValue={current.subject}
                              />
                              <div className="mt-2" />
                              <TeachersDropDown
                                register={register}
                                index={`${baseName}.teacher`}
                                defaultValue={current.teacher}
                              />
                            </>
                          )}
                          <input
                            type="checkbox"
                            className="hidden"
                            {...register(`${baseName}.isBreak`)}
                            defaultChecked={breakPeriod}
                            disabled
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-400 hover:bg-gray-500"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimetableEditModal;
