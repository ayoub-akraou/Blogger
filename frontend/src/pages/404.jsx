import React from 'react'

export default function NotFound() {
  return (
    <div className='bg-white'>
      <div class="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 class="text-primary text-9xl font-bold mb-8">404</h1>
        <p class="text-secondary text-2xl mb-12">
          The Page You Are Looking For Does Not Exist!
        </p>
        <a
          href="/"
          class="flex items-center text-golden text-xl font-medium hover:underline"
        >
          <span class="mr-2">←</span> Back To Homepage
        </a>
      </div>
    </div>
  );
}
