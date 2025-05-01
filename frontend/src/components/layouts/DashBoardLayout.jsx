import React from "react";
import LogoIcon from "../Icons/Logo.jsx";
import Logo from "../UI/Logo/Logo";
import UsersIcon from "../Icons/UsersIcon.jsx";
import BlogsIcon from "../Icons/BlogsIcon.jsx";
import CategoriesIcon from "../Icons/CategoriesIcon.jsx";
import TagsIcon from "../Icons/TagsIcon.jsx";
import StatsIcon from "../Icons/StatsIcon.jsx";
import LogoutIcon from "../Icons/LogoutIcon.jsx";
import ProfileAvatar from "../UI/ProfileAvatar.jsx";
import Button from "../UI/Button/Button.jsx";
import { NavLink, Outlet } from "react-router-dom";
import RotateDeviceModal from "../UI/modals/RotateDevice.jsx";

export default function DashBoardLayout({ children }) {
  return (
    <html lang="en" className="sm:text-[10px] md:text-[13px] lg:text-[16px]">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blogger Admin Dashboard</title>
      </head>
      <body className="bg-gray-100">
        <RotateDeviceModal />
        <div className="flex min-h-screen">
          <p className="text-"></p>
          {/* <!-- Sidebar --> */}
          <div className="w-fit md:w-56 min-h-full bg-white border-r border-gray-200 flex flex-col">
            {/* <!-- Logo --> */}
            <Logo className="mx-6 my-4 hidden md:block" />
            <LogoIcon className="mx-3 md:mx-6 my-4 block md:hidden" />

            {/* <!-- Navigation --> */}
            <nav className="flex-1 flex gap-3 flex-col mt-6">
              <SidebarLink href="" label="users">
                <UsersIcon />
              </SidebarLink>
              <SidebarLink href="blogs" label="blogs">
                <BlogsIcon />
              </SidebarLink>
              <SidebarLink href="categories" label="categories">
                <CategoriesIcon />
              </SidebarLink>
              <SidebarLink href="tags" label="tags">
                <TagsIcon />
              </SidebarLink>
              <SidebarLink href="stats" label="statistics">
                <StatsIcon />
              </SidebarLink>
            </nav>

            {/* <!-- Logout --> */}
            <Button className="my-6 mx-auto flex items-center bg-red-50 !text-red-600">
              <LogoutIcon className="h-5 w-5" />
              <span className="ml-3 font-medium  hidden md:block">logout</span>
            </Button>
          </div>

          {/* <!-- Main Content --> */}
          <div className="flex-1">
            {/* <!-- Header --> */}
            <header className="bg-white shadow-sm">
              <div className="flex justify-end items-center px-6 py-3">
                <div className="flex items-center">
                  <div className="mr-3 text-right">
                    <div className="text-sm font-medium text-gray-900">
                      Moni Roy
                    </div>
                    <div className="text-xs text-gray-500">Admin</div>
                  </div>
                  <ProfileAvatar />
                </div>
              </div>
            </header>

            {/* <!-- Content --> */}
            <main className="px-6 py-2">
              <Outlet />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

function SidebarLink({ children, href, label }) {
  return (
    <NavLink
      to={href}
      end
      className={({ isActive }) =>
        `flex justify-center md:justify-normal items-center gap-3 mx-2 md:mx-8 px-1 md:px-6 py-1 md:py-2 text-gray-700 hover:bg-primary hover:text-white rounded-lg ${
          isActive ? "bg-primary text-white font-medium" : ""
        }`
      }
    >
      {children}
      <span className="hidden md:block">{label}</span>
    </NavLink>
  );
}
