import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Chat from "./Chat";
import Upload from "./Upload";


function Dashboard() {


  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar */}
      <Navbar type="dashboard" />

      {/* Main Section */}
      <div className="flex flex-1 flex-col lg:flex-row gap-4 p-4">
        {/* Left Column - Upload */}
        <div className="lg:w-1/3 w-full bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-y-auto transition-colors duration-300 lg:max-h-[calc(100vh-100px)]">
          <Upload />
        </div>

        {/* Right Column - Chat */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg p-4 overflow-y-auto transition-colors duration-300">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
