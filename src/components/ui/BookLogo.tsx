"use client";

import React from 'react';
import Image from 'next/image';

export default function BookLogo() {
  return (
    <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50">
      <a href="/" className="block">
        <Image
          src="/assets/book-logo.png" 
          alt="The Book Logo"
          width={40}
          height={40}
          className="transition-transform hover:scale-110"
        />
      </a>
    </div>
  );
} 