import { Link } from "react-router-dom";
import React, { useState } from "react";
import Logo from "../components/UI/Logo/Logo.jsx";
import Button from "../components/UI/Button/Button.jsx";
import apiFetch from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    apiFetch("login", "POST", { email, password }, setError)
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('blogs', JSON.stringify(data.blogs));
        localStorage.setItem('my_blogs', JSON.stringify(data.my_blogs));
        localStorage.setItem('user-role', data.user.type);
        localStorage.setItem('user-id', data.user.id);
        localStorage.setItem('categories', JSON.stringify(data.categories));
        localStorage.setItem('tags', JSON.stringify(data.tags));
        if(data.user.type === 'admin') navigate("/admin");
        else if(data.user.type === 'author') navigate("/author-dashboard");
        else navigate("/");
      })
      .catch((err) => console.error(err));
  }
  return (
    <main className="flex min-h-screen container mx-auto">
      <div className="flex-1 flex flex-col items-start justify-between p-8 md:p-14 ">
        <Link to="/">
          <Logo />
        </Link>

        <div className=" w-full mx-auto flex flex-col  items-center">
          <h1 className="text-2xl font-medium self-start">Sign in</h1>
          <div className="h-8 text-red-500">{error && error}</div>
          <form className="space-y-6  w-full" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="sr-only">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address *"
                required
                className="w-full px-4 py-3 border border-[#d9d9d9] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="sr-only">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password *"
                required
                className="w-full px-4 py-3 border border-[#d9d9d9] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
              />
            </div>

            <div className="flex items-center">
              <Button type="submit" className=" bg-primary text-black">
                Login
              </Button>
              <a
                href="#"
                className="ml-6 text-sm text-[#232536] hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </form>

          <Button className=" bg-black text-white mt-6 w-full">
            <Link to="/signup">Create new account</Link>
          </Button>
        </div>
        <div className="flex mx-auto space-x-4 text-sm text-secondary pt-8">
          <a href="#" className="hover:underline">
            Terms and conditions
          </a>
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
        </div>
      </div>

      <div className="flex-1 md:px-10 lg:px-20 hidden md:flex items-center">
        <img
          src="/images/login.png"
          alt="Blogger travel inspiration"
          className="w-full object-cover"
        />
      </div>
    </main>
  );
}
