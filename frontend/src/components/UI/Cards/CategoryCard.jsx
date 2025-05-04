import React from 'react'

export default function CategoryCard({ className, category }) {
  return (
    <div className={`${className} relative h-80 overflow-hidden group`}>
      <div
        className={`absolute inset-0 bg-cover bg-center`}
        style={{ backgroundImage: `url(${category.image || "/images/new-category.png"})` }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-around  text-white p-6 text-center">
        <h2 className="text-5xl font-bold mb-4">{category.name}</h2>
        <p className="mb-6 max-w-md">{category.description}</p>
        <div >
          <a href="#" className="text-sm hover:underline">
            Blog &gt; {category.name}
          </a>
        </div>
      </div>
    </div>
  );
}