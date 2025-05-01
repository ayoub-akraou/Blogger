import React, { useEffect } from "react";
import Button from "../components/UI/Button/Button";

import { useState } from "react";
import apiFetch from "../api/api";
import Alert from "../components/UI/Alerts/Alert";
import { useNavigate } from "react-router-dom";

export default function Profile({ className, image = "/images/avatar.png" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("************");
  const [confirmPassword, setConfirmPassword] = useState("************");
  const [bio, setBio] = useState("bio...");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setName(user?.name || '');
    setEmail(user?.email || '');
    setBio(user?.bio || 'bio...');
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    apiFetch(
      `users/${userId}`,
      "PUT",
      { name, email, password, 'password_confirmation': confirmPassword, bio },
      setError
    )
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className={`${className} max-w-3xl mx-auto px-6 pt-32 pb-20`}>
      {error && (
        <Alert
          message={error}
          type="error"
          duration={3000}
          onClose={() => {
            setError(null);
          }}
        />
      )}
      {message && (
        <Alert
          message={message}
          type="success"
          duration={3000}
          onClose={() => {
            setMessage(null);
          }}
        />
      )}
      {/* <!-- Header with profile image --> */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welecom {name}!</h1>
        <div className="h-24 w-24 rounded-full overflow-hidden">
          <img
            src={image}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* <!-- Form --> */}
      <form onSubmit={handleSubmit}>
        {/* <!-- Full Name --> */}
        <div>
          <label htmlFor="fullname" className="block text-lg font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* <!-- Email --> */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* <!-- Password --> */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium mb-2">
            Password
          </label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* <!-- Confirm Password --> */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-lg font-medium mb-2"
          >
            Confirm-password
          </label>
          <input
            type="text"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* <!-- Bio --> */}
        <div className="mb-8">
          <label htmlFor="bio" className="block text-lg font-medium mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            className="w-full p-3 border border-gray-300 rounded-md min-h-[200px]"
            value={bio}
            placeholder="write your bio"
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* <!-- Buttons --> */}
        <div className="flex justify-between pt-4">
          <Button
            type="Button"
            className=" bg-primary text-white hover:bg-secondary"
          >
            Activer Mode Auteur
          </Button>
          <Button
            type="submit"
            className="bg-primary text-white hover:bg-secondary"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
