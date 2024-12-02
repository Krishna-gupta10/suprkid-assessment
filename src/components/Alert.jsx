import React, { useState } from "react";

function Alert({ message, type, onClose }) {
  const alertClass = `alert alert-${type}`;

  return (
    <div className={alertClass}>
      {message}
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default Alert;
