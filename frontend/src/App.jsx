import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Categories from "./pages/Categories.jsx";
import Blogs from "./pages/Blogs.jsx";
import NotFound from "./pages/404.jsx";
import Profile from "./pages/Profile.jsx";
// author dashboard
import AuthorDashboard from "./pages/AuthorDashboard.jsx";
import BlogsEditor from "./pages/BlogsEditor.jsx";
// Admin
import DashBoardLayout from "./components/layouts/DashBoardLayout.jsx";
import UsersTable from "./pages/UsersTable.jsx";
import BlogsTable from "./pages/BlogsTable.jsx";
import CategoriesTable from "./pages/CategoriesTable.jsx";
import TagsTable from "./pages/TagsTable.jsx";
import Stats from "./pages/Stats.jsx";
import UpdateBlogsEditor from "./pages/UpdateBlogsEditor.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="/about-us" element={<AboutUs />} /> */}
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blogs/:query?" element={<Blogs />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/author-dashboard" element={<AuthorDashboard />} />
          <Route path="/blogs-editor" element={<BlogsEditor  />} />
          <Route path="/update-blog-editor/:id" element={<UpdateBlogsEditor  />} />
          <Route path="/blog-detail/:id" element={<BlogDetail />} />
        </Route>
        <Route path="/admin" element={<DashBoardLayout />}>
          <Route index element={<UsersTable />} />
          <Route path="blogs" element={<BlogsTable />} />
          <Route path="categories" element={<CategoriesTable />} />
          <Route path="tags" element={<TagsTable />} />
          <Route path="stats" element={<Stats />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
