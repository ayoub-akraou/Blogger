import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({
  id,
  className,
  image,
  avatar,
  category = "TECH",
  title,
  author,
  date,
  content,
}) {
  return (
    <Link
      to={`/blog-detail/${id}`}
      className={`${className} bg-white flex-1 block`}
    >
      <div>
        <div className="bg-gray-100 text-xs font-medium px-2 py-1 inline-block mb-2">
          {category}
        </div>
        <h3 className="font-semibold text-lg mb-2">
          {title?.length > 30 ? (
            <span>
              {title.slice(0, 25)}
              <span className="hidden sm:inline">
                {title.slice(25, 30)}
              </span>
              ...
            </span>
          ) : (
            title
          )}
        </h3>
        <div className="mb-4">
          <img
            src={image || "/images/blog-card.png"}
            alt="Blog post image"
            className="w-full h-80 min-[500px]:h-56 object-cover"
          />
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
          <img
            src={avatar || "/images/avatar.png"}
            alt="Author"
            className="w-6 h-6 rounded-full"
          />
          <span>{author}</span>
          <span>•</span>
          <span>{date?.slice(0, 10)}</span>
        </div>
        <p className="text-xs text-gray-500">
          {content?.slice(0, 100) + "..."}
        </p>
      </div>
    </Link>
  );
}
