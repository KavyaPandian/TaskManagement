

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // 🌙 Theme State
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply Theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Toggle Theme
  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="
        flex justify-between items-center px-8 py-4 sticky top-0 z-50 
        bg-white text-gray-800
        dark:bg-gray-900 dark:text-white
        shadow-lg transition
      ">

        {/* LOGO */}
        <h2 className="text-2xl font-extrabold">
          <Link to="/">🚀 Task Manager</Link>
        </h2>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-6 font-medium">

          {/* 🌙 TOGGLE */}
          <li>
            <button
              onClick={toggleDarkMode}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </li>

          {authState.isLoggedIn ? (
            <>
              {/* ADD TASK */}
              <li>
                <Link
                  to="/tasks/add"
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  + Add Task
                </Link>
              </li>

              {/* LOGOUT */}
              <li
                onClick={handleLogoutClick}
                className="cursor-pointer hover:text-red-500 transition"
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}

        </ul>

        {/* MOBILE ICON */}
        <span
          className="md:hidden cursor-pointer text-2xl"
          onClick={toggleNavbar}
        >
          ☰
        </span>

      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] 
        bg-white text-gray-800 
        dark:bg-gray-900 dark:text-white
        shadow-2xl transform transition duration-300 z-50 
        ${isNavbarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >

        {/* CLOSE */}
        <div className="flex justify-end p-4">
          <span
            className="cursor-pointer text-xl"
            onClick={toggleNavbar}
          >
            ✖
          </span>
        </div>

        {/* MENU */}
        <ul className="flex flex-col gap-8 text-center mt-10 font-semibold">

          {/* 🌙 TOGGLE */}
          <li>
            <button
              onClick={toggleDarkMode}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? "🌞 Light" : "🌙 Dark"}
            </button>
          </li>

          {authState.isLoggedIn ? (
            <>
              <li>
                <Link to="/tasks/add" onClick={toggleNavbar}>
                  ➕ Add Task
                </Link>
              </li>

              <li
                onClick={() => {
                  handleLogoutClick();
                  toggleNavbar();
                }}
                className="cursor-pointer hover:text-red-500"
              >
                🚪 Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={toggleNavbar}>
                  Login
                </Link>
              </li>

              <li>
                <Link to="/signup" onClick={toggleNavbar}>
                  Sign Up
                </Link>
              </li>
            </>
          )}

        </ul>
      </div>
    </>
  );
};

export default Navbar;