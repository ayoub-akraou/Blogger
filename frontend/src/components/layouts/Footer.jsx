import React from "react";
import Logo from "../UI/Logo/Logo";
import Button from "../UI/Button/Button";

export default function Footer() {
  return (
    <footer className="px-10 py-6 bg-secondary text-white">
      <div className="container mx-auto">
        <Nav />
        <Subscribe />

        <div className="flex justify-center sm:justify-between items-center sm:mt-20 sm:border-t border-gray-secondary sm:pt-8">
          <ContactInfo />
          <SocialMediaLinks />
        </div>
      </div>
    </footer>
  );
}

function Nav() {
  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between sm:mb-12">
      <Logo isLight={true} />
      <ul class="flex flex-col sm:flex-row justify-center items-center flex-wrap gap-4 md:gap-6">
        <li>
          <a href="#" class="hover:text-yellow transition-colors">
            Home
          </a>
        </li>
        <li>
          <a href="#" class="hover:text-yellow transition-colors">
            Blogs
          </a>
        </li>
        <li>
          <a href="#" class="hover:text-yellow transition-colors">
            Categories
          </a>
        </li>
        <li>
          <a href="#" class="hover:text-yellow transition-colors">
            About us
          </a>
        </li>
        <li>
          <a href="#" class="hover:text-yellow transition-colors">
            Contact us
          </a>
        </li>
        <li>
          <a href="#" class="hover:text-yellow transition-colors">
            Privacy Policy
          </a>
        </li>
      </ul>
    </nav>
  );
}

function SocialMediaLinks() {
  return (
    <ul class="flex gap-4 mt-6 md:mt-0">
      <li>
        <a href="#" class="text-gray-300 hover:text-white transition-colors">
          <i class="fab fa-facebook-f"></i>
          <span class="sr-only">Facebook</span>
        </a>
      </li>
      <li>
        <a href="#" class="text-gray-300 hover:text-white transition-colors">
          <i class="fab fa-twitter"></i>
          <span class="sr-only">Twitter</span>
        </a>
      </li>
      <li>
        <a href="#" class="text-gray-300 hover:text-white transition-colors">
          <i class="fab fa-instagram"></i>
          <span class="sr-only">Instagram</span>
        </a>
      </li>
      <li>
        <a href="#" class="text-gray-300 hover:text-white transition-colors">
          <i class="fab fa-linkedin-in"></i>
          <span class="sr-only">LinkedIn</span>
        </a>
      </li>
    </ul>
  );
}

function Subscribe() {
  return (
    <div className="subscribe hidden sm:flex bg-white/5 justify-between items-center px-20 py-14 gap-4">
      <h2 className="text-3xl leading-relaxed font-medium flex-[3]">
        Subscribe to our news letter to get latest updates and news
      </h2>
      <form className="flex gap-2 flex-[2]">
        <input
          type="email"
          placeholder="Enter Your Email"
          required
          className="flex-grow px-4 py-3 bg-secondary border border-gray-secondary focus:outline-none focus:border-yellow"
        />
        <Button className="bg-primary">SUBSCRIBE</Button>
      </form>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="address text-gray-300 hidden sm:block">
      <p>Finstreet 118 2561 Fintown</p>
      <p>Hello@finsweet.com 020 7993 2905</p>
    </div>
  );
}
