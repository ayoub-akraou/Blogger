import React, { useState } from "react";
import Eye from "../components/Icons/Eye";
import Edit from "../components/Icons/Edit.jsx";
import Delete from "../components/Icons/Delete.jsx";
import Archive from "../components/Icons/Archive.jsx";
import Cheveron from "../components/Icons/Cheveron.jsx";
import Checked from "../components/Icons/Checked.jsx";
import Button from "../components/UI/Button/Button.jsx";
import { Link } from "react-router-dom";
import apiFetch from "../api/api.js";
import Alert from "../components/UI/Alerts/Alert.jsx";
import Pagination from "../components/UI/Pagination";

export default function BlogsTable() {
  const role = localStorage.getItem("user-role");
  const [blogs, setBlogs] = useState(
    JSON.parse(localStorage.getItem("blogs")) || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 15;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  function handleDelete(e) {
    e.preventDefault();
    const id = e.target.closest("tr").id;
    apiFetch(`blogs/${id}`, "DELETE", null, setError)
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setError(null);
        const updatedBlogs = blogs.filter((blog) => blog.id !== Number(id));
        setBlogs(updatedBlogs);
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setMessage(null);
      });
  }

  function handleActivateBlog(e) {
    const id = e.target.closest("tr").id;
    apiFetch(`blogs/${id}/publish`, "PATCH", null, setError)
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setError(null);
        const updatedBlogs = blogs.map((blog) =>
          blog.id === Number(id) ? { ...blog, status: "active" } : blog
        );
        setBlogs(updatedBlogs);
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      })
      .catch((err) => {
        console.log(err.message);

        setError(err.message);
        setMessage(null);
      });
  }

  function handleSuspendBlog(e) {
    const id = e.target.closest("tr").id;
    apiFetch(`blogs/${id}/unpublish`, "PATCH", null, setError)
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setError(null);
        const updatedBlogs = blogs.map((blog) =>
          blog.id === Number(id) ? { ...blog, status: "suspended" } : blog
        );
        setBlogs(updatedBlogs);
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setMessage(null);
      });
  }

  return (
    <div className="px-4 md:px-6 md:py-2">
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
        <div className="flex justify-between  mb-2">
          <h1 className="text-2xl font-bold text-gray-800">My Blogs:</h1>
          {role === "author" && (
            <Button className="bg-primary">NEW BLOG</Button>
          )}
        </div>

        {/* <!-- Tableau --> */}
        <div className="border border-[#999] rounded-md overflow-hidden">
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
                  currentBlogs.map((blog, index) => (
                    <Row
                      key={index}
                      id={blog?.id}
                      title={blog?.title}
                      category={blog?.category?.name}
                      status={blog?.status}
                      views={blog?.views}
                      likes={blog?.likes}
                      handleActivateBlog={handleActivateBlog}
                      handleSuspendBlog={handleSuspendBlog}
                      handleDelete={handleDelete}
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
  category = "Sport",
  status = "active",
  views = 199,
  likes = 199,
  handleActivateBlog,
  handleSuspendBlog,
  handleDelete,
}) {
  return (
    <tr id={id} className={`${className} text-sm border-t border-[#d5d5d5]`}>
      <td className="py-2 px-2.5 sm:py-3 sm:px-4 ">{id}</td>
      <td className="py-2 px-2.5 sm:py-3 sm:px-4 ">
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
            <Eye />
          </Link>
          {status === "suspended" ? (
            <Checked onClick={handleActivateBlog} />
          ) : (
            <Archive onClick={handleSuspendBlog} />
          )}
          {/* admin should not edit  <Edit /> */}
          <Delete onClick={handleDelete} />
        </div>
      </td>
    </tr>
  );
}
