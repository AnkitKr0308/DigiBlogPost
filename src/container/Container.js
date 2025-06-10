import React from "react";

function Container({ children }) {
  return (
    // <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
    <div className="flex flex-col items-center">{children}</div>
  );
}

export default Container;
