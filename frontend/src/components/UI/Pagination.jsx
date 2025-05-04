import React from "react";
import Cheveron from "../Icons/Cheveron";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  setCurrentPage,
  className,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={"mx-auto flex gap-3 mt-4 justify-center " + className}>
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage <= 1}
        className="px-2 py-1 rounded-full text-sm font-medium border border-gray-400 w-8 h-8 flex items-center justify-center leading-none"
        style={{ opacity: currentPage <= 1 ? "0" : "1" }}
      >
        <Cheveron orientation="left" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          disabled={page === currentPage}
          className="px-2 py-1 rounded-full text-sm font-medium border border-gray-400 w-8 h-8 flex items-center justify-center leading-none"
          style={{
            backgroundColor: page === currentPage ? "#ffd050" : "white",
            color: page === currentPage ? "#fff" : "#555",
          }}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="px-2 py-1 rounded-full text-sm font-medium border border-gray-400 w-8 h-8 flex items-center justify-center leading-none"
        disabled={currentPage >= totalPages}
        style={{ opacity: currentPage >= totalPages ? "0" : "1" }}
      >
        <Cheveron orientation="right" />
      </button>
    </div>
  );
}
