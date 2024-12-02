import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));
  const [tasks, setTasks] = useState([]);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response status:", response.status); 
      console.log("Response data:", data); 

      if (response.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        setIsAuthenticated(true);
      } else {
        toast.error(data.message || "Login failed");
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please check your credentials or try again.");
    }
  };



  const handleRegister = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Registration successful! You can now log in.");
      } else {
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please check your network and try again.");
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
