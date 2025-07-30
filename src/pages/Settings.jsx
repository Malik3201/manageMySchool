import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";

const Settings = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const currentUserRole = JSON.parse(localStorage.getItem("userRole"));
  const [data, setData] = useState({});
  useEffect(() => {
    const filterUser = async () => {
      const currentUser = await axios.get("/data/users.json");
      setData(currentUser.data.find((user) => user.id == currentUserId));
    };

    filterUser();
    console.log(data);
  }, []);
  return (
    <>
      <ProfileCard data={data} role={currentUserRole} />
    </>
  );
};
export default Settings;
