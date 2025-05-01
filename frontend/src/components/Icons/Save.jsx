import React from 'react';

export default function Save({ className = "", onClick }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className={className + " w-6 h-6"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
      />
      <polyline
        strokeLinecap="round"
        strokeLinejoin="round"
        points="17 21 17 13 7 13 7 21"
      />
      <polyline
        strokeLinecap="round"
        strokeLinejoin="round"
        points="7 3 7 8 15 8"
      />
    </svg>
  );
}
