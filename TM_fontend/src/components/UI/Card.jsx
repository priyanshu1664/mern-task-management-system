import React from "react";

function Card({ children, className }) {
  return (
    <div
      className={`bg-white shadow-md rounded-xl p-6 border border-gray-200 transition hover:shadow-xl ${className}`}
    >
      <div>{children}</div>
    </div>
  );
}

export default Card;
