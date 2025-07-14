import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();
  const { backendURL, setisloggedin, getUserData } = useContext(AppContent);

  const [state, setstate] = useState("Sign Up");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onsubmitHandler = async (e) => {
    try {
      e.preventDefault();

      //To send cookies also
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendURL + '/api/auth/register', {
          name,
          email,
          password,
        });
        if (data.success) {
          setisloggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendURL + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setisloggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error details:", error); // Log the full error object for debugging
      if (error.response && error.response.data) {
        toast.error(error.response.data.message); // Show the error message from the server
      } else {
        toast.error("Something went wrong!");
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-300">
      <img
        onClick={() => {
          navigate("/");
        }}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 w-full rounded-lg shadow-lg px-10 py-8 sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl text-center mb-4 font-semibold text-white ">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-sm  text-center mb-5">
          {state === "Sign Up" ? "Create An Account" : "Login To Your Account"}
        </p>

        <form onSubmit={onsubmitHandler}>
          {state == "Sign Up" && (
            <div className="flex items-center mb-3 rounded-full px-5 py-2.5 gap-3 bg-[#2e364ed9] w-full">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => {
                  setname(e.target.value);
                }}
                value={name}
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="flex items-center mb-3 rounded-full px-5 py-2.5 gap-3 bg-[#2e364ed9] w-full">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              value={email}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Enter Email Address"
              required
            />
          </div>
          <div className="flex items-center mb-3 rounded-full px-5 py-2.5 gap-3 bg-[#2e364ed9] w-full">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              value={password}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p
            onClick={() => {
              navigate("/reset-password");
            }}
            className="mb-5 cursor-pointer text-indigo-300"
          >
            Forgot Password??
          </p>
          <button className="flex items-center gap-2 rounded-full px-6 py-2 w-full text-medium justify-center bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
            {state}
          </button>

          {state === "Sign Up" ? (
            <p className="mt-3 text-gray-400 text-xs text-center">
              Already Have An Account ?
              <span
                onClick={() => {
                  setstate("Login");
                }}
                className="cursor-pointer ml-1 text-indigo-300 underline"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="mt-3 text-gray-400 text-xs text-center">
              Don't Have An Account ?
              <span
                onClick={() => {
                  setstate("Sign Up");
                }}
                className="cursor-pointer ml-1 text-indigo-300 underline"
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
