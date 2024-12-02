import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

function Home({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("You need to log in first.");
        navigate("/login"); // Redirect to login if token is missing
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setTasks(data.tasks);
        } else {
          toast.error("Failed to fetch tasks.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching tasks.");
      }
    };

    fetchTasks();
  }, [navigate]);

  const addTask = async (task) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success("Task created successfully!");
      setTasks([...tasks, data.task]); // Add the new task to the state
    } else {
      toast.error("Failed to create task.");
    }
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
    toast.info("Task status updated!");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.warn("Task deleted!");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    onLogout(); // Handle logout action passed from parent
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 text-primary">Taskify</h1>
        <p className="lead text-muted">Keep track of your tasks in a simple way.</p>
      </div>
      <button
        onClick={handleLogout}
        className="btn btn-danger mb-4"
      >
        Logout
      </button>
      <div className="row">
        <div className="col-md-5 mx-auto">
          <TaskForm addTask={addTask} />
        </div>
      </div>
      <div className="mt-5">
        <TaskList tasks={tasks} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default Home;
