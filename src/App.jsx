import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));
  const [tasks, setTasks] = useState([]);

  const handleLogin = async (email, password) => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("authToken", data.token);
      setIsAuthenticated(true);
    } else {
      toast.error("Login failed");
      throw new Error("Login failed");
    }
  };

  const handleRegister = async (email, password) => {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // Do not send confirmPassword here
    });

    const data = await response.json();
    if (response.ok) { // Check if the response status is ok (2xx)
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        setIsAuthenticated(true);
      }
    } else {
      toast.error(data.message || "Registration failed");
      throw new Error(data.message || "Registration failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route
            path="/"
            element={isAuthenticated ? (
              <Home tasks={tasks} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
