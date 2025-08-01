import { useState, useEffect } from "react";
import PasswordModal from "./PasswordModal";

const ProfileCard = ({ role, data }) => {
  if (!data) return null;

  const [showPassword, setShowPassword] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [currentPass, setCurrentPass] = useState(data.password);
  useEffect(() => {
    if (data?.password) {
      setCurrentPass(data.password);
    }
  }, [data.password]);
  const changePassHandler = (updatedPass) => {
    setCurrentPass(updatedPass);
  };

  const renderPass = () => {
    return (
      <>
        <div className="flex  items-center gap-1">
          <strong>Password: </strong>
          <p>{showPassword ? currentPass : "******"}</p>
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button onClick={() => setIsPassModalOpen(true)}>
          Change Password
        </button>
      </>
    );
  };
  const renderProfileDetails = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            {renderPass()}
            <p>
              <strong>Phone:</strong> {data.phone}
            </p>
            <p>
              <strong>Address:</strong> {data.address}
            </p>
          </>
        );

      case "teacher":
        return (
          <>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            {renderPass()}
            <p>
              <strong>Phone:</strong> {data.phone}
            </p>
            <p>
              <strong>Address:</strong> {data.address}
            </p>
            <p>
              <strong>Subjects:</strong> {data?.subjects?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Assigned Classes:</strong>{" "}
              {data?.assignedClasses?.join(", ") || "N/A"}
            </p>
          </>
        );

      case "student":
        return (
          <>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            {renderPass()}
            <p>
              <strong>Roll No:</strong> {data.rollNumber}
            </p>
            <p>
              <strong>Class:</strong> {data.class} ({data.section})
            </p>
            <p>
              <strong>Gender:</strong> {data.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong> {data.dob}
            </p>
            <p>
              <strong>Guardian:</strong> {data.guardian}
            </p>
            <p>
              <strong>Contact:</strong> {data.contact}
            </p>
            <p>
              <strong>Address:</strong> {data.address}
            </p>
          </>
        );

      case "parent":
        return (
          <>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            {renderPass()}
            <p>
              <strong>Phone:</strong> {data.phone}
            </p>
            <p>
              <strong>Children Ids:</strong> {data.childrenID.join(", ")}
            </p>
          </>
        );

      default:
        return <p>No data available for this role.</p>;
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md w-full max-w-lg mx-auto p-6 space-y-5 border">
        <div className="flex flex-col items-center space-y-3">
          <img
            src={data.profileImage}
            alt={data.name}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>
          <span className="text-sm text-gray-500 capitalize">{data.role}</span>
        </div>

        <div className="space-y-2 text-gray-700">{renderProfileDetails()}</div>
      </div>
      {isPassModalOpen ? (
        <PasswordModal
          setIsPassModalOpen={setIsPassModalOpen}
          changePassHandler={changePassHandler}
        />
      ) : null}
    </>
  );
};

export default ProfileCard;
