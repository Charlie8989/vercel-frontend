import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendURL, setuserData, setisloggedin } =
    useContext(AppContent);

  const sendVerificationOTP = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendURL + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const LogOut = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendURL + "/api/auth/logout");
      data.success && setisloggedin(false);
      data.success && setuserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-4 sm:px-20 absolute top-0">
      <img src={assets.logo} alt="" className="w-28 sm:w-32" />
      {userData ? (
        <div className="bg-zinc-800 cursor-pointer flex rounded-full w-8 h-8 text-white justify-center items-center relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden text-black group-hover:block top-0 right-0 z-10 pt-10 text-sm">
            <ul className="list-none rounded-lg m-0 p-2 bg-gray-100 ">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOTP}
                  className="py-1 px-2 whitespace-nowrap hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                  Verify Account
                </li>
              )}

              <li
                onClick={LogOut}
                className="py-1 px-2 whitespace-nowrap hover:bg-gray-200 hover:text-red-500 rounded-lg cursor-pointer "
              >
                Log Out
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 hover:bg-slate-100 transition-all"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
