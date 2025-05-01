import React from "react";

export default function Delete({ className, onClick }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      // stroke="#ff3b30"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className + " w-5 h-5 stroke-red-400 hover:stroke-red-500"}
    >
      <path d="M3 6h18"></path>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
    </svg>
  );
}
