import React from "react";

export default function Archive({ className, onClick }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      className={`${className} w-5 h-5 cursor-pointer`}
    >
      <path
        d="M2.28571 4.85714V16.4286H17.7143V4.85714M7.42857 8.07143H12.5714M1 1V4.85714H19V1H1Z"
        stroke="#FFD050"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
