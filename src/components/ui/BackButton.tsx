"use client";

import React from 'react';

export default function BackButton() {
  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
      <a 
        href="https://agnext.framer.ai/" 
        className="flex items-center gap-2 rounded-full bg-[#03594E]/80 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white hover:bg-[#03594E] transition-all shadow-lg backdrop-blur-md"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src="/assets/templates/logo.png"
          alt="AgNext Logo"
          className="w-4 h-4 md:w-5 md:h-5 object-contain"
        />
        <span className="hidden sm:inline">Back to AgNext Portal</span>
        <span className="sm:hidden">Back</span>
      </a>
    </div>
  );
} 