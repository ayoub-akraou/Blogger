import React from "react";

export default function Button({ id, children, className, onClick}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`${className} uppercase px-4 py-2 text-base text-secondary font-medium hover:opacity-95 active:scale-95`}
    >
      {children}
    </button>
  );
}
