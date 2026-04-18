import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Textarea } from "../components/utils/Input";
import Loader from "../components/utils/Loader";
import useFetch from "../hooks/useFetch";
import MainLayout from "../layouts/MainLayout";
import validateManyFields from "../validations";

const Task = () => {
  const authState = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { taskId } = useParams();

  const [fetchData, { loading }] = useFetch();
  const isEdit = Boolean(taskId);

  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = isEdit ? "Edit Task" : "Add Task";
  }, [isEdit]);

  useEffect(() => {
    if (!isEdit) return;

    const config = {
      url: `http://localhost:5000/api/tasks/${taskId}`,
      method: "get",
      headers: { Authorization: authState.token },
    };

    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        setTask(data.task);
        setFormData({ description: data.task.description });
      })
      .catch(() => navigate("/"));
  }, [isEdit, taskId, authState.token, fetchData, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: isEdit
        ? `http://localhost:5000/api/tasks/${taskId}`
        : "http://localhost:5000/api/tasks",
      method: isEdit ? "put" : "post",
      data: formData,
      headers: { Authorization: authState.token },
    };

    await fetchData(config);
    navigate("/");
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto pt-24 px-4">

        <h1 className="text-2xl font-bold text-center mb-6">
          {isEdit ? "Edit Task" : "Add Task"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >

          {loading && <Loader />}

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task..."
            className="w-full p-3 border rounded mb-4"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded w-full"
          >
            {isEdit ? "Update Task" : "Add Task"}
          </button>

        </form>
      </div>
    </MainLayout>
  );
};

export default Task;