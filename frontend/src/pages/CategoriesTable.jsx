import React, { useState } from "react";
import Delete from "../components/Icons/Delete.jsx";
import Cheveron from "../components/Icons/Cheveron.jsx";
import Button from "../components/UI/Button/Button.jsx";
import Eye from "../components/Icons/Eye.jsx";
import apiFetch from "../api/api.js";
import Alert from "../components/UI/Alerts/Alert.jsx";

export default function CategoriesTable() {
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || []
  );
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    color: "#000000",
  });

  function handleDelete(e) {
    e.preventDefault();
    const id = e.target.closest("tr").id;
    apiFetch(`categories/${id}`, "DELETE", null, setError)
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setError(null);
        const updatedCategories = categories.filter(
          (category) => category.id !== Number(id)
        );
        setCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
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
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <Button
          className="bg-primary leading-none "
          onClick={() => setIsModalOpen(true)}
        >
          Create New
        </Button>
      </div>

      {isModalOpen && (
        <CreateCategoryModal
          onClose={() => setIsModalOpen(false)}
          setMessage={setMessage}
          setError={setError}
          setCategories={setCategories}
          categories={categories}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {/* Table */}
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
                COVER
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
            {categories.map((category) => (
              <Row
                key={category.id}
                id={category.id}
                name={category.name}
                cover={category.cover}
                createdAt={category.created_at}
                blogs={category.blogs}
                views={category.views}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* <Pagination /> */}
    </div>
  );
}

function Row({
  className,
  id = "1",
  name = "SPORT",
  cover = "cover.png",
  createdAt = "2023-01-01",
  blogs = "10",
  views = "0",
  handleDelete = () => {},
}) {
  return (
    <tr id={id} className={className}>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
        {id}
      </td>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {name}
      </td>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium">
        {cover}
      </td>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
        {createdAt}
      </td>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full`}
        >
          {blogs.length || 0} blogs
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
        <div className="flex justify-center gap-3">
          <button>
            <Eye />
          </button>
          <button onClick={handleDelete}>
            <Delete />
          </button>
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

function CreateCategoryModal(
 { onClose,
  setMessage,
  setError,
  setCategories,
  categories,
  formData,
  setFormData}
) {
  console.log(formData);

  function handleSubmit(e) {
    e.preventDefault();
    apiFetch("categories", "POST", formData, setError)
      .then((response) => {
        setMessage("Category created successfully");
        setCategories((prev) => [...prev, response.data]);
        localStorage.setItem(
          "categories",
          JSON.stringify([...categories, response.data])
        );
        onClose();
        setFormData({
          name: "",
          description: "",
          image: "",
          color: "#000000",
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Create New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, image: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, color: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
