import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import Like from "../components/Icons/Like";
import { Viewer } from "@toast-ui/react-editor";
import apiFetch from "../api/api";
import Eye from "../components/Icons/Eye";
export default function BlogDetail() {
  const { id } = useParams();
  const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
  const myBlogs = JSON.parse(localStorage.getItem("my_blogs") || "[]");
  const [blog, setBlog] = useState(
    [...blogs, ...myBlogs].find((blog) => blog.id === parseInt(id)) || {}
  );

  useEffect(() => {
    apiFetch(`blogs/${blog.id}/increment-views`, "PATCH", null)
      .then((data) => {
        const updatedBlog = {
          ...blog,
          views: data.views,
        };
        setBlog(updatedBlog);
        localStorage.setItem(
          "blogs",
          JSON.stringify(
            blogs.map((b) => (b.id == updatedBlog.id ? updatedBlog : b))
          )
        );
        localStorage.setItem(
          "my_blogs",
          JSON.stringify(
            myBlogs.map((b) => (b.id == updatedBlog.id ? updatedBlog : b))
          )
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const category = JSON.parse(localStorage.getItem("categories") || "[]").find(
    (category) => category.id === parseInt(blog.category_id)
  );

  if (!blog) {
    return <div>Blog not found</div>;
  }

  function toggleLike() {
    apiFetch(`blogs/${blog.id}/like`, "POST", null)
      .then((data) => {
        const updatedBlog = {
          ...blog,
          likes: data.likes,
          dislikes: data.dislikes,
        };
        setBlog(updatedBlog);
        localStorage.setItem(
          "blogs",
          JSON.stringify(
            blogs.map((b) => (b.id == updatedBlog.id ? updatedBlog : b))
          )
        );
      })
      .catch((err) => console.error(err));
  }

  function toggleDislike() {
    apiFetch(`blogs/${blog.id}/dislike`, "POST", null)
      .then((data) => {
        const updatedBlog = {
          ...blog,
          likes: data.likes,
          dislikes: data.dislikes,
        };
        setBlog(updatedBlog);
        localStorage.setItem(
          "blogs",
          JSON.stringify(
            blogs.map((b) => (b.id == updatedBlog.id ? updatedBlog : b))
          )
        );
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      {blog.image && (
        <div className="mb-6 h-64 mt-16 relative">
          <img
            src={blog.image}
            alt={blog.title}
            className=" object-cover w-full h-full"
          />
          <p className="absolute bg-white bottom-2 left-2 font-semibold mb-2 border text-sm text-center border-gray-700 px-2 py-1 rounded-sm text-gray-700">
            {category.name}
          </p>
        </div>
      )}

      <div className="max-w-4xl mx-auto  pb-20">
        <h1 className="pr-20 sm:text-6xl text-4xl uppercase font-medium mb-4 text-black italic">
          {blog.title}
        </h1>

        {/* Afficher le contenu avec le Viewer de Toast UI */}
        <div className="mt-4">
          <Viewer
            initialValue={blog.content}
            height="auto"
            className="markdown-body"
            plugins={[]}
          />
        </div>

        {/* Afficher les tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`px-2 py-1 rounded-full text-sm bg-white font-medium border`}
                  style={{ color: tag.color, borderColor: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="">
          <div className="flex gap-6 items-center mt-8">
            <button
              onClick={toggleLike}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-blue-50 transition-colors duration-200"
              aria-label="J'aime ce blog"
            >
              <Like
                type="like"
                className="transition-transform hover:scale-110"
              />
              <span className="font-medium text-gray-700">
                {blog.likes || 0}
              </span>
            </button>
            <button
              onClick={toggleDislike}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-red-50 transition-colors duration-200"
              aria-label="Je n'aime pas ce blog"
            >
              <Like
                type="dislike"
                className="transition-transform hover:scale-110"
              />
              <span className="font-medium text-gray-700">
                {blog.dislikes || 0}
              </span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-red-50 transition-colors duration-200"
              aria-label="Je n'aime pas ce blog"
            >
              <Eye className="w-8 h-8" />
              <span className="font-medium text-gray-700">
                {blog.views || 0}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
