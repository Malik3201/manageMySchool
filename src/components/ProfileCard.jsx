import { useState, useEffect } from "react";
import PasswordModal from "./PasswordModal";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaEdit,
  FaGraduationCap,
  FaCalendarAlt,
  FaUserFriends,
  FaBook,
  FaChalkboardTeacher,
  FaIdCard,
  FaVenusMars,
  FaBirthdayCake,
  FaUserShield
} from "react-icons/fa";

const ProfileCard = ({ role, data }) => {
  if (!data) return null;

  const [showPassword, setShowPassword] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [currentPass, setCurrentPass] = useState(data.password);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data?.password) {
      setCurrentPass(data.password);
    }
  }, [data.password]);

  const changePassHandler = (updatedPass) => {
    setCurrentPass(updatedPass);
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-gradient-to-r from-red-500 to-red-600',
      teacher: 'bg-gradient-to-r from-blue-500 to-blue-600',
      student: 'bg-gradient-to-r from-green-500 to-green-600',
      parent: 'bg-gradient-to-r from-purple-500 to-purple-600'
    };
    return colors[role] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  const getRoleIcon = (role) => {
    const icons = {
      admin: FaUserShield,
      teacher: FaChalkboardTeacher,
      student: FaGraduationCap,
      parent: FaUserFriends
    };
    const IconComponent = icons[role] || FaUser;
    return <IconComponent className="w-4 h-4 text-white" />;
  };

  const ProfileField = ({ icon: Icon, label, value, type = "text" }) => (
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-gray-900 mt-1 break-words">{value || 'N/A'}</p>
      </div>
    </div>
  );

  const PasswordField = () => (
    <div className="space-y-3">
      <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 mt-0.5">
          <FaKey className="w-4 h-4 text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Password</p>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-sm font-medium text-gray-900 font-mono">
              {showPassword ? currentPass : "••••••••"}
            </p>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {showPassword ? <FaEyeSlash className="w-3 h-3" /> : <FaEye className="w-3 h-3" />}
          </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsPassModalOpen(true)}
        className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <FaKey className="w-4 h-4" />
        <span>Change Password</span>
        </button>
    </div>
    );

  const renderProfileDetails = () => {
    const commonFields = [
      <ProfileField key="email" icon={FaEnvelope} label="Email Address" value={data.email} />,
      <div key="password" className="col-span-full">
        <PasswordField />
      </div>
    ];

    switch (role) {
      case "admin":
        return [
          ...commonFields,
          <ProfileField key="phone" icon={FaPhone} label="Phone Number" value={data.phone} />,
          <ProfileField key="address" icon={FaMapMarkerAlt} label="Address" value={data.address} />
        ];

      case "teacher":
        return [
          ...commonFields,
          <ProfileField key="phone" icon={FaPhone} label="Phone Number" value={data.phone} />,
          <ProfileField key="address" icon={FaMapMarkerAlt} label="Address" value={data.address} />,
          <ProfileField key="subjects" icon={FaBook} label="Subjects" value={data?.subjects?.join(", ")} />,
          <ProfileField key="classes" icon={FaGraduationCap} label="Assigned Classes" value={data?.assignedClasses?.join(", ")} />
        ];

      case "student":
        return [
          ...commonFields,
          <ProfileField key="rollNo" icon={FaIdCard} label="Roll Number" value={data.rollNumber} />,
          <ProfileField key="class" icon={FaGraduationCap} label="Class & Section" value={`${data.class} (${data.section})`} />,
          <ProfileField key="gender" icon={FaVenusMars} label="Gender" value={data.gender} />,
          <ProfileField key="dob" icon={FaBirthdayCake} label="Date of Birth" value={data.dob} />,
          <ProfileField key="guardian" icon={FaUserFriends} label="Guardian" value={data.guardian} />,
          <ProfileField key="contact" icon={FaPhone} label="Contact Number" value={data.contact} />,
          <ProfileField key="address" icon={FaMapMarkerAlt} label="Address" value={data.address} />
        ];

      case "parent":
        return [
          ...commonFields,
          <ProfileField key="phone" icon={FaPhone} label="Phone Number" value={data.phone} />,
          <ProfileField key="children" icon={FaUserFriends} label="Children IDs" value={data.childrenID?.join(", ")} />
        ];

      default:
        return [
          <div key="no-data" className="text-center py-8 text-gray-500">
            <FaUser className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No data available for this role.</p>
          </div>
        ];
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-4xl mx-auto">
        <div className={`${getRoleColor(role)} px-6 py-8`}>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img
                src={data.profileImage || 'https://via.placeholder.com/120'}
            alt={data.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/120';
                }}
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                {getRoleIcon(role)}
              </div>
            </div>
            
            <div className="text-center sm:text-left text-white flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{data.name}</h2>
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3">
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium capitalize">{role}</span>
                </div>
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">ID: {data.id}</span>
                </div>
              </div>
              <p className="text-sm text-white text-opacity-90">
                Member since {new Date().getFullYear()}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <FaEdit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 xs:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4">
            {renderProfileDetails()}
          </div>

          <div className="mt-4 xs:mt-6 pt-4 xs:pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 xs:gap-4 text-xs xs:text-sm text-gray-500">
              <div className="flex items-center space-x-1 xs:space-x-2">
                <FaCalendarAlt className="w-3 h-3 xs:w-4 xs:h-4" />
                <span>Profile last updated: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1 xs:space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Active Status</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPassModalOpen && (
        <PasswordModal
          setIsPassModalOpen={setIsPassModalOpen}
          changePassHandler={changePassHandler}
        />
      )}
    </>
  );
};

export default ProfileCard;
