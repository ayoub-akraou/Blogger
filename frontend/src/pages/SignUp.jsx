import React, { useState } from "react";
import Logo from "../components/UI/Logo/Logo";
import Button from "../components/UI/Button/Button";
import { Link } from "react-router-dom";
import apiFetch from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const password_confirmation = data.get("password_confirmation");

    apiFetch(
      "register",
      "POST",
      {
        name,
        email,
        password,
        password_confirmation,
      },
      setError
    )
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("blogs", JSON.stringify(data.blogs));
          localStorage.setItem("user-role", data.user.type);
          localStorage.setItem("user-id", data.user.id);
          localStorage.setItem("categories", JSON.stringify(data.categories));
          localStorage.setItem("tags", JSON.stringify(data.tags));
          if (data.user.type === "admin") navigate("/admin");
          else if (data.user.type === "author") navigate("/author-dashboard");
          else navigate("/");
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="min-h-screen flex justify-between">
      <div className="form mx-auto flex-[3] px-14">
        <div className="w-full max-w-md pt-6">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <h1 className="text-[#232536] text-2xl font-medium mb-6 text-center">
          Sign up to Blogger
        </h1>

        <form className="space-y-2.5 max-w-md mx-auto" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex-1">
            <label htmlFor="name">Fullname</label>
            <input
              type="text"
              placeholder="Fullname"
              name="name"
              className="w-full px-4 py-2 border border-[#e2e2ea] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-[#92929d] mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="dev@domain.com"
              className="w-full px-4 py-2 border border-[#e2e2ea] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-[#92929d] mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="****************"
              className="w-full px-4 py-2 border border-[#e2e2ea] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
            />
          </div>

          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-sm text-[#92929d] mb-1"
            >
              Confirm Password
            </label>
            <input
              name="password_confirmation"
              type="password"
              placeholder="****************"
              className="w-full px-4 py-2 border border-[#e2e2ea] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
            />
          </div>

          <Button type="submit" className="w-full bg-primary !mb-2">
            SIGN UP
          </Button>
          <Link to="/login">
            <Button type="button" className="w-full bg-secondary text-white">
              BACK TO LOGIN
            </Button>
          </Link>
        </form>

        <div className="flex justify-center space-x-4 mt-8 text-sm text-[#232536]">
          <a href="#" className="hover:underline">
            Terms and conditions
          </a>
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
        </div>
      </div>
      <div className="image max-h-screen h-full flex-[2]">
        <img
          src="/images/signup.png"
          alt=""
          className="object-cover min-w-full h-screen"
        />
      </div>
    </div>
  );
}
