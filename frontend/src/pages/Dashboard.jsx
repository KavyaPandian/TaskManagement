import React from "react";
import Tasks from "../components/Tasks";
import MainLayout from "../layouts/MainLayout";

const Dashboard = () => {
  return (
    <MainLayout>
      <div
        className="
        min-h-screen p-6

        /* 🌞 LIGHT MODE */
        bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50
        text-gray-800

        /* 🌙 DARK MODE */
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black
        dark:text-white

        transition duration-300
      "
      >

        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center mb-8">

          <h1
            className="
            text-4xl md:text-5xl font-extrabold
            bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600
            bg-clip-text text-transparent
            dark:from-purple-400 dark:via-pink-400 dark:to-blue-400
          "
          >
            Dashboard 🚀
          </h1>

        </div>

        {/* 📊 TASKS SECTION */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg p-4 rounded-2xl shadow-lg">
          <Tasks />
        </div>

      </div>
    </MainLayout>
  );
};

export default Dashboard;