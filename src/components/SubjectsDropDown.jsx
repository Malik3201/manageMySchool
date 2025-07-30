const SubjectsDropDown = ({ register, name = "subject", defaultValue = "" }) => {
  const subjectsList = [
    "English",
    "Literature",
    "Mathematics",
    "Physics",
    "Biology",
    "Chemistry",
    "Computer Science",
    "Islamiat",
    "Pakistan Studies",
    "Science",
    "Urdu",
  ];

  return (
    <select
      className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
      {...register(name, { required: "Subject is required" })}
      defaultValue={defaultValue}
    >
      <option value="">Select Subject</option>
      {subjectsList.map((subj, idx) => (
        <option key={idx} value={subj}>
          {subj}
        </option>
      ))}
    </select>
  );
};

export default SubjectsDropDown;
