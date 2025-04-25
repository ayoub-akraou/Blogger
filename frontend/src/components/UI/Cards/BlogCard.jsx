import React from "react";

export default function BlogCard({
  className,
  image,
  avatar,
  category = "TECH",
  author,
  date,
  readTime,
}) {
  return (
    <div className={`${className} bg-white`}>
      <div className="bg-gray-100 text-xs font-medium px-2 py-1 inline-block mb-2">
        {category}
      </div>
      <h3 className="font-semibold text-lg mb-2">
        set video playback speed with javascript
      </h3>
      <div className="mb-4">
        <img
          src={image}
          alt="Blog post image"
          className="w-full h-80 min-[500px]:h-56 object-cover"
        />
      </div>
      <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
        <img src={avatar} alt="Author" className="w-6 h-6 rounded-full" />
        <span>Jenny Rose</span>
        <span>•</span>
        <span>21 December 2023</span>
        <span>•</span>
        <span>3 min. to read</span>
      </div>
      <p className="text-xs text-gray-500">
        Did you come here for something in particular or just general
        Riker-bashing? And blowing into...
      </p>
    </div>
  );
}
