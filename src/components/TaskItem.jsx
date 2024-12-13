import React from "react";

const TaskItem = ({ task, updateTaskStatus, deleteTask }) => {
  const { _id, title, description, status } = task;

  const handleStatusChange = () => {
    const newStatus = status === "Incomplete" ? "Complete" : "Incomplete";
    updateTaskStatus(_id, newStatus); 
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2">
      <div style={{ flex: 1, marginRight: "15px" }}>
        <h6 className="mb-1 text-primary">{title}</h6>
        <p className="mb-1 text-muted">{description}</p>
        <span
          className={`badge ${status === "Complete" ? "bg-success" : "bg-warning text-dark"}`}
        >
          {status}
        </span>
      </div>
      <div>
        <button
          className="btn btn-sm btn-outline-primary me-2"
          onClick={handleStatusChange}
        >
          {status === "Incomplete" ? "Mark as Complete" : "Mark as Incomplete"}
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => deleteTask(_id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
