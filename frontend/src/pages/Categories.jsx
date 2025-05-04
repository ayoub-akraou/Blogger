import React, { useEffect, useState } from "react";
import CategoryCard from "../components/UI/Cards/CategoryCard";
import apiFetch from "../api/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    apiFetch("categories").then((data) => {
      setCategories(data.categories)      
    }).catch((err) => {
      console.error(err);
    });
  }, []);
  return (
    <div className="container mx-auto px-4 pb-16 sm:pb-32 py-32">
      <h1 className="text-4xl font-bold text-center mb-12">
        Discover our categories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <!-- Business Category --> */}
        {categories.map((category, i) => (
          <CategoryCard
            category= {category}
            key={category.id}
            className={`col-span-full ${i % 3 === 0 ? "" : "sm:!col-span-1"}`}
          />
        ))}
      </div>
    </div>
  );
}
