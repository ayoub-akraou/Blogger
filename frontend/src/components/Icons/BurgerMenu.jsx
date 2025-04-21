import React from "react";

export default function BurgerMenu({ className, onClick }) {
  return (
    <button
      className={className + " " + "cursor-pointer active:scale-95"}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="22"
        viewBox="0 0 34 22"
        fill="none"
      >
        <g clipPath="url(#clip0_1401_5920)">
          <path
            d="M1.59961 11.5713H30.3996"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.59961 1.57129H30.3996"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.59961 21.5713H30.3996"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1401_5920">
            <rect width="26" height="22" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}
