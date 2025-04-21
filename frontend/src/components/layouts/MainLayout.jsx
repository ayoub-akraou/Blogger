import React from "react";
import Header from "./Header/Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
