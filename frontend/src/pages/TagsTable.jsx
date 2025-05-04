import React, { useState } from "react";
import Delete from "../components/Icons/Delete.jsx";
import Cheveron from "../components/Icons/Cheveron.jsx";
import Button from "../components/UI/Button/Button.jsx";
import Alert from "../components/UI/Alerts/Alert.jsx";
import apiFetch from "../api/api.js";

export default function TagsTable() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [tags, setTags] = useState(
    JSON.parse(localStorage.getItem("tags")) || []
  );

  function handleDelete(e) {
    e.preventDefault();
    const id = e.target.closest("tr").id;
    apiFetch(`tags/${id}`, "DELETE", null, setError)
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setError(null);
        const updatedTags = tags.filter((tag) => tag.id !== Number(id));
        setTags(updatedTags);
        localStorage.setItem("tags", JSON.stringify(updatedTags));
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setMessage(null);
      });
  }

  return (
    <div className="max-w-4xl mx-auto">
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
      <div className="flex justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-800">Tags</h1>
        <Button className="bg-primary leading-none ">Create New</Button>
      </div>

      {/* <!-- Table --> */}
      <div className="bg-white rounded-md md:rounded-lg shadow overflow-hidden border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                NAME
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                COLOR
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                CREATED_AT
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                BLOGS
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                VIEWS
              </th>
              <th
                scope="col"
                className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tags.map((tag) => {console.log(tag)
              return <Row

                key={tag?.id}
                id={tag?.id}
                name={tag?.name}
                color={tag?.color}
                createdAt={tag?.created_at}
                blogs={tag?.blogs}
                views={tag?.views}
                handleDelete={handleDelete}
              />}
            )}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
}

function Row({
  className,
  id = "1",
  name = "VUE.JS",
  color = "#34c759",
  createdAt = "2023-01-01",
  blogs = "10",
  views = "1000",
  handleDelete,
}) {
  return (
    <tr className={className} id={id}>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
        {id}
      </td>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {name}
      </td>
      <td
        className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium"
        style={{ color: color }}
      >
        {color}
      </td>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(createdAt).toLocaleString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full`}
        >{console.log(blogs, views)
        }
          {blogs}
        </span>
      </td>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full`}
        >
          {views}
        </span>
      </td>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium">
        <button className="mx-auto block" onClick={handleDelete}>
          <Delete />
        </button>
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
