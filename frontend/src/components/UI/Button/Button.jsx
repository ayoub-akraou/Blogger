import React from "react";

export default function Button({ children, className }) {
  return (
    <button
      className={`${className} uppercase px-4 py-2 text-base text-secondary font-medium hover:opacity-95 active:scale-95`}
    >
      {children}
    </button>
  );
}
