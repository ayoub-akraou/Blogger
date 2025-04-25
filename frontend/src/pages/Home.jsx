import React from "react";
import Button from "../components/UI/Button/Button";

export default function Home() {
  return (
    <>
      <Hero />
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

}
