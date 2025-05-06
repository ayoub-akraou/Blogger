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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTag, setNewTag] = useState({
    name: "",
    color: "#34c759"
  });

  function handleDelete(e) {
    e.preventDefault();
    const id = e.target.closest("tr").id;
    apiFetch(`tags/${id}`, "DELETE", null, setError)
      .then((data) => {
        setMessage(data.message);
        setError(null);
        const updatedTags = tags.filter((tag) => tag.id !== Number(id));
        setTags(updatedTags);
        localStorage.setItem("tags", JSON.stringify(updatedTags));
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
        setMessage(null);
      });
  }

  function handleCreateTag(e) {
    e.preventDefault();
    
    if (!newTag.name.trim()) {
      setError("Tag name is required");
      return;
    }
    
    apiFetch("tags", "POST", newTag, setError)
      .then((data) => {
        if (data.success) {
          setMessage(data.message);
          setError(null);
          
          const updatedTags = [...tags, data.data];
          setTags(updatedTags);
          localStorage.setItem("tags", JSON.stringify(updatedTags));
          
          setNewTag({ name: "", color: "#34c759" });
          setIsModalOpen(false);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
        setMessage(null);
      });
  }
  
  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewTag(prev => ({
      ...prev,
      [name]: value
    }));
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
        <Button className="bg-primary leading-none " onClick={() => setIsModalOpen(true)}>Create New</Button>
      </div>
      {/* modal de creation de vouveau tags */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Tag</h2>
            <form onSubmit={handleCreateTag}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Tag Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newTag.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter tag name"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                  Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="color"
                    name="color"
                    value={newTag.color}
                    onChange={handleInputChange}
                    className="h-10 w-10 mr-2"
                  />
                  <input
                    type="text"
                    name="color"
                    value={newTag.color}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button type="button" className="bg-gray-500" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary">
                  Create Tag
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            {tags.map((tag) => {
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
        >
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
