import { Link } from "react-router-dom"; 
import React from "react";
import Logo from "../components/UI/Logo/Logo";
import Button from "../components/UI/Button/Button";

export default function Login() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blogger - Sign In</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="min-h-screen container mx-auto">
        <main class="flex min-h-screen ">
          <div class="flex-1 flex flex-col items-start justify-between p-8 md:p-14 ">
            <Logo />

            <div class=" w-full mx-auto flex flex-col  items-center">
              <h1 class="text-2xl font-medium mb-8 self-start">Sign in</h1>

              <form class="space-y-6  w-full">
                <div class="space-y-2">
                  <label for="email" class="sr-only">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address *"
                    required
                    class="w-full px-4 py-3 border border-[#d9d9d9] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
                  />
                </div>

                <div class="space-y-2">
                  <label for="password" class="sr-only">
                    Password *
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password *"
                    required
                    class="w-full px-4 py-3 border border-[#d9d9d9] rounded focus:outline-none focus:ring-2 focus:ring-[#ffd050]"
                  />
                </div>

                <div class="flex items-center">
                  <Button type="submit" className=" bg-primary text-black">
                    Login
                  </Button>
                  <a
                    href="#"
                    class="ml-6 text-sm text-[#232536] hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </form>

              <Button className=" bg-black text-white mt-6 w-full">
                <Link to="/signup">Create new account</Link>
              </Button>
            </div>
            <div class="flex mx-auto space-x-4 text-sm text-secondary pt-8">
              <a href="#" class="hover:underline">
                Terms and conditions
              </a>
              <a href="#" class="hover:underline">
                Privacy policy
              </a>
            </div>
          </div>

          <div class="flex-1 md:px-10 lg:px-20 hidden md:flex items-center">
            <img
              src="/images/login.png"
              alt="Blogger travel inspiration"
              class="w-full object-cover"
            />
          </div>
        </main>
      </body>
    </html>
  );
}
