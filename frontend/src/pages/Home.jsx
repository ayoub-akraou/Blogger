import React from "react";
import Button from "../components/UI/Button/Button";
import BlogCard from "../components/UI/Cards/BlogCard.jsx";
import AuthorCard from "../components/UI/Cards/AuthorCard.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <RecentlyPosted />
      <PopularBlogs />
      <TopAuthors />
    </>
  );
}

function Hero() {
  return (
    <section
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 86%)",
        backgroundImage: "url('/images/home-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative h-[60vh] sm:h-screen w-full bg-black/15"
    >
      <div className="relative z-20 px-6 py-16 h-full flex items-center  container mx-auto">
        <div className="text-white bg-black/5">
          <p className="text-xs font-semibold tracking-wider mb-2">
            POSTED ON STARTUP
          </p>
          <h1 className="text-4xl font-bold mb-4 max-w-xl">
            Step-by-step guide to choosing great font pairs
          </h1>
          <div className="flex items-center space-x-4 text-sm mb-6">
            <span>Olivia Rhye</span>
            <span>•</span>
            <span>May 23, 2023</span>
          </div>
          <p className="text-sm max-w-xl mb-6">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6">
            Discover
          </Button>
        </div>
      </div>
    </section>
  );
}

function RecentlyPosted() {
  return (
    <section className="py-12 container mx-auto px-24 min-[500px]:px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">
          <span className="bg-primary rounded px-2 py-1 mr-1 leading-none text-white">
            Recently
          </span>
          Posted
        </h2>
      </div>
      <div className="flex flex-col justify-between gap-4 min-[500px]:flex-row">
        <BlogCard image="/images/home-hero.png" avatar="/images/avatar.png" />
        <BlogCard image="/images/home-hero.png" avatar="/images/avatar.png" />
        <BlogCard image="/images/home-hero.png" avatar="/images/avatar.png" />
      </div>
    </section>
  );
}

function PopularBlogs() {
  return (
    <section className="py-12 container mx-auto px-24 min-[500px]:px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">
          <span className="bg-primary rounded px-2 py-1 mr-1 leading-none text-white">
            Popular
          </span>
          Blogs
        </h2>
      </div>
      <div className="flex flex-col justify-between gap-4 min-[500px]:flex-row">
        <BlogCard image="/images/home-hero.png" avatar="/images/avatar.png" />
        <BlogCard image="/images/home-hero.png" avatar="/images/avatar.png" />
        <BlogCard image="/images/home-hero.png" avatar="/images/avatar.png" />
      </div>
    </section>
  );
}

function TopAuthors() {
  return (
    <section className="pb-32 pt-8 container mx-auto px-6">
      <h2 className="text-2xl font-semibold text-center mb-10">
        Our Top Authors
      </h2>
      <div className="flex justify-between items-center max-w-screen-md mx-auto gap-8 flex-wrap sm:gap-6 ">
        <AuthorCard />
        <AuthorCard />
        <AuthorCard />
        <AuthorCard />
      </div>
    </section>
  );
}
}
