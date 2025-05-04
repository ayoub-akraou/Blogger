import React, { useEffect, useState } from "react";
import Eye from "../components/Icons/Eye";
import Suspend from "../components/Icons/Suspend.jsx";
import Delete from "../components/Icons/Delete.jsx";
import Checked from "../components/Icons/Checked.jsx";
import apiFetch from "../api/api.js";
import Alert from "../components/UI/Alerts/Alert.jsx";
import Pagination from "../components/UI/Pagination.jsx";

export default function UsersTable() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  const indexOfLastBlog = currentPage * usersPerPage;
  const indexOfFirstBlog = indexOfLastBlog - usersPerPage;
  const currentUsers = users.slice(indexOfFirstBlog, indexOfLastBlog);

  useEffect(() => {
    if (users.length === 0) {
      apiFetch("users", "GET", null, setError)
        .then((data) => {
          setUsers(data);
          setMessage(data.message);
          setError(null);
          localStorage.setItem("users", JSON.stringify(data));
        })
        .catch((err) => {
          console.error(err.message);
          setError(err.message);
          setMessage(null);
        });
    }
  }, []);

  function handleDelete(e) {
    const id = e.target.closest("tr").id;
    apiFetch(`admin/delete-user/${id}`, "DELETE", null, setError)
      .then((data) => {
        setMessage(data.message);
        setError(null);
        const updatedUsers = users.filter((user) => user.id !== Number(id));
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
        setMessage(null);
      });
  }

  function handleSuspend(e) {
    const id = e.target.closest("tr").id;
    apiFetch(`admin/suspend-user/${id}`, "PATCH", null, setError)
      .then((data) => {
        setMessage(data.message);
        setError(null);
        const updatedUsers = users.map((user) =>
          user.id === Number(id) ? { ...user, status: "suspended" } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
        setMessage(null);
      });
  }

  function handleActivate(e) {
    const id = e.target.closest("tr").id;
    apiFetch(`admin/activate-user/${id}`, "PATCH", null, setError)
      .then((data) => {
        setMessage(data.message);
        setError(null);
        const updatedUsers = users.map((user) =>
          user.id === Number(id) ? { ...user, status: "active" } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      })
      .catch((err) => {
        console.error(err.message);
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
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Users</h1>

      {/* <!-- Table --> */}
      <div className="bg-white rounded-md md:rounded-lg shadow overflow-hidden border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
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
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <Row
                  key={user?.id}
                  id={user?.id}
                  name={user?.name}
                  email={user?.email}
                  role={user?.type}
                  status={user?.status}
                  handleDelete={handleDelete}
                  handleActivate={handleActivate}
                  handleSuspend={handleSuspend}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={users.length}
        itemsPerPage={usersPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

function Row({
  className,
  id = "1",
  name = "ayoub akraou",
  email = "ayoubakraou@gmail.com",
  role = "regular",
  status = "active",
  handleDelete,
  handleActivate,
  handleSuspend,
}) {
  return (
    <tr className={className} id={id}>
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
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            status === "suspended"
              ? "bg-red-100 text-red-500"
              : "bg-[#c5ffe2] text-[#34c759]"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          {/* <button>
            <Eye />
          </button> */}
          <button>
            {status === "active" ? (
              <Suspend onClick={handleSuspend} />
            ) : (
              <Checked onClick={handleActivate} />
            )}
          </button>
          <button onClick={handleDelete}>
            <Delete />
          </button>
        </div>
      </td>
    </tr>
  );
}
