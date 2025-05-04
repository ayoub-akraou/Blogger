import React from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import apiFetch from "../../../api/api";

export default function LogoutButton({ className }) {
  const navigate = useNavigate();

  function handleLogout() {
    console.log("logout");

    apiFetch(`logout`, "POST", null)
      .then(() => localStorage.clear())
      .catch((err) => console.error(err));
    navigate("/login");
  }

  return (
    <Button
      onClick={handleLogout}
      type="button"
      className={
        "flex gap-2 text-sm bg-secondary !text-white sm:!text-secondary sm:bg-white " +
        className
      }
    >
      <span>Logout</span> <LogOut className="w-5 h-5" />
    </Button>
  );
}
