import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import AuthorCard from "../components/UI/Cards/AuthorCard";
import StatsCard from "../components/UI/Cards/StatsCard.jsx";
import AtSign from "../components/Icons/AtSign.jsx";
import UsersIcon from "../components/Icons/UsersIcon.jsx";
import BlogsIcon from "../components/Icons/BlogsIcon.jsx";
import Eye from "../components/Icons/Eye.jsx";
import apiFetch from "../api/api.js";
import { Link } from "react-router-dom";

export default function Stats() {
  const [stats, setStats] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const categories = stats?.categories;
  console.log(categories);
  
  const topAuthors = stats?.top_three_authors;
  const topBlogs = stats?.top_three_blogs;

  useEffect(() => {
    apiFetch("admin/statistics", "GET", null)
      .then((data) => {
        setStats(data.stats);
        setStats((prev) => {
          return prev;
        });
      })
      .catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const data = {
      labels: categories?.map((c) => c.name),
      datasets: [
        {
          data: categories?.map((c) => c.total_blogs),
          backgroundColor: categories?.map((c) => c.color),
          borderWidth: 0,
          hoverOffset: 10,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: true,
      cutout: "50%", // Taille du trou au milieu (pour l'effet donut)
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw || 0;
              const total = context.chart.data.datasets[0].data.reduce(
                (a, b) => a + b,
                0
              );
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${percentage}% (${value})`;
            },
          },
        },
      },
    };

    if (chartInstance.current) chartInstance.current.destroy();
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data,
      options,
    });
    return () => chartInstance.current.destroy();
  }, [stats]);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* <!-- Stats Cards --> */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {/* <!-- Total User --> */}
          <StatsCard
            title="Total User"
            count={stats?.total_users}
            className="[&_.icon]:bg-indigo-100"
          >
            <UsersIcon className="stroke-indigo-600" />
          </StatsCard>
          {/* <!-- Total Authors --> */}
          <StatsCard
            title="Total Authors"
            count={stats?.total_authors}
            className="[&_.icon]:bg-pink-100"
          >
            <AtSign className="stroke-pink-600" />
          </StatsCard>
          {/* <!-- Total Blogs --> */}
          <StatsCard
            title="Total Blogs"
            count={stats?.total_blogs}
            className="[&_.icon]:bg-green-100"
          >
            <BlogsIcon className="stroke-green-600" />
          </StatsCard>

          {/* <!-- Total Views --> */}
          <StatsCard
            title="Total Views"
            count={stats?.total_views}
            className="[&_.icon]:bg-yellow-100"
          >
            <Eye className="stroke-yellow-600" />
          </StatsCard>
        </div>

        {/* <!-- Main Content --> */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <!-- Chart Section --> */}
          <div class="bg-white p-6 rounded-lg shadow-md border-gray-50 border">
            <h2 class="text-xl font-bold mb-6">Total Blogs By Category</h2>
            <div class="flex justify-center mb-8">
              {/* <!-- Chart.js Canvas --> */}
              <div style={{ width: "300px", height: "300px" }}>
                <canvas ref={chartRef} id="blogCategoryChart" />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              {categories?.map((category) => (
                <div class="flex items-center">
                  <div
                    class="w-7 h-7 mr-1.5 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm leading-none">
                    {category.name}: {category.total_blogs}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* <!-- Top Authors Section --> */}
          <div class="space-y-6  shadow-md border-gray-50 border">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h2 class="text-xl font-bold mb-6">Top authors</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topAuthors?.map((author) => (
                  <AuthorCard
                    className="!p-2 [&>img]:w-20 [&>img]:h-20 min-w-[100px]"
                    key={author.id}
                    image={author.image}
                    name={author.name}
                  />
                ))}
              </div>
            </div>
            {/* <!-- Top Blogs Section --> */}
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h2 class="text-xl font-bold mb-6">Top Blogs</h2>
              <div class="space-y-4">
                {topBlogs?.map((blog) => (
                  <Link to={`/blog-detail/${blog.id}`} key={blog.id} className="p-4 border rounded-lg block ">
                    <div class="flex justify-between items-center ">
                      <div class="font-medium">{blog.title}</div>
                      <div class="text-amber-500">{blog.views} views</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
