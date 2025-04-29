import React from "react";
import Eye from "../components/Icons/Eye";
import Suspend from "../components/Icons/Suspend.jsx";
import Delete from "../components/Icons/Delete.jsx";
import Cheveron from "../components/Icons/Cheveron.jsx";
import Checked from "../components/Icons/Checked.jsx";

export default function UsersTable() {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Users</h1>

      {/* <!-- Table --> */}
      <div className="bg-white rounded-md md:rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                NAME
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                EMAIL
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ROLE
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                STATUS
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
            <Row status="suspended" />
            <Row />
            <Row status="suspended" />
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
  name = "ayoub akraou",
  email = "ayoubakraou@gmail.com",
  role = "regular",
  status = "active",
}) {
  return (
    <tr className={className}>
      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
        {id}
      </td>
      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {name}
      </td>
      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
        {email}
      </td>
      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
        {role}
      </td>
      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          status === "suspended"
            ? "bg-red-100 text-red-500"
            : "bg-[#c5ffe2] text-[#34c759]"
        }`}>
          {status}
        </span>
      </td>
      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button>
            <Eye />
          </button>
          <button>{status === "active" ? <Suspend /> : <Checked />}</button>
          <button>
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
