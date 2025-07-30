import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";

const Settings = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const currentUserRole = JSON.parse(localStorage.getItem("userRole"));
  const [data, setData] = useState(null);
  useEffect(() => {
    const filterUser = async () => {
      const currentUser = await axios.get("/data/users.json");
      const myUser = currentUser.data.find((user) => user.id == currentUserId);

      setData(myUser);
    };

    filterUser();
  }, []);
  return (
    <>
      <ProfileCard data={data} role={currentUserRole} />
    </>
  );
};
export default Settings;
