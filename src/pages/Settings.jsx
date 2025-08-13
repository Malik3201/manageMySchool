import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";
import {
  FaCog,
  FaUser,
  FaShieldAlt,
  FaBell,
  FaSpinner
} from "react-icons/fa";

const Settings = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const currentUserRole = JSON.parse(localStorage.getItem("userRole"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: true
    }
  });

  const getRoleTheme = () => {
    switch (currentUserRole) {
      case 'admin': return {
        primary: 'from-red-500 to-red-600',
        accent: 'text-red-500',
        focus: 'peer-focus:ring-red-300',
        checked: 'peer-checked:bg-red-500'
      };
      case 'teacher': return {
        primary: 'from-blue-500 to-blue-600',
        accent: 'text-blue-500',
        focus: 'peer-focus:ring-blue-300',
        checked: 'peer-checked:bg-blue-500'
      };
      case 'student': return {
        primary: 'from-green-500 to-green-600',
        accent: 'text-green-500',
        focus: '${theme.focus}',
        checked: '${theme.checked}'
      };
      case 'parent': return {
        primary: 'from-purple-500 to-purple-600',
        accent: 'text-purple-500',
        focus: 'peer-focus:ring-purple-300',
        checked: 'peer-checked:bg-purple-500'
      };
      default: return {
        primary: 'from-gray-500 to-gray-600',
        accent: 'text-gray-500',
        focus: 'peer-focus:ring-gray-300',
        checked: 'peer-checked:bg-gray-500'
      };
    }
  };

  const theme = getRoleTheme();

  useEffect(() => {
    const filterUser = async () => {
      setLoading(true);
      try {
      const currentUser = await axios.get("/data/users.json");
      const myUser = currentUser.data.find((user) => user.id == currentUserId);
        setData(myUser);
        
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    filterUser();
  }, [currentUserId]);

  const handleSettingsChange = (category, key, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    };
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
  };



  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "security", label: "Security", icon: FaShieldAlt },
    { id: "notifications", label: "Notifications", icon: FaBell }
  ];

  if (loading) {
    return (
      <div className="p-2 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-r ${theme.primary} rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse`}>
                <FaSpinner className="w-8 h-8 text-white animate-spin" />
              </div>
              <p className="text-gray-700 font-medium">Loading settings...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-4 xs:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 xs:gap-4">
          <div className="flex items-center space-x-2 xs:space-x-3">
            <div className={`w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${theme.primary} rounded-full flex items-center justify-center shadow-lg`}>
              <FaCog className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className={`bg-gradient-to-r ${theme.primary}`}>
            <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-200">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
  return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 sm:px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-white bg-white bg-opacity-20 border-b-2 border-white'
                        : 'text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span className="text-sm sm:text-base">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

                    <div className="p-4 xs:p-6">
            {activeTab === "profile" && (
              <div className="space-y-4 xs:space-y-6">
                <div className="flex items-center space-x-2 xs:space-x-3 mb-4 xs:mb-6">
                  <FaUser className={`w-4 h-4 xs:w-5 xs:h-5 ${theme.accent}`} />
                  <h2 className="text-lg xs:text-xl font-semibold text-gray-900">Profile Information</h2>
                </div>
      <ProfileCard data={data} role={currentUserRole} />
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4 xs:space-y-6">
                <div className="flex items-center space-x-2 xs:space-x-3 mb-4 xs:mb-6">
                  <FaShieldAlt className={`w-4 h-4 xs:w-5 xs:h-5 ${theme.accent}`} />
                  <h2 className="text-lg xs:text-xl font-semibold text-gray-900">Security Settings</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6">
                  <div className="bg-gray-50 rounded-xl p-4 xs:p-6 border border-gray-200">
                    <h3 className="text-base xs:text-lg font-semibold text-gray-900 mb-3 xs:mb-4">Password Security</h3>
                    <div className="space-y-3 xs:space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs xs:text-sm text-gray-600">Last changed</span>
                        <span className="text-xs xs:text-sm font-medium text-gray-900">30 days ago</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs xs:text-sm text-gray-600">Password strength</span>
                        <span className="text-xs xs:text-sm font-medium text-green-600">Strong</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 xs:p-6 border border-gray-200">
                    <h3 className="text-base xs:text-lg font-semibold text-gray-900 mb-3 xs:mb-4">Login Activity</h3>
                    <div className="space-y-3 xs:space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs xs:text-sm text-gray-600">Last login</span>
                        <span className="text-xs xs:text-sm font-medium text-gray-900">Today, 9:30 AM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs xs:text-sm text-gray-600">Active sessions</span>
                        <span className="text-xs xs:text-sm font-medium text-gray-900">1 session</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4 xs:space-y-6">
                <div className="flex items-center space-x-2 xs:space-x-3 mb-4 xs:mb-6">
                  <FaBell className={`w-4 h-4 xs:w-5 xs:h-5 ${theme.accent}`} />
                  <h2 className="text-lg xs:text-xl font-semibold text-gray-900">Notification Preferences</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4 p-3 xs:p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm xs:text-base">Email Notifications</h3>
                      <p className="text-xs xs:text-sm text-gray-600 mt-1">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.notifications.email}
                        onChange={(e) => handleSettingsChange('notifications', 'email', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ${theme.focus} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${theme.checked}"></div>
                    </label>
                  </div>

                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4 p-3 xs:p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm xs:text-base">Push Notifications</h3>
                      <p className="text-xs xs:text-sm text-gray-600 mt-1">Receive push notifications in browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.notifications.push}
                        onChange={(e) => handleSettingsChange('notifications', 'push', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ${theme.focus} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${theme.checked}"></div>
                    </label>
                  </div>

                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4 p-3 xs:p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm xs:text-base">SMS Notifications</h3>
                      <p className="text-xs xs:text-sm text-gray-600 mt-1">Receive important updates via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.notifications.sms}
                        onChange={(e) => handleSettingsChange('notifications', 'sms', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ${theme.focus} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${theme.checked}"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
