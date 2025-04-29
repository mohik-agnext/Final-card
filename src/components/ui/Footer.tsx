"use client";

import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-1 pb-3 text-center text-sm text-white/50">
      <div className="flex items-center justify-center gap-2">
        <p>Made by</p>
        <a 
          href="https://www.linkedin.com/in/mohik-kler/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-medium text-white/70 hover:text-white transition-colors"
        >
          <span className="underline underline-offset-2">Mohik Kler</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="text-[#0A66C2]"
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
          </svg>
        </a>
      </div>
    </footer>
  );
} 