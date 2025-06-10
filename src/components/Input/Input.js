import React, { useId } from "react";
import { forwardRef } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full mb-4">
        {label && (
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          id={id}
          className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          {...props}
          ref={ref}
          type={type}
        />
      </div>
    );
  }
);

export default Input;
