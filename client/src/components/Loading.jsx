import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-blue-600">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-4 md:mx-8 lg:mx-16">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
          Loading Metrics...
        </h1>
      </div>
    </div>
  );
}
