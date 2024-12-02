import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import 'react-toastify/dist/ReactToastify.css';

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

  const updateTaskStatus = async (taskId, newStatus) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? updatedTask.task : task
          )
        );
        toast.success('Task status updated successfully!');
      } else {
        toast.error('Failed to update task status.');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('An error occurred while updating the task.');
    }
  };

  const deleteTask = async (taskId) => {
    const token = localStorage.getItem('authToken'); 

    const isConfirmed = window.confirm('Are you sure you want to delete this task?');
    if (!isConfirmed) {
      return; 
    }

    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        console.log('Task deleted successfully');
      } else {
        const errorData = await response.json();
        console.error(errorData.message || 'Error deleting task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    onLogout();
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <button onClick={handleLogout} className="btn btn-danger position-fixed top-0 end-0 m-3">
        Logout
      </button>

      <div className="text-center mb-5">
        <h1 className="display-4 text-primary">Taskify</h1>
        <p className="lead text-muted">Keep track of your tasks in a simple way.</p>
      </div>

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
      <ToastContainer /> 
    </div>
  );
}

export default Home;
