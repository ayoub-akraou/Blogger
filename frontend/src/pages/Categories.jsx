import React from "react";
import CategoryCard from "../components/UI/Cards/CategoryCard";

export default function Categories() {
  const arr = Array.from({ length: 9 }, (_, i) => i + 1);
  return (
    <div className="container mx-auto px-4 pb-16 sm:pb-32 py-32">
      <h1 className="text-4xl font-bold text-center mb-12">
        Discover our categories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <!-- Business Category --> */}
        {arr.map((i) => (
          <CategoryCard
            image="images/new-category.png"
            key={i}
            className={`col-span-full ${i % 3 === 0 ? "" : "sm:!col-span-1"}`}
          />
        ))}
      </div>
    </div>
  );
}
