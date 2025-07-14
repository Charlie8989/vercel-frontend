import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContent);
  
  useEffect(() => {
  if (userData) {
    console.log("User Data:", userData);
    console.log("User Name:", userData.name);
  }
}, [userData]);


  return (
    <div className="flex flex-col items-center mt-32 px-20  text-gray-800">
      <img
        src={assets.header_img}
        className="w-40 h-40 rounded-full mb-6"
        alt=" header"
      />
      <h1 className="text-xl flex items-center gap-2 sm:text-3xl font-medium mb-2">
        Hey {userData ? <h1>{userData.name}</h1> : <p>Developer</p>} !!
        <img src={assets.hand_wave} className="w-8 aspect-square" alt="" />
      </h1>
      <h2 className="text-3xl sm:5xl flex items-center font-semibold mb-2">
        Welcome To Our Website
      </h2>
      <p className="text-center mb-6 max-w-md">
        Lets Start Our Journey by Getting Started. Take A Tour Of Our Website
        And Tell Us Your Suggesstions....
      </p>
      <button className="mb-2 flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 hover:bg-blue-900 hover:text-white hover:border-blue-300 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;
