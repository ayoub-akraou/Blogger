import React, { useEffect, useState } from "react";
import Button from "../components/UI/Button/Button";
import BlogCard from "../components/UI/Cards/BlogCard.jsx";
import AuthorCard from "../components/UI/Cards/AuthorCard.jsx";
import TestimonialCard from "../components/UI/Cards/TestimonialCard.jsx";
import apiFetch from "../api/api.js";

export default function Home() {
  const [recentlyPostedBlogs, setRecentlyPostedBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [topAuthors, setTopAuthors] = useState([]);
  const [category, setCategory] = useState();
  useEffect(() => {
    apiFetch("blogs/3", "GET", null)
      .then((data) => {
        setRecentlyPostedBlogs(data.blogs);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    apiFetch("popular-blogs/3", "GET", null)
      .then((data) => {
        setPopularBlogs(data.blogs);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  
  useEffect(() => {
    apiFetch("top-authors/4", "GET", null)
      .then((data) => {
        setTopAuthors(data.authors);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    apiFetch("categories/last", "GET", null)
      .then((data) => {
        setCategory(data.category);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <>
      <Hero />
      <RecentlyPosted blogs={recentlyPostedBlogs} />
      <PopularBlogs blogs={popularBlogs}/>
      <TopAuthors authors={topAuthors}/>
      <NewCategory category={category}/>
      <Testimonials />
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

function RecentlyPosted({ blogs }) {
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
      <div className="min-h-64 grid grid-cols-1 gap-4 min-[500px]:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard
            className="flex-1"
            key={blog.id}
            id={blog.id}
            image={blog.image}
            avatar={blog?.author?.image}
            title={blog.title}
            date={blog.created_at}
            author={blog?.author?.name}
            content={blog.content}
            category={blog?.category?.name}
          />
        ))}
      </div>
    </section>
  );
}

function PopularBlogs({blogs}) {
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
      <div className="min-h-64 grid grid-cols-1 gap-4 min-[500px]:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            image={blog.image}
            avatar={blog.author.image}
            title={blog.title}
            date={blog.created_at}
            author={blog.author.name}
            content={blog.content}
            category={blog.category.name}
          />
        ))}
      </div>
    </section>
  );
}

function TopAuthors({authors}) {
  return (
    <section className="pb-32 pt-8 container mx-auto px-6">
      <h2 className="text-2xl font-semibold text-center mb-10">
        Our Top Authors
      </h2>
      <div className="flex justify-between items-center max-w-screen-md mx-auto gap-8 flex-wrap sm:gap-6 ">
        {authors.map(author => <AuthorCard key={author.id} name={author.name} image={author.author} />)}
        </div>
    </section>
  );
}

function NewCategory({
  category
}) {
  return (
    <section className="relative py-32 w-full bg-black bg-[url('/public/images/new-category.png')] bg-center bg-cover">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-md mx-auto bg-black/30 backdrop-blur-sm p-10 rounded-lg text-center text-white">
          <p className="text-sm font-medium mb-2">NEW CATEGORY</p>
          <h2 className="text-4xl font-bold mb-4">{category?.name}</h2>
          <p className="text-sm mb-6">{category?.description}</p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Discover
          </Button>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="m-28 py-16 bg-yellow-50">
      <div className="container mx-auto px-6 max-w-screen-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="flex flex-col justify-center sm:border-r border-gray-500 p-4 sm:p-8 sm:pr-16">
            <h3 className="text-sm font-medium uppercase mb-2">TESTIMONIALS</h3>
            <h2 className="text-4xl font-bold mb-4 sm:mb-8">
              What people say about our blog
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
          </div>
          <TestimonialCard />
        </div>
      </div>
    </section>
  );
}
