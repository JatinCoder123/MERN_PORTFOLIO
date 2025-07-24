import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ManageSkills from "./pages/ManageSkills.jsx";
import ManageProjects from "./pages/ManageProjects.jsx";
import ManageTimeline from "./pages/ManageTimeline.jsx";
import ViewProject from "./pages/ViewProject.jsx";
import UpdateProject from "./pages/UpdateProject.jsx";
import ManageCertificate from "./pages/ManageCertificate.jsx"
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice.js";
import { getAllMessages } from "./store/slices/messagesSlice.js";
import { getAllTimeline } from "./store/slices/timelineSlice.js";
import { getAllSkills } from "./store/slices/skillSlice.js";
import { getAllApplication } from "./store/slices/applicationSlice.js";
import { getAllProjects } from "./store/slices/projectSlice.js";
// import "./App.css"

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllMessages());
    dispatch(getAllTimeline());
    dispatch(getAllSkills());
    dispatch(getAllApplication());
    dispatch(getAllProjects());
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/password/forgot" element={<ForgotPassword />}></Route>
        <Route
          path="/password/reset/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/manage/skills" element={<ManageSkills />}></Route>
        <Route path="/manage/timeline" element={<ManageTimeline />}></Route>
        <Route path="/manage/projects" element={<ManageProjects />}></Route>
        <Route path="/manage/certificate" element={<ManageCertificate />}></Route>
        <Route path="/view/project/:id" element={<ViewProject />}></Route>
        <Route path="/update/project/:id" element={<UpdateProject />}></Route>
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
};

export default App;
