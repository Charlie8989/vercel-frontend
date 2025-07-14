import { createContext, useState } from "react";
import { data } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"

export const AppContent = createContext();

export const AppContextProvider = (props) => {

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setisloggedin] = useState(false);
  const [userData, setuserData] = useState(false);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/data");

      if (data.success) {
        setuserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        console.log("uppar waala error")
      } else {
        toast.error("Failed to fetch user data.");
        console.log(error.message)
      }
    }
  };

  const value = {
    backendURL,
    isLoggedin,
    setisloggedin,
    userData,
    setuserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
