import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

function Home({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch("http://localhost:5000/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setTasks(data.tasks);
        } else {
          toast.error("Failed to fetch tasks.");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("An error occurred while fetching tasks.");
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const token = localStorage.getItem("authToken");
    try {
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
        setTasks([...tasks, data.task]);
        toast.success("Task created successfully!");
      } else {
        toast.error(data.message || "Failed to create task.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the task.");
      console.error("Error creating task:", error);
    }
  };

  const updateTaskStatus = async (id, status) => {
    console.log("Updating task status for ID:", id); // Debug log
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
  
      if (response.ok) {
        setTasks(
          tasks.map((task) =>
            task._id === id ? { ...task, status } : task
          )
        );
        toast.success("Task status updated!");
      } else {
        const errorData = await response.json();
        console.error("Failed to update status:", errorData);
        toast.error("Failed to update task status.");
      }
    } catch (error) {
      toast.error("An error occurred while updating task status.");
      console.error("Error updating task:", error);
    }
  };
  

  const deleteTask = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        toast.success("Task deleted successfully!");
      } else {
        toast.error("Failed to delete task.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the task.");
      console.error("Error deleting task:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    onLogout();
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 text-primary">Taskify</h1>
        <p className="lead text-muted">Keep track of your tasks in a simple way.</p>
      </div>
      <button onClick={handleLogout} className="btn btn-danger mb-4">
        Logout
      </button>
      <div className="row">
        <div className="col-md-5 mx-auto">
          <TaskForm addTask={addTask} />
        </div>
      </div>
      <div className="mt-5">
        <TaskList
          tasks={tasks}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default Home;
