"use client";

import { useState, useEffect, useRef } from "react";
import { Dancing_Script } from "next/font/google";
import { toast } from "react-hot-toast";
import Input from "@/components/ui/Input";
import { downloadAsImage } from "@/lib/utils";
import type { BirthdayCardData } from "@/types";

const dancingScript = Dancing_Script({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function BirthdayCard() {
  const [data, setData] = useState<BirthdayCardData>({
    name: "",
  });
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState(36); // Starting font size in pixels
  const [preview, setPreview] = useState(true);

  // Adjust font size based on name length
  useEffect(() => {
    if (!nameRef.current) return;
    
    // Reset font size to base value
    const baseFontSize = 22;
    
    // Set max width of the ribbon (in pixels) - adjust this value as needed
    const maxWidth = 180; 
    
    if (data.name) {
      // Start with base font size
      setFontSize(baseFontSize);
      nameRef.current.style.fontSize = `${baseFontSize}px`;
      
      // Check if text overflows and reduce font size until it fits
      let currentSize = baseFontSize;
      while (nameRef.current.scrollWidth > maxWidth && currentSize > 16) {
        currentSize -= 2;
        nameRef.current.style.fontSize = `${currentSize}px`;
        setFontSize(currentSize);
      }
    } else {
      // Reset to default size for placeholder
      setFontSize(baseFontSize);
    }
  }, [data.name]);

  const handleDownload = async () => {
    try {
      await downloadAsImage("birthday-card", `birthday-${data.name}`);
      toast.success("Card downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download card");
    }
  };

  return (
    <div className="grid gap-12 md:grid-cols-2">
      {/* Form */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">Birthday Card</h2>
          <p className="text-white/80">
            Enter a name below to create a personalized birthday card.
          </p>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-5">
            <Input
              label="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Enter your name"
              maxLength={30}
              className="bg-white border-gray-300 text-black placeholder-gray-400 focus:border-blue-500"
              style={{
                color: 'black !important',
                caretColor: 'black !important'
              }}
            />

            <div className="mt-6">
              <button
                onClick={handleDownload}
                disabled={!data.name}
                className="btn-primary w-full"
              >
                Download Card
              </button>
            </div>
            
            <div className="mt-3">
              <label className="flex items-center text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={preview}
                  onChange={() => setPreview(!preview)}
                  className="mr-2 h-4 w-4 rounded border-gray-300"
                />
                Show live preview
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className={`relative ${preview ? 'block' : 'hidden'}`}>
        <div 
          className="card-preview relative overflow-hidden rounded-lg shadow-xl" 
          id="birthday-card"
          style={{ aspectRatio: "3/2" }}
        >
          {/* Stars container */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large golden stars */}
            {[...Array(10)].map((_, i) => (
              <div
                key={`large-gold-star-${i}`}
                className="absolute rounded-full animate-twinkle"
                style={{
                  width: '3px',
                  height: '3px',
                  backgroundColor: '#FFD700',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.9 + 0.1,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: '3s',
                  boxShadow: '0 0 2px #FFD700'
                }}
              />
            ))}

            {/* Small golden stars */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`small-gold-star-${i}`}
                className="absolute rounded-full animate-twinkle"
                style={{
                  width: '1.5px',
                  height: '1.5px',
                  backgroundColor: '#FFD700',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: '4s',
                  boxShadow: '0 0 1px #FFD700'
                }}
              />
            ))}
          </div>

          {/* Background Image with cache busting */}
          <img
            src={`/assets/templates/birthday.jpg?v=${new Date().getTime()}`}
            alt="Birthday Card Template"
            className="h-full w-full object-cover"
          />
          
          {/* Name Placeholder - Positioned over the ribbon with adaptive font size */}
          <div className="absolute inset-x-0 top-0 h-full">
            <div className="relative h-full w-full">
              <div 
                className="absolute right-[10%] top-[37%]"
                style={{ 
                  width: '220px',  // Increased width
                  minHeight: '60px', // Added minimum height
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <p 
                  ref={nameRef}
                  className={`${dancingScript.className} font-bold text-white whitespace-nowrap`}
                  style={{ 
                    fontSize: `${fontSize}px`,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                    lineHeight: '1.2'
                  }}
                >
                  {data.name || "Full Name"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-white/60">
          <button
            onClick={() => window.location.reload()}
            className="underline hover:text-white"
          >
            Not seeing the latest image? Click to refresh
          </button>
        </div>
      </div>
    </div>
  );
} 