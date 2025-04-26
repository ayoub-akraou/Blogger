import React from 'react'

export default function CategoryCard({ className, image = "https://v0.dev/placeholder.svg?height=600&width=800", name = "Business", description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', path }) {
  return (
    <div className={`${className} relative h-80 overflow-hidden group`}>
      <div
        className={`absolute inset-0 bg-cover bg-center`}
        style={{ backgroundImage: `url(/${image})` }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-around  text-white p-6 text-center">
        <h2 className="text-5xl font-bold mb-4">{name}</h2>
        <p className="mb-6 max-w-md">{description}</p>
        <div >
          <a href={path} className="text-sm hover:underline">
            Blog &gt; {name}
          </a>
        </div>
      </div>
    </div>
  );
}