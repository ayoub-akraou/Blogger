import React from "react";
import Cheveron from "../../Icons/Cheveron";

export default function TestimonialCard({avatar = "/images/avatar.png",name = "Floyd Miles", location = "New York, USA",content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}) {
  return (
    <div className="p-4 relative sm:p-8 sm:pl-16 ">
      <p className="text-gray-600 mb-8 font-medium">{content}</p>
      <div className="flex items-center">
        <img
          src={avatar}
          alt={avatar}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 flex items-center space-x-4">
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Cheveron className="text-white" orientation="left" />
        </button>
        <button className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
          <Cheveron className="text-white" orientation="right" />
        </button>
      </div>
    </div>
  );
}
