import React from 'react'

export default function Checked({ className, onClick }) {
  return (
    <svg
      onClick={onClick}
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} w-5 h-5 cursor-pointer`}
    >
      <path
        d="M6.96429 15.2319L0 8.08901L1.25 6.83901L6.96429 12.6426L18.75 0.767578L20 2.01758L6.96429 15.2319Z"
        fill="#34C759"
      />
    </svg>
  );
}
