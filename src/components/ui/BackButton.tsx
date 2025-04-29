"use client";

import React from 'react';

export default function BackButton() {
  return (
    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
      <a 
        href="https://agnext.framer.ai/" 
        className="flex items-center justify-center rounded-full bg-white p-2 md:p-3 text-purple-600 hover:bg-gray-100 transition-all shadow-lg"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Back to AgNext Portal"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="md:w-5 md:h-5"
        >
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
      </a>
    </div>
  );
} 