import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import AuthorCard from "../components/UI/Cards/AuthorCard";
import StatsCard from "../components/UI/Cards/StatsCard.jsx";
import AtSign from "../components/Icons/AtSign.jsx";
import UsersIcon from "../components/Icons/UsersIcon.jsx";
import BlogsIcon from "../components/Icons/BlogsIcon.jsx";
import Eye from "../components/Icons/Eye.jsx";

export default function Stats() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["Policy", "Economy", "IT", "Military", "Sport", "Author"],
      datasets: [
        {
          data: [30, 25, 15, 10, 12, 8],
          backgroundColor: [
            "#ffd050", // Policy - jaune
            "#ff3b30", // Economy - rouge
            "#34c759", // IT - vert
            "#007aff", // Military - bleu
            "#592ea9", // Sport - violet
            "#a2845e", // Author - marron
          ],
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
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* <!-- Stats Cards --> */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {/* <!-- Total User --> */}
          <StatsCard title="Total User" count={31690} className="[&_.icon]:bg-indigo-100">
            <UsersIcon className="stroke-indigo-600" />
          </StatsCard>
          {/* <!-- Total Authors --> */}
          <StatsCard title="Total Authors" count={40689} className="[&_.icon]:bg-pink-100">
            <AtSign className="stroke-pink-600"/>
          </StatsCard>
          {/* <!-- Total Blogs --> */}
          <StatsCard title="Total Blogs" count={10811} className="[&_.icon]:bg-green-100">
            <BlogsIcon className="stroke-green-600"/>
          </StatsCard>

          {/* <!-- Total Views --> */}
          <StatsCard title="Total Views" count={32689} className="[&_.icon]:bg-yellow-100">
            <Eye className="stroke-yellow-600"/>
          </StatsCard>
        </div>

        {/* <!-- Main Content --> */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <!-- Chart Section --> */}
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-xl font-bold mb-6">Total Blogs By Category</h2>
            <div class="flex justify-center mb-8">
              {/* <!-- Chart.js Canvas --> */}
              <div style={{ width: "300px", height: "300px" }}>
                <canvas ref={chartRef} id="blogCategoryChart" />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div class="flex items-center">
                <div class="w-6 h-6 bg-yellow-300 mr-2"></div>
                <span>Policy</span>
              </div>
              <div class="flex items-center">
                <div class="w-6 h-6 bg-red-500 mr-2"></div>
                <span>Economy</span>
              </div>
              <div class="flex items-center">
                <div class="w-6 h-6 bg-green-500 mr-2"></div>
                <span>IT</span>
              </div>
              <div class="flex items-center">
                <div class="w-6 h-6 bg-blue-500 mr-2"></div>
                <span>Military</span>
              </div>
              <div class="flex items-center">
                <div class="w-6 h-6 bg-purple-600 mr-2"></div>
                <span>Sport</span>
              </div>
              <div class="flex items-center">
                <div class="w-6 h-6 bg-amber-700 mr-2"></div>
                <span>Author</span>
              </div>
            </div>
          </div>

          {/* <!-- Top Authors Section --> */}
          <div class="space-y-6">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h2 class="text-xl font-bold mb-6">Top authors</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AuthorCard className="!p-2 [&>img]:w-20 [&>img]:h-20 min-w-[120px]" />
                <AuthorCard className="!p-2 [&>img]:w-20 [&>img]:h-20 min-w-[120px]" />
                <AuthorCard className="!p-2 [&>img]:w-20 [&>img]:h-20 min-w-[120px]" />
              </div>
            </div>
            {/* <!-- Top Blogs Section --> */}
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h2 class="text-xl font-bold mb-6">Top Blogs</h2>
              <div class="space-y-4">
                {/* <!-- Blog Item 1 --> */}
                <div class="flex justify-between items-center p-4 border rounded-lg">
                  <div class="font-medium">Blog 1 title lorem epsilum</div>
                  <div class="text-amber-500">1,309,182 views</div>
                </div>
                {/* <!-- Blog Item 2 --> */}
                <div class="flex justify-between items-center p-4 border rounded-lg">
                  <div class="font-medium">Blog 1 title lorem epsilum</div>
                  <div class="text-gray-300">1,309,182 views</div>
                </div>
                {/* <!-- Blog Item 3 --> */}
                <div class="flex justify-between items-center p-4 border rounded-lg">
                  <div class="font-medium">Blog 1 title lorem epsilum</div>
                  <div class="text-amber-500">1,309,182 views</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
