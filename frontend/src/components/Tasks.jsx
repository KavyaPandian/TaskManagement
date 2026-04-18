import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "./utils/Loader";

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  // ✅ STATES
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ FETCH
  const fetchTasks = useCallback(() => {
    fetchData(
      { url: "/tasks", method: "get" },
      { showSuccessToast: false }
    ).then((data) => setTasks(data.tasks));
  }, [fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  // ✅ DELETE (with confirmation)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetchData({ url: `/tasks/${id}`, method: "delete" })
        .then(() => fetchTasks());
    }
  };

  // ✅ TOGGLE
  const handleToggle = (id) => {
    fetchData({ url: `/tasks/${id}/toggle`, method: "put" })
      .then(() => fetchTasks());
  };

  // ✅ STATS
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.length - completed;
  const progress =
    tasks.length === 0 ? 0 : (completed / tasks.length) * 100;

  // 🔍 SEARCH
  const filteredTasks = tasks.filter(task =>
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  // 🎯 FILTER
  const finalTasks = filteredTasks.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  // 🔥 SORT
  const sortedTasks = [...finalTasks].sort((a, b) => {
    const aPending = a.status !== "completed";
    const bPending = b.status !== "completed";

    if (aPending && !bPending) return -1;
    if (!aPending && bPending) return 1;
    return 0;
  });

  return (
    <div className="max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Your Tasks ({tasks.length})
        </h2>

        <Link
          to="/tasks/add"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Add Task
        </Link>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded-lg border 
        bg-white text-black
        dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />

      {/* FILTER */}
      <div className="flex gap-3 mb-6">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-lg capitalize transition ${
              filter === f
                ? "bg-indigo-600 text-white shadow-md scale-105"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:scale-105"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 dark:text-gray-400">Total</p>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {tasks.length}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 dark:text-gray-400">Completed</p>
          <h2 className="text-green-500 font-bold">{completed}</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 dark:text-gray-400">Pending</p>
          <h2 className="text-yellow-500 font-bold">{pending}</h2>
        </div>

      </div>

      {/* PROGRESS */}
      <div className="mb-6">
        <p className="mb-2 font-medium text-gray-600 dark:text-gray-300">
          Progress
        </p>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* TASK LIST */}
      {loading ? (
        <Loader />
      ) : sortedTasks.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 dark:text-gray-400">
            No tasks found 😴
          </p>
        </div>
      ) : (

        sortedTasks.map((task, index) => (

          <div
            key={task._id}
            className="bg-white dark:bg-gray-800 p-5 mb-6 rounded-xl shadow hover:scale-[1.01] transition duration-300"
          >

            <div className="flex items-center">
              <span className="font-semibold text-gray-800 dark:text-white">
                Task #{index + 1}
              </span>

              <Link to={`/tasks/${task._id}`} className="ml-auto mr-3">
                ✏️
              </Link>

              <button onClick={() => handleDelete(task._id)}>
                🗑️
              </button>
            </div>

            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {task.description}
            </p>

            <span
              className={`mt-3 inline-block px-3 py-1 rounded-full ${
                task.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.status === "completed" ? "✔ Completed" : "⏳ Pending"}
            </span>

            <button
              onClick={() => handleToggle(task._id)}
              disabled={task.status === "completed"}
              className={`mt-3 block px-4 py-1 rounded text-white ${
                task.status === "completed"
                  ? "bg-gray-400"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {task.status === "completed"
                ? "Completed"
                : "Mark Complete"}
            </button>

          </div>

        ))
      )}
    </div>
  );
};

export default Tasks;