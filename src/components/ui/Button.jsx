import React from "react";

const Button = ({ children, onClick, bgColor = "bg-blue-500" }) => {
  return (
    <button
      className={`${bgColor} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-200 ease-in-out`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
