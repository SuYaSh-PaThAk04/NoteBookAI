import React from "react";
import { Moon, Sun, PenBoxIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

import logo from "../../assets/logo.png"
import toast from "react-hot-toast"

export default function Navbar({ type }) {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  const handleLogOut=()=>{
   try {
     localStorage.removeItem("accessToken");
     navigate("/");
    toast.success("User logged out successfully!")
   } catch (error) {
    console.log(error);
    toast.error("Logging out failed")
   }
    
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 
                    py-3 shadow-md px-4 sm:px-8 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo / Brand */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center text-green-700 dark:text-green-400 font-extrabold 
                     text-xl sm:text-2xl cursor-pointer hover:opacity-90 transition"
        >
          Knowtify
         

          <PenBoxIcon size={25} className="ml-1" />
        </div>

        {/* Right Section */}
        {type === "landing" ? (
          <div className="flex items-center gap-4">

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 
                         hover:scale-105 focus:ring-2 focus:ring-green-500 
                         transition duration-300"
            >
              {darkMode
                ? <Sun size={20} className="text-yellow-400" />
                : <Moon size={20} className="text-gray-800" />}
            </button>

            {/* Get Started Button */}
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-green-700 text-white px-4 sm:px-6 py-2 rounded-lg 
                         text-base sm:text-lg font-medium shadow-md 
                         hover:bg-green-600 hover:scale-105 
                         focus:ring-2 focus:ring-green-500 transition duration-300"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-5">

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 
                         hover:scale-105 focus:ring-2 focus:ring-green-500 
                         transition duration-300"
            >
              {darkMode
                ? <Sun size={20} className="text-yellow-400" />
                : <Moon size={20} className="text-gray-800" />}
            </button>

            {/* Home Button */}
            <button
              onClick={handleLogOut}
              className="flex items-center gap-1 sm:gap-2 rounded-md py-2 px-4 
                         text-white font-medium bg-gradient-to-r from-green-800 to-green-600 
                         shadow-md hover:scale-105 hover:shadow-lg 
                         focus:ring-2 focus:ring-green-500 transition duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
