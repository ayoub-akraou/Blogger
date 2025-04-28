import React from "react";
import { Link } from "react-router-dom";

export default function ProfileAvatar({ className }) {
  return (
    <Link to="/profile" className={className + " w-12 h-12 rounded-full"} title="Profile"><img src="/images/avatar.png" alt="avatar"/></Link>
  )
}

