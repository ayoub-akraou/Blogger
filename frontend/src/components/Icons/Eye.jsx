import React from 'react'

export default function Eye({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      // stroke="#48b6ff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className + " w-5 h-5 stroke-blue-400 hover:stroke-blue-600"}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}
