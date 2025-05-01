import React, { useState } from "react";
import Eye from "../components/Icons/Eye";
import Edit from "../components/Icons/Edit.jsx";
import Delete from "../components/Icons/Delete.jsx";
import Archive from "../components/Icons/Archive.jsx";
import Cheveron from "../components/Icons/Cheveron.jsx";
import Checked from "../components/Icons/Checked.jsx";
import Button from "../components/UI/Button/Button.jsx";
import Alert from "../components/UI/Alerts/Alert";
import apiFetch from "../api/api.js"
import { Link } from "react-router-dom";

export default function AuthorDashboard() {
  const [blogs, setBlogs] = useState(
    JSON.parse(localStorage.getItem("blogs")) || []
  );
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  function handleDelete(e) {
    e.preventDefault();
    const id = e.target.closest('.parent').id;
    apiFetch(`blogs/${id}`, "DELETE", null, setError)
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setError(null);
        setBlogs(blogs.filter((blog) => blog.id !== Number(id)));
        localStorage.setItem("blogs", JSON.stringify(blogs));
      })
      .catch((err) => {
        console.log(err.message);
        
        setError(err.message);
        setMessage(null);
      });
  }
  return (
    <div className="pt-28 pb-16 px-6">
      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}
      {message && (
        <Alert
          type="success"
          message={message}
          onClose={() => setMessage(null)}
        />
      )}
      <div className="max-w-4xl mx-auto">
        {/* <!-- En-tête avec recherche --> */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">My Blogs:</h1>
          <Link to="/blogs-editor">
            <Button className="bg-primary">NEW BLOG</Button>
          </Link>
        </div>

        {/* <!-- Tableau --> */}
        <div className="border border-[#d5d5d5] rounded-md overflow-hidden">
          <div className="responsive-table">
            <table className="w-full">
              <thead className="bg-[#f8f8f8] text-left">
                <tr>
                  <th className="py-2 px-2.5 sm:py-3 sm:px-4  font-medium">
                    ID
                  </th>
                  <th className="py-2 px-2.5 sm:py-3 sm:px-4  font-medium">
                    TITLE
                  </th>
                  <th className="py-2 px-2.5 sm:py-3 sm:px-4  font-medium">
                    VIEWS
                  </th>
                  <th className="py-2 px-2.5 sm:py-3 sm:px-4  font-medium  hidden sm:block">
                    LIKES
                  </th>
                  <th className="py-2 px-2.5 sm:py-3 sm:px-4  font-medium">
                    CATEGORY
                  </th>
                  <th className="py-2 px-2.5 sm:py-3 sm:px-4  font-medium">
                    STATUS
                  </th>
                  <th className="py-2 px-2.5 sm:py-3 sm:px-4  font-medium text-center">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody id="blog-table-body">
                {/* <!-- Les lignes du tableau seront générées dynamiquement par JavaScript --> */}
                {blogs.map((blog) => (
                  <Row
                    id={blog.id}
                    title={blog.title}
                    category={
                      categories.find(
                        (category) => category.id == blog.category_id
                      ).name
                    }
                    status={blog.status}
                    views={blog.views}
                    likes={blog.likes}
                    key={blog.id}
                    handleDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!-- Pagination --> */}
        <Pagination />
      </div>
    </div>
  );
}

function Row({
  className,
  id = 1,
  title = "ATOMIC HABIT",
  category = "Economy",
  status = "active",
  views = 199,
  likes = 199,
  handleDelete
}) {
  return (
    <tr className={`${className} border-t border-[#d5d5d5] parent`} id={id}>
      <td className="py-2 px-2.5 sm:py-3 sm:px-4 ">{id}</td>
      <td className="py-2 px-2.5 sm:py-3 sm:px-4 " title={title}>
        {title.length > 20 ? title.slice(0, 20) + "..." : title}
      </td>
      <td className="py-2 px-2.5 sm:py-3 sm:px-4 ">{views}</td>
      <td className="py-2 px-2.5 sm:py-3 sm:px-4  hidden sm:block">{likes}</td>
      <td className="py-2 px-2.5 sm:py-3 sm:px-4 ">{category}</td>
      <td className="py-2 px-2.5 sm:py-3 sm:px-4 ">
        <span
          className={`px-3 py-1 rounded-md text-sm ${
            status === "suspended"
              ? "bg-red-100 text-red-500"
              : "bg-[#c5ffe2] text-[#34c759]"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="py-2 px-2.5 sm:py-3 sm:px-4 ">
        {/* <DottedMenu className="sm:hidden block mx-auto"/> */}
        <div className="flex justify-center space-x-2">
          <Eye className="cursor-pointer" />
          {status === "suspended" ? (
            <Checked className="cursor-pointer" />
          ) : (
            <Archive className="cursor-pointer" />
          )}
          <Edit />

          <Delete onClick={handleDelete} className="cursor-pointer" />
        </div>
      </td>
    </tr>
  );
}

function Pagination({ className }) {
  return (
    <div
      className={`${className} flex flex-col sm:flex-row justify-between items-center mt-4 search-pagination`}
    >
      <div className="text-sm text-[#979797]" id="pagination-info">
        Showing 1-09 of 78
      </div>
      <div className="flex space-x-2">
        <button
          id="prev-page"
          className="w-8 h-8 border border-[#d5d5d5] rounded-md flex items-center justify-center"
        >
          <Cheveron orientation="left" />
        </button>
        <button
          id="next-page"
          className="w-8 h-8 border border-[#d5d5d5] rounded-md flex items-center justify-center"
        >
          <Cheveron orientation="right" />
        </button>
      </div>
    </div>
  );
}
