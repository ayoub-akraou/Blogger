import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BlogCard from "../components/UI/Cards/BlogCard";
import apiFetch from "../api/api";
import Pagination from "../components/UI/Pagination";

export default function Blogs() {
  const {query} = useParams();
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
// pagination
const [currentPage, setCurrentPage] = useState(1);
const blogsPerPage = 12;

const indexOfLastBlog = currentPage * blogsPerPage;
const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

const totalPages = Math.ceil(blogs.length / blogsPerPage);

  useEffect(() => {
    apiFetch("blogs/search?query=" + searchQuery, "GET", null, setError)
      .then((data) => {
        setBlogs(data.blogs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-28">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blogs</h1>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs..."
              className="w-64 sm:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 min-[500px]:grid-cols-3 xl:grid-cols-4">
        {currentBlogs?.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No blogs found</p>
          </div>
        ) : (
          currentBlogs?.map((blog) => (
            <BlogCard
              key={blog?.id}
              id={blog?.id}
              image={blog?.image}
              category={blog?.category?.name || "General"}
              title={blog?.title}
              author={blog?.author?.name || "Anonymous"}
              date={blog?.created_at}
              content={blog?.content}
              avatar={blog?.author?.image}
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={blogs.length}
        itemsPerPage={blogsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
