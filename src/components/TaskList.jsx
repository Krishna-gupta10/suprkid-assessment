import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, updateTaskStatus, deleteTask }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary">Your Tasks</h5>
        <ul className="list-group mt-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task._id} 
                task={task}
                updateTaskStatus={updateTaskStatus}
                deleteTask={deleteTask}
              />
            ))
          ) : (
            <li className="list-group-item text-center">No tasks available.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
