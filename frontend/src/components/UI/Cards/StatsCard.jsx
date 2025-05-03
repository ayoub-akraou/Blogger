import React from "react";

export default function StatsCard({className, title, count, children}) {
  return (
    <div className={`bg-white rounded-lg p-6 flex items-start justify-between border border-gray-50 shadow-md ${className}`}>
      <div>
        <h3 className="text-gray-500 font-medium">{title}</h3>
        <p className="text-3xl font-bold mt-2">{count}</p>
      </div>
      <div className="icon p-3 rounded-full">
       {children}
      </div>
    </div>
  );
}
