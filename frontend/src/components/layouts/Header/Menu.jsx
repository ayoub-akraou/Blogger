import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button.jsx";
import Logo from "../../UI/Logo/Logo.jsx";
import Close from "../../Icons/Close.jsx";
import Avatar from "../../Icons/Avatar.jsx";
import ControlPanel from "../../Icons/ControlPanel.jsx";

export default function Menu({ className, isOpened, onClick }) {
  return (
    <ul
      className={`${className} ${
        isOpened ? "flex" : "hidden"
      } bg-white sm:bg-inherit  sm:text-white text-secondary sm:flex items-center absolute sm:static top-0 right-0 w-screen sm:w-auto h-screen sm:h-auto flex-col sm:flex-row p-4 sm:p-0  gap-10 sm:gap-5`}
    >
      <li className="absolute top-5 right-12 sm:hidden" onClick={onClick}>
        <Close />
      </li>
      <li className="-order-3 sm:hidden">
          <Logo />
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
      <li>
        <Link to="/about-us">About us</Link>
      </li>
      <li>
        <Link to="/categories">Categories</Link>
      </li>
      <li>
        <Link to="/contact-us">Contact us</Link>
      </li>
      <li className="-order-2 sm:order-none">
        <Button className="bg-primary">
          <Link to="/author-dashboard" className="flex items-center gap-2"><Avatar /> Dashboard</Link>
        </Button>
      </li>
      <li className="-order-2 sm:order-none">
        <Button className="bg-primary">
          <Link to="/admin" className="flex items-center gap-2"><ControlPanel /> Dashboard</Link>
        </Button>
      </li>
      <li className="-order-2 sm:order-none">
        <Button className="bg-primary">
          <Link to="/login">LOGIN</Link>
        </Button>
      </li>
      <li className="-order-1 sm:order-none">
        <Button className="bg-secondary !text-white sm:!text-secondary sm:bg-white">
          <Link to="/signup">SIGN UP</Link>
        </Button>
      </li>
    </ul>
  );
}
