import React from "react";
import { useParams } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";

export default function BlogDetail() {
  const { id } = useParams();
  const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
  const blog = blogs.find((blog) => blog.id === parseInt(id));

  const category = JSON.parse(localStorage.getItem("categories") || "[]").find(
    (category) => category.id === parseInt(blog.category_id)
  );

  if (!blog) {
    return <div>Blog not found</div>;
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
      </div>
    </>
  );
}
