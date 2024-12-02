import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      addTask({ title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title text-primary">Create a New Task</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskTitle">Task Title</label>
            <input
              type="text"
              id="taskTitle"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="taskDescription">Description</label>
            <textarea
              id="taskDescription"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
