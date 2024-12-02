import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      addTask({ title, description });
      setTitle("");
      setDescription("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Create a New Task</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskTitle">Task Title</label>
            <input
              type="text"
              id="taskTitle"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="taskDescription">Description</label>
            <textarea
              id="taskDescription"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
