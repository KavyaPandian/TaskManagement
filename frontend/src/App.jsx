import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";   // ✅ Dashboard page
import Task from "./pages/Task";             // ✅ Add/Edit task page
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

import { saveProfile } from "./redux/actions/authActions";

function App() {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  // ✅ Auto login if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !authState.isLoggedIn) {
      dispatch(saveProfile(token));
    }
  }, [authState.isLoggedIn, dispatch]);

  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ HOME / DASHBOARD */}
        <Route
          path="/"
          element={
            authState.isLoggedIn ? <Dashboard /> : <Home />
          }
        />

        {/* ✅ LOGIN */}
        <Route
          path="/login"
          element={
            authState.isLoggedIn ? <Navigate to="/" /> : <Login />
          }
        />

        {/* ✅ SIGNUP */}
        <Route
          path="/signup"
          element={
            authState.isLoggedIn ? <Navigate to="/" /> : <Signup />
          }
        />

        {/* ✅ ADD TASK */}
        <Route
          path="/tasks/add"
          element={
            authState.isLoggedIn ? (
              <Task />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ✅ EDIT TASK */}
        <Route
          path="/tasks/:taskId"
          element={
            authState.isLoggedIn ? (
              <Task />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ❌ 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;