import React from "react";
import Logo from "../components/UI/Logo/Logo";
import Button from "../components/UI/Button/Button";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen flex justify-between">
      <div className="form mx-auto flex-[3] px-14">
        <div class="w-full max-w-md pt-6">
          <Link to="/"><Logo /></Link>
        </div>

        <h1 class="text-[#232536] text-2xl font-medium mb-6 text-center">
          Sign up to Blogger
        </h1>

        <form class="space-y-2.5 max-w-md mx-auto">
          <div class="flex flex-wrap gap-4">
            <div class="flex-1 min-w-[45%]">
              <input
                type="text"
                placeholder="First name"
                class="w-full px-4 py-2 border border-[#e2e2ea] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
              />
            </div>
            <div class="flex-1 min-w-[45%]">
              <input
                type="text"
                placeholder="Last name"
                class="w-full px-4 py-2 border border-[#e2e2ea] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm text-[#92929d] mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="dev@domain.com"
              class="w-full px-4 py-2 border border-[#e2e2ea] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
            />
          </div>

          <div>
            <label class="block text-sm text-[#92929d] mb-1">Password</label>
            <input
              type="password"
              placeholder="****************"
              class="w-full px-4 py-2 border border-[#e2e2ea] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
            />
          </div>

          <div>
            <label class="block text-sm text-[#92929d] mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="****************"
              class="w-full px-4 py-2 border border-[#e2e2ea] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
            />
          </div>

          <Button type="submit" className="w-full bg-primary">
            SIGN UP
          </Button>

          <Button type="button" className="w-full bg-secondary text-white">
            BACK TO LOGIN
          </Button>
        </form>

        <div class="flex justify-center space-x-4 mt-8 text-sm text-[#232536]">
          <a href="#" class="hover:underline">
            Terms and conditions
          </a>
          <a href="#" class="hover:underline">
            Privacy policy
          </a>
        </div>
      </div>
      <div className="image max-h-screen h-full flex-[2]">
        <img
          src="/images/signup.png"
          alt=""
          className="object-cover min-w-full h-screen"
        />
      </div>
    </div>
  );
}
