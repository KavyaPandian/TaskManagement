import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 text-white">

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Organize Your Tasks Easily 🚀
        </h1>

        <p className="text-lg md:text-xl mb-8 opacity-90">
          Manage your daily tasks efficiently and stay productive.
        </p>

        <div className="flex gap-4">
          <Link
            to="/signup"
            className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-purple-700 transition"
          >
            Login
          </Link>
        </div>

      </div>

      {/* Features Section */}
      <div className="bg-white text-gray-800 py-16 px-6">

        <h2 className="text-3xl font-bold text-center mb-10">
          Why Use Task Manager?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          <div className="p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">📋 Manage Tasks</h3>
            <p>Easily create, update and delete your tasks.</p>
          </div>

          <div className="p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">🔐 Secure</h3>
            <p>Authentication with JWT keeps your data safe.</p>
          </div>

          <div className="p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast</h3>
            <p>Lightning fast performance using MERN stack.</p>
          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="text-center py-6 text-sm opacity-80">
        © 2026 Task Manager | Built with ❤️ by Kavya
      </div>

    </div>
  );
};

export default Home;