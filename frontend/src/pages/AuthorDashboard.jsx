import React, { useState } from "react";
import Eye from "../components/Icons/Eye";
import Edit from "../components/Icons/Edit.jsx";
import Delete from "../components/Icons/Delete.jsx";
import Archive from "../components/Icons/Archive.jsx";
import Cheveron from "../components/Icons/Cheveron.jsx";
import Checked from "../components/Icons/Checked.jsx";
import Button from "../components/UI/Button/Button.jsx";
import Alert from "../components/UI/Alerts/Alert";
import apiFetch from "../api/api.js";
import { Link } from "react-router-dom";
import Pagination from "../components/UI/Pagination";

export default function AuthorDashboard() {
  const [blogs, setBlogs] = useState(
    JSON.parse(localStorage.getItem("blogs")) || []
  );
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 15;

  // Calculate the blogs to display
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  function handleDelete(e) {
    e.preventDefault();
    const id = e.target.closest(".parent").id;
    apiFetch(`blogs/${id}`, "DELETE", null, setError)
      .then((data) => {
        setMessage(data.message);
        setError(null);
        setBlogs(blogs.filter((blog) => blog.id !== Number(id)));
        localStorage.setItem("blogs", JSON.stringify(blogs));
      })
      .catch((err) => {
        console.error(err.message);

        setError(err.message);
        setMessage(null);
      });
  }

  function handleActivateBlog(e) {
    const id = e.target.closest(".parent").id;
    apiFetch(`blogs/${id}/publish`, "PATCH", null, setError)
      .then((data) => {
        setMessage(data.message);
        setError(null);
        setBlogs(blogs.map((blog) => blog.id === Number(id) ? {...blog, status: "active"} : blog));
        localStorage.setItem("blogs", JSON.stringify(blogs));
      })
      .catch((err) => {
        console.error(err.message);

        setError(err.message);
        setMessage(null);
      });
  }

  function handleSuspendBlog(e) {
    const id = e.target.closest(".parent").id;
    apiFetch(`blogs/${id}/unpublish`, "PATCH", null, setError)
      .then((data) => {
        setMessage(data.message);
        setError(null);
        setBlogs(blogs.map((blog) => blog.id === Number(id) ? {...blog, status: "suspended"} : blog));
        localStorage.setItem("blogs", JSON.stringify(blogs));
      })
      .catch((err) => {
        console.error(err.message);
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
                {currentBlogs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No blogs found
                    </td>
                  </tr>
                ) : (
                  currentBlogs.map((blog) => (
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
                      handleActivateBlog={handleActivateBlog}
                      handleSuspendBlog={handleSuspendBlog}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!-- Pagination --> */}
        <Pagination
          currentPage={currentPage}
          totalItems={blogs.length}
          itemsPerPage={blogsPerPage}
          setCurrentPage={setCurrentPage}
        />
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
  handleDelete,
  handleActivateBlog,
  handleSuspendBlog,
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
          <Link to={`/blog-detail/${id}`}>
            <Eye className="cursor-pointer" />
          </Link>
          {status === "suspended" ? (
            <button onClick={handleActivateBlog}>
              <Checked className="cursor-pointer" />
            </button>
          ) : (
            <button onClick={handleSuspendBlog}>
              <Archive className="cursor-pointer" />
            </button>
          )}
          <Link to={`/update-blog-editor/${id}`}>
            <Edit />
          </Link>
          <Delete onClick={handleDelete} className="cursor-pointer" />
        </div>
      </td>
    </tr>
  );
}