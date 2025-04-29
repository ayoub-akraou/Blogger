import React from "react";
import Delete from "../components/Icons/Delete.jsx";
import Cheveron from "../components/Icons/Cheveron.jsx";
import Button from "../components/UI/Button/Button.jsx";

export default function TagsTable() {
  return (
    <>
      <div className="flex justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-800">Tags</h1>
        <Button className="bg-primary leading-none ">Create New</Button>
      </div>

      {/* <!-- Table --> */}
      <div className="bg-white rounded-md md:rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
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
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
          </tbody>
        </table>
      </div>
      <Pagination />
    </>
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
}) {
  return (
    <tr className={className}>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
        {id}
      </td>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {name}
      </td>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium" style={{ color: color }}>
        {color}
      </td>
      <td className="px-4 text-center py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
        {createdAt}
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
        <button className="mx-auto block">
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
