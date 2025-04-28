import React from "react";
import Button from "../components/UI/Button/Button";

export default function ContactUs() {
  return (
    <div className="container mx-auto px-6 py-32 pb-16 sm:pb-32 max-w-3xl">
      {/* <!-- Header Section --> */}
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-purple font-medium uppercase tracking-wider mb-4">
          CONTACT US
        </h2>
        <h1 className="text-secondary text-4xl md:text-5xl font-bold mb-6">
          Let's Start a Conversation
        </h1>
        <p className="text-lightGray max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim.
        </p>
      </div>

      {/* <!-- Info Section --> */}
      <div className="bg-lightPurple rounded-lg p-8 mb-12 grid md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <h3 className="text-secondary font-medium mb-6">Working hours</h3>
          <h4 className="text-secondary text-xl font-bold mb-2">
            Monday To Friday
          </h4>
          <p className="text-secondary text-lg font-medium mb-2">
            9:00 AM to 8:00 PM
          </p>
          <p className="text-gray">Our Support Team is available 24/7</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-secondary font-medium mb-6">Contact Us</h3>
          <h4 className="text-secondary text-xl font-bold mb-2">
            020 7993 2905
          </h4>
          <p className="text-gray">hello@finsweet.com</p>
        </div>
      </div>

      {/* <!-- Contact Form --> */}
      <div className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray/30 h-14 rounded px-4 focus:outline-none focus:ring-2 focus:ring-purple/50"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray/30 h-14 rounded px-4 focus:outline-none focus:ring-2 focus:ring-purple/50"
          />
        </div>
        <div>
          <textarea
            placeholder="Message"
            className="w-full border border-gray/30 min-h-[200px] rounded px-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple/50"
          ></textarea>
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90 text-secondary  font-semibold h-14 rounded transition duration-200">
          Send Message
        </Button>
      </div>
    </div>
  );
}
