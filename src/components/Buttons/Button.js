import React from "react";

function Button({ className = "", children, type = "button", ...props }) {
  return (
    <div>
      <button
        type={type}
        className={`px-4 py-2 rounded-lg ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
