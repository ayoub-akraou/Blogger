import React from "react";
import { Link } from "react-router-dom";

export default function ProfileAvatar({ className }) {
  const image = JSON.parse(localStorage.getItem("user"))?.image;
  return (
    <Link to="/profile" className={className + " w-12 h-12 rounded-full overflow-hidden"} title="Profile"><img src={image || "/images/avatar.png"} alt="avatar" className="w-full h-full object-cover"/></Link>
  )
}

