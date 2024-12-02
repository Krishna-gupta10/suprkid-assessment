import React from "react";

function TaskList({ tasks, updateTaskStatus, deleteTask }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Your Tasks</h5>
        <ul className="list-group">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h6>{task.title}</h6>
                  <p>{task.description}</p>
                </div>
                <div>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => updateTaskStatus(task.id, task.status === "Completed" ? "In Progress" : "Completed")}
                  >
                    {task.status === "Completed" ? "Mark as In Progress" : "Mark as Completed"}
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item">No tasks available.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
